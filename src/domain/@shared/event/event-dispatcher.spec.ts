import SendEmailWhenProductIsCreateHandler from "../../product/event/handler/send-email-when-product-is-create.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event test",() =>{

    it("should register an event handler",()=>{

        const eventDispatcher  = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler",()=>{

        const eventDispatcher  = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handler",()=>{

        const eventDispatcher  = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][1]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);

        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });


    it("should notify all event handler",()=>{

        const eventDispatcher  = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name:"ProductCreatedEvent",
            data:{
                product:{
                    id: 1,
                    name: "Product 1",
                    description: "Product 1 description",
                    price: 10.0,
                    createdAt: new Date()
                }
            }
        });

        //QUando o notify for executado SendEmailWhenProductIsCreateHandler.handler() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });

});