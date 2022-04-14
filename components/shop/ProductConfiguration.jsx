import React, { useEffect, useState, useContext} from "react";
import { useRouter } from "next/router"
import { Store } from "../../context/Store";
import Select from 'react-select'
import * as htmlToImage from 'html-to-image';
import axios from 'axios';
import AWS from 'aws-sdk';
import Transition from '../../utils/Transition';
import nearestColor from '../../utils/nearest_color';
import colors from '../../seeds/colors.json';
import full_colors from '../../seeds/full_colors.json';
import ImagePreview from '../../components/shop/ImagePreview.jsx'
import ImageGenPreview from '../../components/shop/ImageGenPreview.jsx'
  // eslint-disable-next-line no-unused-vars
import { Text, Input, Button, Divider, useToasts, Spacer, Popover, Textarea, useModal, Modal, Toggle } from '@geist-ui/core'
import Circle from '@uiw/react-color-circle';

const useCustomModal = () => {
  const { visible, setVisible, bindings } = useModal()

  const toggle = () => {
        setVisible(!visible);
  };

  return [visible, toggle, bindings];
};

export default function ProductConfiguration({product, savedMode}) {
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state;
  // eslint-disable-next-line no-unused-vars
  const [loadedProduct, setLoadedProduct] = useState(false)
  const [config, setConfig] = useState({ })
  const [loading, setLoading] = useState(true)
  const [creation, setCreation] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [saving, setSaving] = useState(false)
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const router = useRouter()
  const { color } = router.query;
  const { setToast } = useToasts()

  // eslint-disable-next-line no-unused-vars
  const [visibleSave, toggleSave, bindingsSave] = useCustomModal();
  // eslint-disable-next-line no-unused-vars
  const [visibleAddToCart, toggleAddToCart, bindingsAddToCart] = useCustomModal();

  const color_list = (color) ? full_colors : colors
  const circle_color_list = color_list.map(function(color){
    return color.color_code
  })

  AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({ accessKeyId: process.env.S3_UPLOAD_KEY, secretAccessKey: process.env.S3_UPLOAD_SECRET, region: process.env.S3_UPLOAD_REGION });
  const s3 = new AWS.S3();
  
  useEffect(() => {
    if(savedMode && product && product.planks){
      const planks_list = product.planks.map(function(plank){
        return {
          color_background: plank.bg_color,
          color_background_raw: plank.bg_color_ref,
          color_text: plank.text_color,
          color_text_raw: plank.text_color_ref,
          text: plank.text,
          direction: plank.direction,
          index: plank.position,
        }
      })

      setConfig({
        price: product.price,
        color: '',
        base64Image: product.base64Image,
        name: product.name,
        comment: product.comment,
        public: product.public,
        configureOptions: {
          quantity: product.planks.length,
          content: planks_list,
          varnishing: false,
        },
      })
    }else{
      setConfig({
        price: 10,
        color: '',
        name: "Ma pancarte personnalisée",
        base64Image: '',
        comment: '',
        public: false,
        configureOptions: {
          quantity: 1,
          content: [
            {
              color_background: '#FCC548',
              color_background_raw: 'Banana 3',
              color_text: '#FBEED2',
              color_text_raw: 'Kenya 6',
              text: 'LE SOLEIL',
              direction: 'right',
              index: 1,
            }
          ],
          varnishing: false,
        },
      })
    }

    setLoading(false)
    setLoadedProduct(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const reorderPlanks = async () => {
    let items = {...config};

    let bulkUpdate = [];

    let i = 1;
    items.configureOptions.content.forEach(element => {
      let up = element
      up.index = i

      bulkUpdate.push(up);
      i ++
    });
  }

  const handleAddPlankClick = async () => {
    let items = {...config};

    if(config.configureOptions.quantity == 6 ){return false}

    const index = items.configureOptions.quantity;
    const body =  {
      color_background: '#F3A07C',
      color_background_raw: 'Cocktail 5',
      color_text: '#FBEED2',
      color_text_raw: 'Kenya 6',
      direction: 'right',
      text: 'Ti Punch',
      index: index + 1,
    }

    items.configureOptions.content.push(body);
    items.price = items.price + 10;
    items.configureOptions.quantity = index + 1;

    setConfig({ ...config, ...items })
    reorderPlanks();
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
        const nearest = nearestColor(value, color_list);
        items.configureOptions.content[index - 1].color_background = nearest.color_code;
        items.configureOptions.content[index - 1].color_background_raw = nearest.label;
      }
      if(type == 'color_text'){
          items.configureOptions.content[index - 1].color_text = value.color_code;
          items.configureOptions.content[index - 1].color_text_raw = value.label;
      }
      if(type == 'color_text_wheel'){
        const nearest = nearestColor(value, color_list);
        items.configureOptions.content[index - 1].color_text = nearest.color_code;
        items.configureOptions.content[index - 1].color_text_raw = nearest.label;
      }
      if(type == 'arrow_direction'){
          items.configureOptions.content[index - 1].direction = value;
      }

      setConfig({ ...config, ...items })
  }

  const handleDeletePlankClick = async (index) => {
    let items = {...config};
    
    const content = items.configureOptions.content.filter(function( obj ) {
      return obj.index !== index;
    });
    
    items.configureOptions.content = content
    items.configureOptions.quantity = items.configureOptions.quantity - 1;
    items.price = items.price - 10;

    setConfig({ ...config, ...items })
    reorderPlanks();
  }

  const renameConfiguration = async (value) => {
    let items = {...config};
    items.name = value;
    setConfig({ ...config, ...items })
  }
  const commentConfiguration = async (value) => {
    let items = {...config};
    items.comment = value;
    setConfig({ ...config, ...items })
  }
  // eslint-disable-next-line no-unused-vars
  const publicableConfiguration = async (value) => {
    let items = {...config};
    items.public = value;
    setConfig({ ...config, ...items })
  }
  
  
  const addToCartHandler = async () => {
    setCreation(true)

    const body = {
      name: config.name, 
      comment: config.comment, 
      category : 'pancarte_custom', 
      price: parseInt(config.price),
      image_preview: '/images/shop/placeholder.jpg',
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


    htmlToImage.toPng(document.getElementById("preview_tipancarte"))
      .then(async function (dataUrl) {
        var rand = function() {
          return Math.random().toString(36).substr(2); 
        };
        var token = function() {
          return rand() + rand();
        };
        
        const filetoken = token();

        const base64Data = new Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const type = dataUrl.split(';')[0].split('/')[1];
      
        const params = {
          Bucket: process.env.S3_UPLOAD_BUCKET,
          Key: `${filetoken}.${type}`, // type is not required
          Body: base64Data,
          ACL: 'public-read',
          ContentEncoding: 'base64', // required
          ContentType: `image/${type}` // required. Notice the back ticks
        }

        let location = '';
        try {
          const { Location } = await s3.upload(params).promise();
          location = Location;
        } catch (error) {
          // console.log(error)
        }
        
        if(location){
          body.image_preview = location
          body.image_S3_Key = `${filetoken}.${type}`
        }

        const data = await axios.post('/api/products/light_create', body, {})
        const product = data.data;
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product } })
        router.push('/cart')
    });
  
      
    } catch (error) {
      setToast({ text: 'Une erreur est survenue !', delay: 2000, placement: 'topRight', type: 'error' })
      setCreation(false)
    }
  }
  
  const saveProductHandler = async () => {
    if (!userInfo) {
      return router.push('/login')
    }
    setSaving(true)

    const body = {
      name: config.name, 
      comment: config.comment, 
      price: parseInt(config.price),
      planks: [],
      user: userInfo._id
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
      if(savedMode){
        const data = await axios.put(`/api/products_saved/update/${product.nanoId}`, body, {
            headers: { authorization: `Bearer ${userInfo.token}` }
        })
        if(data){
          setToast({ text: 'Sauvegardé !', delay: 2000, placement: 'topRight', type: 'success' })
        }else{
          setToast({ text: 'Une erreur est survenue !', delay: 2000, placement: 'topRight', type: 'error' })
        }
        
        setSaving(false)
      }else{
        const data = await axios.post('/api/products_saved/create', body, {
          headers: {
              authorization: `Bearer ${userInfo.token}`
          }
        })
  
        const newproduct = data.data;
        router.push(`/profile/saved/${newproduct.nanoId}`)
      }
      
    } catch (error) {
      setToast({ text: 'Une erreur est survenue !', delay: 2000, placement: 'topRight', type: 'error' })
      setSaving(false)
    }
  }

  const updateBase64Image = async () => {
    htmlToImage.toPng(document.getElementById("preview_tipancarte_solo"))
      .then(async function (dataUrl) {
        let items = {...config};
        items.base64Image = dataUrl;
        setConfig({ ...config, ...items })
      
    });
  }
  
  const { price } = config;
  const soldOut = product.sold_out;

  const customStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#FFF',
        color: "#000",
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

  if(loading){return false}

  return (
    <>
      <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col" data-aos="zoom-y-out" data-aos-delay="250">
        <div id="configuration" className="relative overflow-hidden">

          <div className="w-full">
            <Text h2 className="font-bitter">Configurer vos pancartes</Text>
          </div>

          <div className="my-6 w-full">
            {config.configureOptions.content.map((plank, index) => (
              <Transition
                key={index}
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
                  <div className={`lg:w-7/12 flex items-center justify-center md:tracking-tighter tracking-normal w-full plank ${ plank.direction ? `plank-${plank.direction}` : '' }`} style={ { backgroundColor: `${ plank.color_background }`, transition: "all .5s ease",WebkitTransition: "all .5s ease",MozTransition: "all .5s ease" } }>
                    <span style={ { 
                      color: `${ plank.color_text }`, 
                      transition: "all .3s ease",
                      WebkitTransition: "all .3s ease",
                      MozTransition: "all .3s ease",
                      fontSize: (plank.text.length <= 9 ) ? 'clamp(4.5rem, 12vw, 9rem)' : (plank.text.length >= 9 && plank.text.length <= 11) ? 'clamp(3.5rem, 10vw, 7.5rem)' : (plank.text.length >= 11 && plank.text.length <= 14) ? 'clamp(2.5rem, 9vw, 6rem)' : (plank.text.length >= 14) ? 'clamp(2rem, 8vw, 5rem)' : 'clamp(1rem, 7vw, 3rem)'  
                      } }>{plank.text}</span>
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
                          <div className="flex gap-2 items-center">
                            <Button type={plank.direction == 'left' ? 'default' : 'abort'} onClick={() => handleUpdatePlankClick('arrow_direction', 'left', plank.index)} iconRight={<img src="/images/icons/left-long-solid.svg" className="cursor-pointer h-6 w-6" alt="Icon direction à gauche"/>} auto scale={2/3}></Button>
                            <Button type={plank.direction == 'right' ? 'default' : 'abort'} onClick={() => handleUpdatePlankClick('arrow_direction', 'right', plank.index)} iconRight={<img src="/images/icons/right-long-solid.svg" className="cursor-pointer h-6 w-6" alt="Icon direction à droite"/>} auto scale={2/3}></Button>
                          </div>
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
                              options={color_list} />
                          </div>
                        </label>
                        <div className="w-1/6 justify-self-end text-right">
                          <Popover className="cursor-pointer" placement="left" content={(
                            <>
                              <Popover.Item title>
                                <span>Sélection des couleurs</span>
                              </Popover.Item>
                              <Popover.Item w="300px">
                                <Circle
                                  colors={circle_color_list}
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
                              options={color_list} />
                          </div>
                        </label>
                        <div className="w-1/6 justify-self-end text-right">
                          <Popover className="cursor-pointer" placement="left" content={(
                            <>
                              <Popover.Item title>
                                <span>Sélection des couleurs</span>
                              </Popover.Item>
                              <Popover.Item w="300px">
                                <Circle
                                  colors={circle_color_list}
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

                    <div className="w-full mt-8 flex items-end md:justify-end justify-start">
                      <Button ghost type="error" auto scale={0.75} className="z-0" width="100%" onClick={() => handleDeletePlankClick(plank.index)}>Supprimer</Button>
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
            ))}
          </div>
        
          <ImagePreview product={config.configureOptions.content} />

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
            <Spacer h={2}/>
            <div className="flex items-center gap-2">
              {
                (config.configureOptions.quantity  >= 1) ? (
                  <>
                    {creation ? 
                      <Button loading auto></Button>
                    : 
                      <>
                        <button disabled={soldOut} onClick={() => toggleAddToCart(true)} className="h-12 w-full bg-black text-white hover:bg-white hover:text-black hover:border border border-black items-center text-center" type="button">
                          { soldOut ? 'Rupture de stock' : `Ajouter au panier | ${price} €` }
                        </button>

                        <Modal {...bindingsAddToCart}>
                            <Modal.Title>Ajouter au panier</Modal.Title>
                            <Modal.Content>
                              <div className='flex flex-col w-full md:w-full'>
                                <label htmlFor="cart_name" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                  Donnez un nom a votre configuration
                                </label>
                                <Input
                                    name="cart_name"
                                    id="cart_name"
                                    className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                    width="100%"
                                    required
                                    placeholder="Ma pancarte personnalisée"
                                    initialValue={(savedMode) ? product.name : config.name}
                                    onChange={e => renameConfiguration(e.target.value)}
                                />
                              </div>
                            
                              <Spacer h={2}/>
                              <div className='flex flex-col w-full md:w-full'>
                                <label htmlFor="cart_comment" className="text-xs sm:text-sm tracking-wide text-cdark font-lato">
                                  Donnez des indications (optionnel)
                                </label>
                                <Textarea
                                    width="100%"
                                    resize
                                    name="cart_comment"
                                    id="cart_comment"
                                    onChange={e => commentConfiguration(e.target.value)}
                                    placeholder="Votre message" 
                                    initialValue={(savedMode) ? product.comment : config.comment}
                                />
                              </div>

                              {/* <Spacer h={2}/>
                              <div className='flex flex-col w-full md:w-full'>
                                <p htmlFor="cart_comment" className="text-xs sm:text-sm tracking-wide text-cdark font-lato">
                                  Publier la pancarte sur notre galerie
                                </p>
                                <Toggle onChange={e => publicableConfiguration(e.target.value)} />
                              </div> */}
                              
                            </Modal.Content>
                            <Modal.Action passive onClick={() => toggleAddToCart(false)}>Annuler</Modal.Action>
                            <Modal.Action onClick={() => addToCartHandler()}>Ajouter</Modal.Action>
                        </Modal>
                      </>
                    }

                    <Button type="" icon={<img src="/images/icons/heart.svg" className="cursor-pointer h-6 w-6" alt="Favoris"/>} ghost auto onClick={() => toggleSave(true)}></Button>
                    <Modal {...bindingsSave}>
                        <Modal.Title>Sauvegarder</Modal.Title>
                        <Modal.Content>
                          {savedMode ? (<p>Vous allez mettre à jour votre pancarte.<br/> Elle sera toujours disponible depuis votre profil et vous pourrez toujours la modifier avant de l&apos;ajouter au panier</p>) : (<p>Vous allez sauvegarder votre pancarte dans sa configuration actuelle.<br/> Elle sera alors disponible depuis votre profil et vous pourrez toujours la modifier avant de l&apos;ajouter au panier</p>)}
                          <Spacer h={3}/>

                          <div className='flex flex-col w-full md:w-full'>
                            <label htmlFor="save_name" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                              Donnez un nom a votre sauvegarde
                            </label>
                            <Input
                                name="save_name"
                                id="save_name"
                                className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                width="100%"
                                required
                                placeholder="Ma pancarte personnalisée"
                                initialValue={(savedMode) ? product.name : config.name}
                                onChange={e => renameConfiguration(e.target.value)}
                            />
                          </div>
                        </Modal.Content>
                        <Modal.Action passive onClick={() => toggleSave(false)}>Annuler</Modal.Action>
                        <Modal.Action onClick={() => saveProductHandler()}>Sauvegarder</Modal.Action>
                    </Modal>
                  </>
                ) : (
                  <Text type="error">Votre pancarte est vide !</Text>
                )
              }
              
            </div>
          </div>
        </div>
      </div>

      <Spacer h={5}/>
      <div className="bg-gray-50" data-aos="zoom-y-out" data-aos-delay="250">
        <div className="py-6 mx-auto max-w-7xl md:px-4 px-10 flex flex-col">
          <div className="w-full">
            <ImageGenPreview product={config.configureOptions.content} content={config} update={() => updateBase64Image()} />
          </div>
        </div>
      </div>
    </>
  );
}
