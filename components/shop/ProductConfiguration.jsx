import React, {  useEffect, useState, useContext} from "react";
import { useRouter } from "next/router"
import { Store } from "../../context/Store";
import Select from 'react-select'
import axios from "axios";
import Transition from '../../utils/Transition';
import nearestColor from '../../utils/nearest_color';
import colors from '../../seeds/colors.json';
import { Text, Input, Button, Divider, useToasts, Spacer, Popover } from '@geist-ui/core'
import Wheel from '@uiw/react-color-wheel';

export default function ProductConfiguration({product}) {
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state;
  const [config, setConfig] = useState({ })
  const [loading, setLoading] = useState(true)
  const [creation, setCreation] = useState(false)
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });

  const router = useRouter()
  const { setToast } = useToasts()

  useEffect(() => {
    setConfig({
      price: 5,
      color: '',
      name: "Ma pancarte personnalisée",
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
        items.configureOptions.content[index - 1].color_background_raw = value.label;
      }
      if(type == 'color_background_wheel'){
        const nearest = nearestColor(value);
        items.configureOptions.content[index - 1].color_background = nearest.color_code;
        items.configureOptions.content[index - 1].color_background_raw = nearest.label;
      }
      if(type == 'color_text'){
          items.configureOptions.content[index - 1].color_text = value.color_code;
          items.configureOptions.content[index - 1].color_text_raw = value.label;
      }
      if(type == 'color_text_wheel'){
        const nearest = nearestColor(value);
        items.configureOptions.content[index - 1].color_text = nearest.color_code;
        items.configureOptions.content[index - 1].color_text_raw = nearest.label;
      }
      if(type == 'arrow_direction'){
          items.configureOptions.content[index - 1].direction = value;
      }

      setConfig({ ...config, ...items })
  }

  const renameConfiguration = async (value) => {
    let items = {...config};
    items.name = value;
    setConfig({ ...config, ...items })
  }
  
  const addToCartHandler = async () => {
    setCreation(true)

    const body = {
      name: config.name, 
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

    if(userInfo){
      body.user = userInfo._id
    }

    try {
      const data = await axios.post('/api/products/light_create', body, {})
      const product = data.data;
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product } })
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
           <Transition
            show={true}
            appear={true}
            className="w-full"
            enter="transition ease-in-out duration-700 transform order-first"
            enterStart="opacity-0 translate-y-8"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-in-out duration-300 transform absolute"
            leaveStart="opacity-100 translate-y-0"
            leaveEnd="opacity-0 -translate-y-8"
          >
            <div className="block lg:flex" key={plank.index}>
              <div className={`lg:w-7/12 flex items-center justify-center w-full plank ${ plank.direction ? `plank-${plank.direction}` : '' }`} style={ { backgroundColor: `${ plank.color_background }`, transition: "all .5s ease",WebkitTransition: "all .5s ease",MozTransition: "all .5s ease" } }>
                <span style={ { color: `${ plank.color_text }`, transition: "all .3s ease",WebkitTransition: "all .3s ease",MozTransition: "all .3s ease"  } } className="text-6xl lg:text-10xl">{plank.text}</span>
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

                  <div className="w-full mt-2 flex items-end">
                    <label className="w-5/6">
                      <p className="text-sm m-0 text-black pb-3">
                        Couleur du fond
                      </p>
                      <div className="flex items-center w-full">
                        <Select
                          styles={customStyles}
                          className="select_color w-full"
                          value={{ label: plank.color_background_raw, value: 0 }}
                          onChange={(val) => handleUpdatePlankClick('color_background', val, plank.index)}
                          options={colors} />
                      </div>
                    </label>
                    <div className="w-1/6 justify-self-end text-right">
                      <Popover placement="left" content={(
                        <>
                          <Popover.Item title>
                            <span>Roue des couleurs</span>
                          </Popover.Item>
                          <Popover.Item>
                            <Wheel
                              color={hsva}
                              onChange={(color) => setHsva({ ...hsva, ...color.hsva }) || handleUpdatePlankClick('color_background_wheel', color.hex, plank.index)}
                            />
                          </Popover.Item>
                        </>
                      )}>
                        <img src="/images/icons/droplet.svg" alt="Icon pour choisir une couleur" className="h-4 mb-2 ml-4" />
                      </Popover>
                    </div>
                  </div>

                  <div className="w-full mt-2 flex items-end">
                    <label className="w-5/6">
                      <p className="text-sm m-0 text-black pb-3">
                        Couleur du texte
                      </p>
                      <div className="flex items-center w-full">
                        <Select
                          styles={customStyles}
                          className="select_color w-full"
                          value={{ label: plank.color_text_raw, value: 0 }}
                          onChange={(val) => handleUpdatePlankClick('color_text', val, plank.index)}
                          options={colors} />
                      </div>
                    </label>
                    <div className="w-1/6 justify-self-end text-right">
                      <Popover placement="left" content={(
                        <>
                          <Popover.Item title>
                            <span>Roue des couleurs</span>
                          </Popover.Item>
                          <Popover.Item>
                            <Wheel
                              color={hsva}
                              onChange={(color) => setHsva({ ...hsva, ...color.hsva }) || handleUpdatePlankClick('color_text_wheel', color.hex, plank.index)}
                            />
                          </Popover.Item>
                        </>
                      )}>
                        <img src="/images/icons/droplet.svg" alt="Icon pour choisir une couleur" className="h-4 mb-2 ml-4" />
                      </Popover>
                    </div>
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
          </Transition>
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
          <div className='flex flex-col w-full md:w-full'>
            <label htmlFor="name" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
              Nom de la configuration
            </label>
            <Input
                name="name"
                id="name"
                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                width="100%"
                required
                placeholder="Ma pancarte personnalisée"
                initialValue={config.name}
                onChange={e => renameConfiguration(e.target.value)}
            />
        </div>
        <Spacer h={2}/>
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
