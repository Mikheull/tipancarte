import React, {  useEffect, useState, useContext} from "react";
import { useRouter } from "next/router"
import { Store } from "../../context/Store";
import Select from 'react-select'
import axios from "axios";
import colors from '../../seeds/colors.json';
import { Text, Input, Button, Divider, useToasts } from '@geist-ui/core'

export default function ProductConfiguration({product}) {
  const { dispatch } = useContext(Store)
  const [config, setConfig] = useState({ })
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { setToast } = useToasts()

  useEffect(() => {
    setConfig({
      price: 5,
      configureOptions: {
        quantity: 1,
        content: [
          {
            color_background: '#384C6C',
            color_background_raw: 'Saphir',
            color_text: '#F5B4B9',
            color_text_raw: 'Cabaret 2',
            text: 'LE SOLEIL',
            direction: 'right',
            index: 1,
          }
        ],
        varnishing: false,
      },
    })
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleAddPlankClick = async () => {
    let items = {...config};

    if(config.configureOptions.quantity == 6 ){return false}

    const index = items.configureOptions.quantity + 1;
    const body =  {
      color_background: '#384C6C',
      color_background_raw: 'Saphir',
      color_text: '#F5B4B9',
      color_text_raw: 'Cabaret 2',
      direction: 'right',
      text: 'Ti Punch',
      index: index,
    }

    items.configureOptions.content[index - 1] = body;
    items.price = items.price + 5;
    items.configureOptions.quantity = index;

    setConfig({ ...config, ...items })
  }

  const handleUpdatePlankClick = async (type, value, index) => {
      let items = {...config};

      if(type == 'text'){
        items.configureOptions.content[index - 1].text = value.toUpperCase();
      }
      if(type == 'color_background'){
        items.configureOptions.content[index - 1].color_background = value.color_code;
        items.configureOptions.content[index - 1].color_background_raw = value.value;
      }
    if(type == 'color_text'){
        items.configureOptions.content[index - 1].color_text = value.color_code;
        items.configureOptions.content[index - 1].color_text_raw = value.value;
    }
    if(type == 'arrow_direction'){
        items.configureOptions.content[index - 1].direction = value;
    }

    setConfig({ ...config, ...items })
  }
  
  const addToCartHandler = async () => {

    const ref = 'Ma pancarte personnalisé';
    const category = 'pancarte_custom';
    const price = config.price;
    const brand = 'brand';
    let description = `${ref} : <br /><br />`;
    description += `Quantité de planches : ${config.configureOptions.quantity}<br />`
    description += `Vernissage : ${(config.configureOptions.varnishing) ? 'Oui' : 'Non'} <br /><br />`

    config.configureOptions.content.map(function(plank){
      description += `Planche n°${plank.index} :<br />`
      description += `Texte : ${plank.text}<br />`
      description += `Couleur du fond : ${plank.color_background} (${plank.color_background_raw})<br />`
      description += `Couleur du texte : ${plank.color_text} (${plank.color_text_raw})<br />`
      description += `Direction de la flèche : ${plank.direction} <br /><br />`
      return plank
    })

    try {
      const data = await axios.post('/api/products/light_create', { name: ref, description, category, price: parseInt(price), countInStock: 1, brand }, {})
      const product = data.data;
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } })
      router.push('/cart')

    } catch (error) {
      setToast({ text: 'Une erreur est survenue !', delay: 2000, placement: 'topRight', type: 'error' })
    }
  }


  const { price } = config;
  const soldOut = product.sold_out;

  const customStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#FFF',
        color: (data.label == 'Blanc') ? "#000" : data.color_code,
        cursor: 'pointer',
        ':hover': {
          ...styles[':hover'],
          backgroundColor: (data.label == 'Blanc') ? "#000" : data.color_code,
          color: '#FFF',
        },
      };
    },

    singleValue: (provided, state) => {
      if(state.data.label == 'Blanc'){return { ...provided, color: "#000" }}
      return { ...provided, color: state.data.color_code };
    }
  }

  const customStylesDirection = {
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: '#FFF',
        color: '#000',
        cursor: 'pointer',
      };
    },
  }
  
  if(loading){return 'loading'}

  return (
    <div id="configuration">

      <div className="w-full">
        <Text h2>Configurer vos pancartes</Text>
      </div>

      <div className="my-6 w-full">
        {config.configureOptions.content.map(plank => (
          <>
            <div className="block lg:flex" key={plank.index}>
              <div className={`md:w-7/12 flex items-center justify-center w-full plank ${ plank.direction ? `plank-${plank.direction}` : '' }`} style={ { backgroundColor: `${ plank.color_background }` } }>
                <span style={ { color: `${ plank.color_text }` } } className="text-6xl md:text-10xl">{plank.text}</span>
              </div>

              <div className="md:w-1/12 w-0"></div>

              <div className="md:w-4/12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <Input initialValue={plank.text} maxLength={15} placeholder="TiPancarte" scale={4/3} onChange={(val) => handleUpdatePlankClick('text', val.target.value, plank.index)}><span className="text-sm m-0 text-black">Texte</span></Input>
                  </div>
                  
                  <div className="w-full">
                    <label className="w-100">
                        <p className="text-sm m-0 text-black pb-3">
                          Direction
                        </p>
                        <Select
                          styles={customStylesDirection}
                          className="select_color"
                          onChange={(val) => handleUpdatePlankClick('arrow_direction', val.value, plank.index)}
                          options={[{value: 'left', label: 'Gauche'}, {value: 'right', label: 'Droite'}]} />
                      </label>
                  </div>

                  <div className="w-full mt-2">
                    <label className="w-100">
                        <p className="text-sm m-0 text-black pb-3">
                          Couleur du fond
                        </p>
                        <Select
                          styles={customStyles}
                          className="select_color"
                          onChange={(val) => handleUpdatePlankClick('color_background', val, plank.index)}
                          options={colors} />
                      </label>
                  </div>
                  <div className="w-full mt-2">
                    <label className="w-100">
                      <p className="text-sm m-0 text-black pb-3">
                      Couleur du texte
                    </p>
                    <Select
                      styles={customStyles}
                      className="select_color"
                      onChange={(val) => handleUpdatePlankClick('color_text', val, plank.index)}
                      options={colors} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            { plank.index < 6 ? (
              <div className="my-4">
                <Divider />
              </div>
            ) : '' }
          </>
        ))}
      </div>

      { config.configureOptions.quantity < 6 ? (
          <div className={`md:w-7/12 border border-slate-500 border-dashed text-6xl w-full plank`}>
            <button onClick={handleAddPlankClick} className="w-full h-full flex items-center justify-center">
              <img src="/images/icons/plus.svg" alt="Icon pour ajouter une planche" className="w-16" />
            </button>
          </div>
        ) : (
          <Text type="error">Vous êtes limité à 6 planches au maximum !</Text>
      ) }
      
      <div className="my-6 w-full">
        <Button type="secondary" onClick={addToCartHandler}>{ soldOut ? 'Rupture de stock' : `Ajouter au panier | ${price} €` }</Button>
      </div>
    </div>
  );
}
