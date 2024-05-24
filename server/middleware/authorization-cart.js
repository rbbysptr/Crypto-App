const { Coin, Cart, User } = require("../models");

const authorizationCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const userId = req.user.id;
        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            throw { name: "NotFound", msg: `Item not found in cart` };
        }

        if (cartItem.UserId !== userId) {
            throw {
                name: "Unauthorized",
                msg: `You're not authorized to update this item in the cart`,
            };
        }
        req.cartItem = cartItem;
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = authorizationCart;
