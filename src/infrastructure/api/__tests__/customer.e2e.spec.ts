import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("Should create a customer", async()=>{

    
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Teste 1",
                address:{
                    street: "Street 1",
                    number: "1",
                    city: "City 1",
                    zip: "12345678",
                }
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Teste 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe("1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.zip).toBe("12345678");

    });

    it("should not create a customer", async () => {
        const response = await request(app).post("/customer").send({
          name: "john",
        });
        expect(response.status).toBe(500);
    });

    it("Should list all customer", async()=>{

    
        const responseCreate1 = await request(app)
            .post("/customer")
            .send({
                name: "Teste 1",
                address:{
                    street: "Street 1",
                    number: "1",
                    city: "City 1",
                    zip: "12345678",
                }
            });
        expect(responseCreate1.status).toBe(200);

        const responseCreate2 = await request(app)
            .post("/customer")
            .send({
                name: "Teste 2",
                address:{
                    street: "Street 2",
                    number: "2",
                    city: "City 2",
                    zip: "87654321",
                }
            });
        expect(responseCreate2.status).toBe(200);


        const responseList= await request(app).get("/customer").send();

        expect(responseList.status).toBe(200);
        expect(responseList.body.customers.length).toBe(2);
        const customers1  = responseList.body.customers[0];
        const customers2  = responseList.body.customers[1];
        expect(customers1.name).toBe("Teste 1");
        expect(customers1.address.street).toBe("Street 1");
        expect(customers2.name).toBe("Teste 2");
        expect(customers2.address.street).toBe("Street 2");

        const responseListXML= await request(app)
            .get("/customer")
            .set("Accept", "application/XML")
            .send();
        
        expect(responseListXML.status).toBe(200);
        expect(responseListXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(responseListXML.text).toContain(`<customers>`);
        expect(responseListXML.text).toContain(`<customer>`);
        expect(responseListXML.text).toContain(`<name>Teste 1</name>`);
        expect(responseListXML.text).toContain(`<address>`);
        expect(responseListXML.text).toContain(`<street>Street 1</street>`);
        expect(responseListXML.text).toContain(`<city>City 1</city>`);
        expect(responseListXML.text).toContain(`<number>1</number>`);
        expect(responseListXML.text).toContain(`<zip>12345678</zip>`);
        expect(responseListXML.text).toContain(`</address>`);
        expect(responseListXML.text).toContain(`</customer>`);
        expect(responseListXML.text).toContain(`<name>Teste 2</name>`);
        expect(responseListXML.text).toContain(`<street>Street 2</street>`);
        expect(responseListXML.text).toContain(`<number>2</number>`);
        expect(responseListXML.text).toContain(`<city>City 2</city>`);
        expect(responseListXML.text).toContain(`<zip>87654321</zip>`);
        expect(responseListXML.text).toContain(`</customers>`);
    });
});