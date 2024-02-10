import CustomerFactory from "../../../domain/customer/factory/customer-factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAdress("Customer 1",
    new Address("Street 1",
    "1", 
    "Zipcode 1",
    "City 1")
)

const input ={
    id: customer.id,
    name: "Customer Update",
    address:{
        street: "Street Update", 
        number: "Update", 
        zip: "Zipcode Update", 
        city: "City Update"
    }
}

const MockRepositoy =() =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Teste Update customer use case", () =>{

    it("should update a customer", async () => {
        const customerRepository = MockRepositoy();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);

    });

});