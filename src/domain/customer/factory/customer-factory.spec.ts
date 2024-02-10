import Address from "../value-object/address";
import CustomerFactory from "./customer-factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("Teste");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Teste");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with a adress", () => {
        const adress = new Address("Street 1", "123", "13330-250", "São Paulo");
        let customer = CustomerFactory.createWithAdress("Teste",adress);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Teste");
        expect(customer.Address).toBe(adress);
    });
});