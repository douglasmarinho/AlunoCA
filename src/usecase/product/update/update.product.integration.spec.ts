import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";


describe("Teste find product use case", () =>{
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
        const useCase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "Product 1", 10);   

        await productRepository.create(product);

        const input ={
            id: product.id,
            name: "Product Update",
            price: 100
        }

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name:"Product Update",
            price: 100
        });
    });
});