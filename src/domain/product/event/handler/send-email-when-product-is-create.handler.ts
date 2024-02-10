import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreateHandler implements EventHandlerInterface<ProductCreatedEvent>{
    
    handler(event: ProductCreatedEvent): void {
       // console.log(`Sending email to ${event.eventData.data}`);
       console.log(`Sending email to.......`);
    }

}