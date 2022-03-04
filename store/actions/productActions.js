import commerce from '../../lib/commerce'
import axios from 'axios';
import moment from "moment";

import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from './actionTypes';


/**
 * Handle create product success and update store
 */
export const createProductSuccess = (product) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: product
  }
}

/**
 * Handle error on creating product
 */
export const createProductError = (error) => {
  console.log('Error creating product', error);
  return {
    type: CREATE_PRODUCT_ERROR,
  }
}

/**
 * Async creat product
 */

export const createProduct = async (content, price, customer) => {
  const checAPIKey = process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY2;

  const today = moment(Date.now());
  const name = (customer) ? `Pancarte pour ${customer.firstname}` : `Pancarte`

  let description = `${name} : ||`;
  description += `Taille : ${content.size},`
  description += `Quantité de planches : ${content.quantity},`
  description += `Peinture complète : ${(content.full_paint) ? 'Oui' : 'Non'},`
  description += `Vernissage : ${(content.varnishing) ? 'Oui' : 'Non'} ||   ||`

  content.content.map(function(plank){
    description += `Planche n°${plank.index} :`
    description += `Texte : ${plank.text},`
    description += `Couleur du fond : ${plank.color_background} (${plank.color_background_raw}),`
    description += `Couleur du texte : ${plank.color_text} (${plank.color_text_raw}),`
    description += `Direction de la flèche : ${plank.direction} ||   ||`
    return plank
  })

  description += today


  const body = {
    "product": {
      "name": "Pancarte personnalisée",
      "sku": "",
      "price": price,
      "description": description,
      "quantity": 1,
      "pay_what_you_want": false,
      "tax_exempt": false,
      "active": true,
      "sort_order": 25
    },
    "collect": {
      "shipping": true,
      "billing": true,
      "fullname": true
    },
    "variant_groups": [],
    "extra_field": [],
    "delivery": {
      "enabled": {
        "digital": true,
        "shipping_native_v1": true
      },
      "digital": {},
      "shipping_zones":[
        {
            "zone_id":"zone_ZM8X5nWXvlpv4q",
            "rates":
                [
                    {
                        "base_rate_id":"ship_mOVKl4BBroprRP",
                        "on_own": 0,
                        "with_others": 0
                    }
                ]
        }
      ]
    },
    "assets": [],
    "categories": [
      {
        "id": "cat_NqKE50KqNodgBL"
      }
    ],
    "related_products": [],
    "attributes": []
  }
  const options = {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2021-03-10',
      'X-Authorization': checAPIKey,
    }
  }
  const res = await axios.post('https://api.chec.io/v1/products', body, options)

  const bodyAsset = {
    "assets":
      [
        {
          "id":"ast_kpnNwA1J9XwmXB",
          "sort_order":25
        }
      ]
  }
  const optionsAsset = {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2021-03-10',
      'X-Authorization': checAPIKey,
    }
  }
  const resAsset = await axios.put(`https://api.chec.io/v1/products/${res.data.id}/assets`, bodyAsset, optionsAsset)

  return res
}
