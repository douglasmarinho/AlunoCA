import ProductFactory from "../../../domain/product/factory/product-factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("Product 1", 10)

const product2 = ProductFactory.create("Product 2", 20)

 
const MockRepositoy =() =>{
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Teste for listing product use case", () =>{

    it("should list a product", async () => {
        const customerRepository = MockRepositoy();
        const useCase = new ListProductUseCase(customerRepository);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toEqual(product1.price)

        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toEqual(product2.price)

    });
});