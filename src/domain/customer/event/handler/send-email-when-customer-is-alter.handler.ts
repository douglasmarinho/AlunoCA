import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAlterEvent from "../customer-alter.event";

export default class SendEmailWhenCustomerIsAlterHandler implements EventHandlerInterface<CustomerAlterEvent>{
    
    handler(event: CustomerAlterEvent): void {
       console.log(`Endereço do cliente: ${event.eventData.data.customer.id}, ${event.eventData.data.customer.name} alterado para: ${event.eventData.data.customer.adress}`);
    }

}