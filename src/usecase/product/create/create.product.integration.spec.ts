import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";


describe("Teste create product use case", () =>{
    let sequileze: Sequelize;

    beforeEach(async () =>{
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });
        sequileze.addModels([ProductModel]);
        await sequileze.sync();
    });


    afterEach(async () =>{
        await sequileze.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const input ={
            name: "Product 1",
            price: 10
        }

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 10
        });
    });
});