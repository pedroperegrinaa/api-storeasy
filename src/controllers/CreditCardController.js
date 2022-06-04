const sdk = require("api")("@pagarme/v5#10ldz43cl0h6sa78");

import pagarmeApi from "../services/api";

class CreditCardController {
  async index(req, res) {}

  async create(req, res) {
    const {
      line_1,
      line_2,
      zip_code,
      city,
      state,
      country,

      verify_card,

      number,
      holder_name,
      holder_document,
      exp_month,
      exp_year,
      cvv,
      brand,
      label,

      customer_id,
    } = req.body;

    const billing_address = {
      line_1,
      line_2,
      zip_code,
      city,
      state,
      country,
    };

    const options = {
      verify_card,
    };

    const response = await pagarmeApi
      .post(`/customers/${customer_id}/cards`, {
        billing_address,
        options,
        number,
        holder_name,
        holder_document,
        exp_month,
        exp_year,
        cvv,
        brand,
        label,
      })
      .then((response) => {
        console.log("response: ", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    return res.status(200).json(response);
  }
}

export default new CreditCardController();
