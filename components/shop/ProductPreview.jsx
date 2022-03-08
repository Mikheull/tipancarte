import React, { useState, useContext} from "react";
import { useRouter } from "next/router"
import { Store } from "../../context/Store";
import Transition from '../../utils/Transition';
import { Text, Input, Button, Divider, useToasts, Spacer } from '@geist-ui/core'

export default function ProductPreview({product}) {
  const { dispatch } = useContext(Store)
  const [creation, setCreation] = useState(false)
  const router = useRouter()
  const { setToast } = useToasts()

  const { price } = product;
  const soldOut = product.sold_out;

  const addToCartHandler = async () => {
    setCreation(true)

    try {
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } })
      router.push('/cart')
      
    } catch (error) {
      setToast({ text: 'Une erreur est survenue !', delay: 2000, placement: 'topRight', type: 'error' })
      // setCreation(false)
    }
  }

  if(!product || !product.planks){return 'loading'}

  return (
    <div id="configuration">

      <div className="w-full">
        <Text h2 className="font-bitter">Détails de cette configuration</Text>
      </div>

      <div className="my-6 w-full">
        {product.planks.map(plank => (
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
            <div className="block lg:flex" key={plank.position}>
              <div className={`lg:w-7/12 flex items-center justify-center w-full plank ${ plank.direction ? `plank-${plank.direction}` : '' }`} style={ { backgroundColor: `${ plank.bg_color }`, transition: "all .5s ease",WebkitTransition: "all .5s ease",MozTransition: "all .5s ease" } }>
                <span style={ { color: `${ plank.text_color }`, transition: "all .3s ease",WebkitTransition: "all .3s ease",MozTransition: "all .3s ease"  } } className="text-6xl lg:text-10xl">{plank.text}</span>
              </div>

              <div className="lg:w-1/12 w-0"></div>

              <div className="lg:w-4/12 w-full">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-0 mt-4">
                  <div className="w-full">
                     <label className="">
                      <p className="text-sm m-0 text-black pb-2">
                        Texte
                      </p>
                      <Input width="100%" readOnly initialValue={plank.text}></Input>
                    </label>
                  </div>
                  
                  <div className="w-full">
                    <label className="">
                        <p className="text-sm m-0 text-black pb-2">
                          Direction
                        </p>
                        <Input width="100%" readOnly initialValue={plank.direction}></Input>
                      </label>
                  </div>

                  <div className="w-full mt-2">
                    <label className="">
                        <p className="text-sm m-0 text-black pb-3">
                          Couleur du fond
                        </p>
                        <Input width="100%" readOnly initialValue={plank.bg_color_ref}></Input>
                      </label>
                  </div>
                  <div className="w-full mt-2">
                    <label className="">
                      <p className="text-sm m-0 text-black pb-3">
                      Couleur du texte
                    </p>
                    <Input width="100%" readOnly initialValue={plank.text_color_ref}></Input>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            { plank.position < 6 ? (
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
    
      <div className="md:w-1/3 w-full">
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