import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("Should create a product", async()=>{
        const response = await request(app)
            .post("/product")
            .send({
                name: "Teste 1",
                price: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Teste 1");
        expect(response.body.price).toBe(10);

    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            price: 10,
        });
        expect(response.status).toBe(500);
    });

    it("Should list all product", async()=>{

    
        const responseCreate1 = await request(app)
            .post("/product")
            .send({
                name: "Teste 1",
                price: 10
            });

        expect(responseCreate1.status).toBe(200);

        const responseCreate2 = await request(app)
            .post("/product")
            .send({
                name: "Teste 2",
                price: 20
            });

        expect(responseCreate2.status).toBe(200);


        const responseList= await request(app).get("/product").send();

        expect(responseList.status).toBe(200);
        expect(responseList.body.products.length).toBe(2);
        const product1  = responseList.body.products[0];
        const product2  = responseList.body.products[1];
        expect(product1.name).toBe("Teste 1");
        expect(product1.price).toBe(10);
        expect(product2.name).toBe("Teste 2");
        expect(product2.price).toBe(20);
    });

    it("Should update a product", async()=>{

    
        const responseCreate = await request(app)
            .post("/product")
            .send({
                name: "Teste 1",
                price: 10
            });

        expect(responseCreate.status).toBe(200);

        const response = await request(app)
            .put("/product")
            .send({
                id: responseCreate.body.id,
                name: "Teste 2",
                price: 20
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Teste 2");
        expect(response.body.price).toBe(20);
    });
});