import * as Yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js'
import { cpf, cnpj } from 'cpf-cnpj-validator'

import Cart from '../schemas/Cart'

import TransactionService from '../services/TransactionService'

class TransactionsController {
  async create (req, res) {
    try {
      const {
        cartCode,
        paymentType,
        installments,
        costumerName,
        costumerEmail,
        costumerMobile,
        costumerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingCity,
        billingState,
        billingZipCode,
        creditCardNumber,
        creditCardExpiration,
        creditCardHolderName,
        creditCardCvv
      } = req.body

      const schema = Yup.object().shape({
        cartCode: Yup.string().required(),
        paymentType: Yup.mixed().oneOf(['billet', 'credit_card']).required(),
        installments: Yup.number()
          .required()
          .min(1)
          .when('paymentType', (paymentType, schema) => {
            return paymentType === 'credit_card'
              ? schema.max(12)
              : schema.max(1)
          }),
        costumerName: Yup.string().required().min(3),
        costumerEmail: Yup.string().required().email(),
        costumerMobile: Yup.string()
          .required()
          .test('is-valid-phone', `${path} is not a mobile number`, (value:string) =>
            parsePhoneNumber(value, 'BR').isValid()
          ),
        costumerDocument: Yup.string()
          .required()
          .test(
            'is-valid-document',
            `${path} is not a valid CPF/CNPJ`,
            (value) => cpf.isValid(value) || cnpj.isValid(value)
          ),
        billingAddress: Yup.string().required(),
        billingNumber: Yup.string().required(),
        billingNeighborhood: Yup.string().required(),
        billingCity: Yup.string().required(),
        billingState: Yup.string().required(),
        billingZipCode: Yup.string().required(),
        creditCardNumber: Yup.string().when(
          'paymentType',
          (paymentType, schema) =>
            paymentType === 'credit_card' ? schema.required() : schema
        ),
        creditCardExpiration: Yup.string().when(
          'paymentType',
          (paymentType, schema) =>
            paymentType === 'credit_card' ? schema.required() : schema
        ),
        creditCardHolderName: Yup.string().when(
          'paymentType',
          (paymentType, schema) =>
            paymentType === 'credit_card' ? schema.required() : schema
        ),
        creditCardCvv: Yup.string().when('paymentType', (paymentType, schema) =>
          paymentType === 'credit_card' ? schema.required() : schema
        )
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails.' })
      }

      const cart = Cart.findOne({ code: cartCode })

      if (!cart) {
        return res.status(400).json({ error: 'Cart not found.' })
      }

      const service = new TransactionService()

      const response = await service.process({
        cartCode,
        paymentType,
        installments,

        costumer: {
          name: costumerName,
          email: costumerEmail,
          mobile: parsePhoneNumber(costumerMobile, 'BR').format('E.164'),
          document: costumerDocument
        },
        billing: {
          address: billingAddress,
          number: billingNumber,
          neighborhood: billingNeighborhood,
          city: billingCity,
          state: billingState,
          zipCode: billingZipCode
        },
        creditCard: {
          number: creditCardNumber,
          expiration: creditCardExpiration,
          holderName: creditCardHolderName,
          cvv: creditCardCvv
        }
      })

      return res.json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default new TransactionsController()
