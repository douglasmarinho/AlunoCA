import ProductFactory from "../../../domain/product/factory/product-factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product 1", 10);

const input ={
    id: product.id,
    name: "Product Update",
    price: 5,
}

const MockRepositoy =() =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Teste create product use case", () =>{

    it("should find a product", async () => {
        const productRepository = MockRepositoy();
        const useCase = new UpdateProductUseCase(productRepository);    

        

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name:"Product Update",
            price: 5
        });
    });

});



