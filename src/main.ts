import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
let customer = new Customer("123","Douglas")
const address = new Address("Rua Teste", "1", "25956-080", "Teresopolis");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("123","Item 1", 10, "111",1);
const item2 = new OrderItem("123","Item 2", 20, "222",2);

const order = new Order("123","123", [item1, item2]);
