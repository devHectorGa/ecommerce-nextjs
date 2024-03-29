"use strict";

const stripe = require("stripe")("sk_test_XTFSBQdMD570MK7re02vghmV00yDERR3lS");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { token, products, idUser, addressShipping } = ctx.request.body;
    let totalPayment = products.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    );
    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "USD",
      source: token.id,
      description: `ID Usuario ${idUser}`,
    });

    const createOrder = [];

    for await (const product of products) {
      const data = {
        game: product.id,
        user: idUser,
        totalPayment,
        idPayment: charge.id,
        addressShipping,
      };

      const validData = await strapi.entityValidator.validateEntityCreation(
        strapi.models.order,
        data
      );

      const entry = await strapi.query("order").create(validData);
      createOrder.push(entry);
    }

    return createOrder;
  },
};
