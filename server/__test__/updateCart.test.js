const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const { signToken, verifyToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcryptjs");

let acces_token;
let acces_token1;
let cart = [
    {
        rank: "1",
        symbol: "BTC",
        name: "Bitcoin",
        supply: "19685775.0000000000000000",
        maxSupply: "21000000.0000000000000000",
        marketCapUsd: "1256861637462.9911601095827200",
        volumeUsd24Hr: "8889826517.4512493686220216",
        priceUsd: "63846.1852511771144448",
        changePercent24Hr: "-4.1225476208183458",
        vwap24Hr: "64932.9941908043561087",
        explorer: "https://blockchain.info/",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

let cartBaru = {
    rank: "2",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "19685775.0000000000000000",
    maxSupply: "21000000.0000000000000000",
    marketCapUsd: "1256861637462.9911601095827200",
    volumeUsd24Hr: "8889826517.4512493686220216",
    priceUsd: "63846.1852511771144448",
    changePercent24Hr: "-4.1225476208183458",
    vwap24Hr: "64932.9941908043561087",
    explorer: "https://blockchain.info/",
};

//!testing put
describe("get /update-cart/:id", function () {
    //!testing succes
    describe("succes", () => {
        test("should return array of object", async () => {
            let respons = await request(app)
                .put("/update-cart/1")
                .set("Authorization", "Bearer " + acces_token)
                .send({ GameId: 857751 });

            expect(respons.status).toBe(201);
            expect(respons.body).toHaveProperty("message", expect.any(String));
        });
    });
    describe("failed", () => {
        //!testing fail
        test("should return object", async () => {
            //!test belum login
            let respons = await request(app)
                .put("/update-cart/3")
                .set("Authorization", "Bearer " + acces_token)
                .send({ GameId: 857751 });
            console.log(respons.body);
            expect(respons.status).toBe(404);
            expect(respons.body).toHaveProperty("message", "game not found");
        });
        test("should return object", async () => {
            //!test id salah
            let respons = await request(app)
                .put("/update-cart/3")
                .set("Authorization", "Bearer " + acces_token)
                .send({ rent: 3 });
            console.log(respons.body);
            expect(respons.status).toBe(404);
            expect(respons.body).toHaveProperty("message", "game not found");
        });
    });
});

//!hooks before test
beforeAll(async () => {
    let data = [
        {
            id: 1,
            username: "admin1",
            email: "admin@mail.com",
            password: hashPassword("admin123"),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    let data1 = [
        {
            id: 1,
            username: "admin1",
            email: "admin@mail.com",
            password: hashPassword("admin123"),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    await queryInterface.bulkInsert("Users", data, {});

    acces_token = signToken({ id: data[0].id });
    acces_token1 = signToken({ id: data1[0].id });
  
    await queryInterface.bulkInsert("Carts", game, {});
});
//!hooks after test
afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
    await queryInterface.bulkDelete("Carts", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
});
