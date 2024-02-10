import ListProductUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product-factory";

describe("Teste for listing product use case", () =>{
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

    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);
        const product1 = ProductFactory.create("Product 1", 10);  
        const product2 = ProductFactory.create("Product 2", 20);   

        await productRepository.create(product1);
        await productRepository.create(product2);

        const input ={}

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