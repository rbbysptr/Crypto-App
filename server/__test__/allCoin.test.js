const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const { signToken, verifyToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcryptjs");

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
        explorer: "https://blockchain.info/",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
let Coin = {

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
    explorer: "https://blockchain.info/",
    UserId:1
};

//!testing get
describe("get /allCoin", function () {
    //!testing succes
    describe("succes", () => {
        test("should return array of object", async () => {
            let respons = await request(app)
                .get("/allCoin")
                .set("Authorization", "Bearer " + acces_token);

            expect(respons.status).toBe(200);
            expect(respons.body).toEqual(expect.any(Array));
            expect(respons.body).not.toHaveLength(0);
        });
    });
    describe("failed", () => {
        //!testing fail
        test("should return object", async () => {
            //!test belum login
            let respons = await request(app).get("/allGames");
            // .set("Authorization", "Bearer " + acces_token);
            console.log(respons.body);
            expect(respons.status).toBe(401);
            expect(respons.body).toHaveProperty("message", "Invalid Token");
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

    await queryInterface.bulkInsert("Users", data, {});

    acces_token = signToken({ id: data[0].id });
});
//!hooks after test
afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
});
