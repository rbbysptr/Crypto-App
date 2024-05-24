const { Coin } = require("../models");
class CoinController {
    static async addCoin(req, res, next) {
        try {
            const coinData = req.body;

            if (!coinData || !coinData.id) {
                return res.status(400).json({ error: 'Invalid coin data' });
            }
            const existingCoin = await Coin.findOne({ where: { id: coinData.id, UserId: req.user.id } });
            if (existingCoin) {
                return res.status(400).json({ message: `${coinData.name} is already in My Coin` });
            }
            await Coin.create({
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

            res.status(201).json({ message: `${coinData.name} successfully added to My Coin` });
        } catch (error) {
            next(error)
        }
    }
    static async DeleteCoin(req, res, next) {
        try {
            const { id } = req.params;

            const coinItem = await Coin.findByPk(id);
            if (!coinItem) {
                return res.status(404).json({ error: "item not valid" });
            }
            await Coin.destroy({ where: { id: id } });
            return res.status(200).json({ message: `${coinItem.name} has been deleted` });
        } catch (error) {
            next(error)
        }
    }
    static async AllCoin(req, res, next) {
        try {
            const coins = await Coin.findAll({ where: { UserId: req.user.id } });
            res.status(200).json(coins);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = CoinController;
