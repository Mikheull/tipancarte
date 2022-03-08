import React, {  useEffect, useState, useContext} from "react";
import { useRouter } from "next/router"
import { Store } from "../../context/Store";
import Select from 'react-select'
import axios from "axios";
import colors from '../../seeds/colors.json';
import { Text, Input, Button, Divider, useToasts, Spacer } from '@geist-ui/core'

export default function ProductConfiguration({product}) {
  const { dispatch } = useContext(Store)
  const [config, setConfig] = useState({ })
  const [loading, setLoading] = useState(true)
  const [creation, setCreation] = useState(false)
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
    setCreation(true)

    const body = {
      name: 'Ma pancarte personnalisé', 
      description: 'Ma pancarte personnalisé', 
      category : 'pancarte_custom', 
      price: parseInt(config.price),
      image: '/images/shop/placeholder.jpg',
      planks: []
    }
    config.configureOptions.content.forEach(plank => {
      let p = {}
      
      p.position = plank.index
      p.text = plank.text
      p.direction = plank.direction
      p.bg_color = plank.color_background
      p.bg_color_ref = plank.color_background_raw
      p.text_color = plank.color_text
      p.text_color_ref = plank.color_text_raw

      body.planks.push(p)
    });

    try {
      const data = await axios.post('/api/products/light_create', body, {})
      const product = data.data;
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } })
      router.push('/cart')
      
    } catch (error) {
      setToast({ text: 'Une erreur est survenue !', delay: 2000, placement: 'topRight', type: 'error' })
      setCreation(false)
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
        <Text h2 className="font-bitter">Configurer vos pancartes</Text>
      </div>

      <div className="my-6 w-full">
        {config.configureOptions.content.map(plank => (
          <>
            <div className="block lg:flex" key={plank.index}>
              <div className={`lg:w-7/12 flex items-center justify-center w-full plank ${ plank.direction ? `plank-${plank.direction}` : '' }`} style={ { backgroundColor: `${ plank.color_background }` } }>
                <span style={ { color: `${ plank.color_text }` } } className="text-6xl lg:text-10xl">{plank.text}</span>
              </div>

              <div className="lg:w-1/12 w-0"></div>

              <div className="lg:w-4/12 w-full">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-0 mt-4">
                  <div className="w-full">
                     <label className="">
                      <p className="text-sm m-0 text-black pb-2">
                        Texte
                      </p>
                      <Input width="100%" initialValue={plank.text} maxLength={15} placeholder="TiPancarte" onChange={(val) => handleUpdatePlankClick('text', val.target.value, plank.index)}></Input>
                    </label>
                  </div>
                  
                  <div className="w-full">
                    <label className="">
                        <p className="text-sm m-0 text-black pb-2">
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
                    <label className="">
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
                    <label className="">
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
                <>
                  <Spacer h={2}/>
                  <Divider />
                  <Spacer h={2}/>
                </>
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
      
      <div className="md:w-1/3 w-full">
        <Spacer h={5}/>
          {creation ? 
            <Button loading auto></Button>
          : 
            <button disabled={soldOut} onClick={addToCartHandler} className="h-12 w-full bg-black text-white hover:bg-white hover:text-black hover:border border border-black items-center text-center" type="button">
              { soldOut ? 'Rupture de stock' : `Ajouter au panier | ${price} €` }
            </button>
          }
      </div>
    </div>
  );
}