const { Coin } = require("../models");

const authorizationCoin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const dataCoin = await Coin.findByPk(id);

        // console.log(dataGame.Userid);
        if (!dataCoin) {
            throw { name: "NotFound", msg: `Coin not found` };
        }
        if (dataCoin.UserId !== userId) {
            throw {
                name: "Forbidden",
                msg: `You're not authorized to delete this Coin`,
            };
        }
        req.coin = dataCoin;
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = authorizationCoin;
