import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAlterEvent from "../../customer/event/customer-alter.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import ConfirmRegistrationCustomerIsCreateHandler from "../../customer/event/handler/confirm-registration-customer-is-create.handler";
import SendEmailWhenCustomerIsAlterHandler from "../../customer/event/handler/send-email-when-customer-is-alter.handler";
import SendEmailWhenCustomerIsCreateHandler from "../../customer/event/handler/send-email-when-customer-is-create.handler";
import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
      this._id = id;
      this._name = name;
      this.validate();
      this.registerEventCreated("CustomerCreatedEvent");
    }
  
    get id(): string {
      return this._id;
    }
  
    get name(): string {
      return this._name;
    }
  
    get rewardPoints(): number {
      return this._rewardPoints;
    }
  
    validate() {
      if (this._id.length === 0) {
        throw new Error("Id is required");
      }
      if (this._name.length === 0) {
        throw new Error("Name is required");
      }
    }
  
    changeName(name: string) {
      this._name = name;
      this.validate();
    }
  
    get Address(): Address {
      return this._address;
    }
    
    changeAddress(address: Address) {
      this._address = address;
      this.registerEventAlter("CustomerAlterEvent");
    }
  
    isActive(): boolean {
      return this._active;
    }
  
    activate() {
      if (this._address === undefined) {
        throw new Error("Address is mandatory to activate a customer");
      }
      this._active = true;
    }
  
    deactivate() {
      this._active = false;
    }
  
    addRewardPoints(points: number) {
      this._rewardPoints += points;
    }
  
    set Address(address: Address) {
      this._address = address;
    }

    private registerEventCreated(eventName: string): void {
      const eventDispatcher  = new EventDispatcher();
      const eventHandler = new SendEmailWhenCustomerIsCreateHandler();
      eventDispatcher.register(eventName, eventHandler);
      const eventHandlerConfirm = new ConfirmRegistrationCustomerIsCreateHandler();
      eventDispatcher.register(eventName, eventHandlerConfirm);
      const customerCreatedEvent = new CustomerCreatedEvent({
        name: eventName,
        data:{
            customer:{
                id: this._id,
                name: this.name,
                adress: this.Address
            }
        }
    });
      eventDispatcher.notify(customerCreatedEvent);
   }

   private registerEventAlter(eventName: string): void {
    const eventDispatcher  = new EventDispatcher();
    const eventHandler = new SendEmailWhenCustomerIsAlterHandler();
    eventDispatcher.register(eventName, eventHandler);
    const customerAlterEvent = new CustomerAlterEvent({
      name: eventName,
      data:{
          customer:{
              id: this._id,
              name: this.name,
              adress: this.Address
          }
      }
  });
    eventDispatcher.notify(customerAlterEvent);
 }
  }
  