const { Cart } = require("../models");
require("dotenv").config();

class CartController {
    static async addCart(req, res, next) {
        try {
            const coinData = req.body;

            if (!coinData || !coinData.id) {
                return res.status(400).json({ error: 'Invalid coin data' });
            }
            const existingCoin = await Cart.findOne({ where: { id: coinData.id, UserId: req.user.id } });
            if (existingCoin) {
                return res.status(400).json({ message: `${coinData.name} is already in the chart` });
            }
            await Cart.create({
                id: coinData.id,
                rank: coinData.rank,
                symbol: coinData.symbol,
                name: coinData.name,
                supply: coinData.supply,
                maxSupply: coinData.maxSupply,
                marketCapUsd: coinData.marketCapUsd,
                volumeUsd24Hr: coinData.volumeUsd24Hr,
                priceUsd: coinData.priceUsd,
                changePercent24Hr: coinData.changePercent24Hr,
                vwap24Hr: coinData.vwap24Hr,
                explorer: coinData.explorer,
                UserId: req.user.id
            });

            res.status(201).json({ message: `${coinData.name} successfully added to the chart` });
        } catch (error) { 
            next(error)
        }
    }

    static async updateCart(req, res, next) {
        try {
            let { rank, symbol, name, supply, maxSupply, marketCapUsd, volumeUsd24Hr, priceUsd, changePercent24Hr, vwap24Hr, explorer } = req.body;
            const cartItem = await Cart.findByPk(req.params.id);
            if (!cartItem) {
                return res.status(404).json({ message: "Item not found in cart" });
            }
            await Cart.update({
                rank,
                symbol,
                name,
                supply,
                maxSupply,
                marketCapUsd,
                volumeUsd24Hr,
                priceUsd,
                changePercent24Hr,
                vwap24Hr,
                explorer,
                UserId: req.user.id
            }, {
                where: { id: req.params.id }
            });

            res.status(200).json({ message: `${name} has been updated in cart` });
        } catch (error) {
            next(error)
        }
    }
    static async DeleteCart(req, res, next) {
        try {
            const cartItem = await Cart.findByPk(req.params.id);
            if (!cartItem) {
                return res.status(404).json({ message: "Item not found" });
            }
            await Cart.destroy({ where: { id: req.params.id } });
            return res.status(200).json({ message: `${cartItem.name} has been deleted` });
        } catch (error) {
           next(error)
        }
    }


    static async allCart(req, res, next) {
        try {
            const cart = await Cart.findAll();
            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }
    static async getCoinById(req, res, next) {
        try {
            let data = await Cart.findOne({ where: { id: req.params.id } });
            if (!data) {
                return res.status(404).json({ error: "Data not found" });
            }
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = CartController;
