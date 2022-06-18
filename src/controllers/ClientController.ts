/* eslint-disable camelcase */

import pagarmeApi from '../services/api'

class ClientsController {
  async index (req, res) {
    const response = await pagarmeApi
      .get('customers?page=1')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return error
      })

    return res.status(200).json(response)
  }

  async create (req, res) {
    const {
      line_1,
      line_2,
      zip_code,
      city,
      state,
      country,

      birthdate,
      name,
      email,
      code,
      document,
      type,
      document_type,
      gender,

      country_code,
      area_code,
      number
    } = req.body

    const address = {
      line_1,
      line_2,
      zip_code,
      city,
      state,
      country
    }

    const phones = {
      mobuile_phone: {
        country_code,
        area_code,
        number
      }
    }

    const response = await pagarmeApi
      .post('/customers', {
        address,
        birthdate,
        name,
        email,
        code,
        document,
        type,
        document_type,
        gender,
        phones
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })

    console.log('response: ', response)

    return res.status(200).json(response)
  }
}

export default new ClientsController()
