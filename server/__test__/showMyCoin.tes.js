const app = require("../app");
const request = require("supertest");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const { signToken, verifyToken } = require("../helper/jwt");
const { hashPassword } = require("../helper/bcrypt");

let acces_token;
let coin = [
    {
        id: "bitcoin",
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
        explorer: "https://blockchain.info/"
    },
];
let coinBaru = {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "19685775.0000000000000000",
    maxSupply: "21000000.0000000000000000",
    "marketCapUsd": "1256861637462.9911601095827200",
    "volumeUsd24Hr": "8889826517.4512493686220216",
    "priceUsd": "63846.1852511771144448",
    "changePercent24Hr": "-4.1225476208183458",
    "vwap24Hr": "64932.9941908043561087",
    "explorer": "https://blockchain.info/"
};

//!testing get
describe("get /cart", function () {
    //!testing succes
    describe("succes", () => {
        test("should return array of object", async () => {
            let respons = await request(app)
                .get("/cart")
                .set("Authorization", "Bearer " + acces_token);

            console.log(respons.body);
            expect(respons.status).toBe(200);
            expect(respons.body).toEqual(expect.any(Array));
        });
    });
    describe("failed", () => {
        //!testing fail
        test("should return object", async () => {
            //!test belum login
            let respons = await request(app).post("/cart");
            // .set("Authorization", "Bearer " + acces_token);
            console.log(respons.body);
            expect(respons.status).toBe(401);
            expect(respons.body).toHaveProperty("message", "Invalid Token");
        });
        test("should return object", async () => {
            //!test id salah
            let respons = await request(app)
                .get("/cart")
                .set("Authorization", "Bear " + acces_token);
            // .send({ rent: 2 });
            console.log(respons.body);
            expect(respons.status).toBe(401);
            expect(respons.body).toHaveProperty("message", "Invalid token");
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
    //   await queryInterface.bulkInsert("Users", data1, {});

    acces_token = signToken({ id: data[0].id });
    acces_token1 = signToken({ id: data1[0].id });
    //   await queryInterface.bulkInsert("Categories", category, {});
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
