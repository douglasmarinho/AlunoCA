import CreateProductUseCase from "./create.product.usecase";

const MockRepositoy =() =>{
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Teste create product use case", () =>{

    it("should find a product", async () => {
        const productRepository = MockRepositoy();
        const useCase = new CreateProductUseCase(productRepository);    

        const input ={
            name: "product",
            price: 10
        }

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "product",
            price: 10
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepositoy();
        const useCase = new CreateProductUseCase(productRepository);    
    
        const input ={
            name: "product",
            price: 10
        }

        input.name = "";
    
        await expect(useCase.execute(input)).rejects.toThrow(
          "Name is required"
        );
      });
    
    it("should generate an error when the price is below zero", async () => {
        const productRepository = MockRepositoy();
        const useCase = new CreateProductUseCase(productRepository);    
    
        const input ={
            name: "product",
            price:  -10
        }
    
        await expect(useCase.execute(input)).rejects.toThrow(
          "Price must be greater than zero"
        );
    });
});



