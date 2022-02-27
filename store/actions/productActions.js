import commerce from '../../lib/commerce'
import axios from 'axios';

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

export const createProduct = async (content, price) => {
  const checAPIKey = process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY2;

  const body = {
    "product": {
      "name": "Pancarte customisé",
      "sku": "",
      "price": price,
      "description": `Pancarte customisé | Contenu : ${JSON.stringify(content)}`,
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
