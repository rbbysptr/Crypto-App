const { Coin } = require("../models");

const authCoinOwner = async (req, res, next) => {
    try {
        const coins = await Coin.findAll({ where: { UserId: req.user.id } });

        if (!coins || coins.length === 0) {
            return res.status(403).json({ message: "You are not authorized to view any coins" });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authCoinOwner;
