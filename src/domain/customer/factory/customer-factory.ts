import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory{

    public static create(name: string): Customer {

        return new Customer(uuid(), name);
    }

    public static createWithAdress(name: string, adress: Address): Customer {

        const costumer = new Customer(uuid(), name);
        costumer.changeAddress(adress);
        return costumer;
    }

}