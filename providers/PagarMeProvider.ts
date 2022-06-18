import { cpf } from 'cpf-cnpj-validator'
import { response } from 'express'
import pagarme from 'pagarme'

import pagarmeApi from '../src/services/api'

const sdk = require('api')('@pagarme/v5#10ldz43cl0h6sa78')

class PagarMeProvider {
  async process ({
    transactionCode,
    total,
    paymentType,
    installments,
    creditCard,
    costumer,
    billing,
    items
  }) {
    const billetParams = {
      payment_method: 'boleto',
      amount: total * 100,
      installments: 1
    }
    const creditCardParams = {
      payment_method: 'credit_card',
      amount: total * 100,
      installments,
      card_holder_name: creditCard.holderName,
      card_number: creditCard.number.replace(/[^?0-9]/g, ''),
      card_expiration_date: creditCard.expiration.replace(/[^?0-9]/g, ''),
      cvv: creditCard.cvv,
      capture: true
    }

    let paymentParams

    switch (paymentType) {
      case 'credit_card':
        paymentParams = creditCardParams
        break
      case 'billet':
        paymentParams = billetParams
        break

      default:
        throw `Payment type ${paymentType} is not supported.`
    }

    const costumerParams = {
      costumer: {
        external_id: costumer.email,
        name: costumer.name,
        email: costumer.email,
        type: cpf.isValid(costumer.document) ? 'individual' : 'corporation',
        country: 'br',
        phone_numbers: [costumer.mobile],
        documents: [
          {
            type: cpf.isValid(costumer.document) ? 'cpf' : 'cnpj',
            number: costumer.document.replace(/[^?0-9]/g, '')
          }
        ]
      }
    }

    const billingParams = billing?.zipCode
      ? {
          billing: {
            name: 'Billing Address',
            address: {
              country: 'br',
              state: billing.state,
              city: billing.city,
              neighborhood: billing.neighborhood,
              street: billing.address,
              street_number: billing.number,
              zipcode: billing.zipCode.replace(/[^?0-9]/g, '')
            }
          }
        }
      : {}

    const itemsParams =
      items && items.length > 0
        ? {
            items: items.map((item) => ({
              id: item?.id.toString(),
              title: item?.title,
              unit_price: item?.unit_price * 100,
              quantity: item?.quantity || 1,
              tangible: false
            }))
          }
        : {
            items: [
              {
                id: '1',
                title: `t-${transactionCode}`,
                unit_price: total * 100,
                quantity: 1,
                tangible: false
              }
            ]
          }

    const metadataParams = {
      metadata: {
        transaction_code: transactionCode
      }
    }

    const transactionParams = {
      async: false,
      postback_url: process.env.PAGARME_POSTBACK_URL,
      ...paymentParams,
      ...costumerParams,
      ...billingParams,
      ...itemsParams,
      ...metadataParams
    }

    /// /////////////////////////////////////////////////////////////////

    const client = await pagarme.client.connect({
      api_key: 'sk_test_mxrQEmybfvI0EBXo'
    })

    const response = await client.transactions.create(transactionParams)

    console.debug('transactionParams', response)

    return {
      transactionID: response.id,
      status: this.translateStatus(response.status),
      billet: {
        url: response.boleto_url,
        barcode: response.boleto_barcode
      },
      card: {
        id: response.card?.id
      },
      processorResponse: JSON.stringify(response)
    }
  }

  translateStatus (status) {
    const statusMap = {
      processing: 'processing',
      waiting_payment: 'pending',
      authorized: 'pending',
      paid: 'approved',
      refused: 'refused',
      pending_refund: 'refunded',
      refunded: 'refunded',
      charged_back: 'chargedback'
    }

    return statusMap[status] || 'unknown'
  }
}

export default PagarMeProvider
