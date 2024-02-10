import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product-factory";

const product = ProductFactory.create("Product A", 1);

const MockRepositoy =() =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Teste find product use case", () =>{

    it("should find a product", async () => {
        const productRepository = MockRepositoy();
        const useCase = new FindProductUseCase(productRepository);

        const input ={
            id: product.id,
        }

        const output ={
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = MockRepositoy();
        productRepository.find.mockImplementation(()=>{
            throw new Error("Product not found");
        })
        const useCase = new FindProductUseCase(productRepository);

        const input ={
            id: "123",
        }

        expect(() =>{
            return useCase.execute(input);
        }).rejects.toThrow("Product not found"); 
    });
});