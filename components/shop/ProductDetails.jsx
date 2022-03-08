import React, { useState } from "react";
import Link from 'next/link'
import ClientReviewStars from './ClientReviewStars';
import { Collapse } from 'react-collapse';
import { animateScroll as scroll } from 'react-scroll';

import { Text, Divider, Tag, Tooltip} from '@geist-ui/core'

function ProductDetails({ product, previewMode = false }) {
    const [showShipping, setShowShipping] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    const toggleShipping = () => {
        setShowShipping(!showShipping);
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

      
    const handleReviewClick = async () => {
        const section = document.querySelector('#reviews');
    
        if (section) {
          scroll.scrollTo(section.offsetTop - 130, {
            smooth: 'easeInOutQuint'
          });
        }
    }
    
    const handleConfigurationClick = async () => {
        const section = document.querySelector('#configuration');
    
        if (section) {
          scroll.scrollTo(section.offsetTop - 130, {
            smooth: 'easeInOutQuint'
          });
        }
    }

    return (
        <>
            <div className="cursor-pointer" onClick={handleReviewClick}>
                <ClientReviewStars />
            </div>

            <Text h1 className="my-4 font-bitter">{product.name}</Text>
            {previewMode && <Tooltip text={'Cette pancarte à été crée par un utilisateur !'} placement="right" type="dark"><Tag>Mode: Previsualisation</Tag></Tooltip>}
            <Text p className="my-4"><span dangerouslySetInnerHTML={{__html: product.description}}></span></Text>

            <div className="flex py-4">
                {!previewMode ? (
                    <button disabled={product.soldOut} onClick={handleConfigurationClick} className="h-12 w-full bg-black text-white hover:bg-white hover:text-black hover:border border border-black pl-3 pr-4 items-center text-center" type="button">
                        { product.soldOut ? 'Rupture de stock' : 'Configurer' }
                    </button>
                ) : (
                    <Link href="/shop">
                        <a className="h-12 w-full bg-black text-white hover:bg-white hover:text-black hover:border border border-black pl-3 pr-4 flex items-center justify-center">
                            { product.soldOut ? 'Rupture de stock' : 'Créer la mienne' }
                        </a>
                    </Link>
                )}
            </div>

            <div className="mt-12">
                <div onClick={toggleShipping} className="flex justify-between cursor-pointer py-3 font-medium">
                    Livraisons et retours
                    {showShipping ? <img src="/images/icons/minus.svg" alt="Icon Plus" /> : <img src="/images/icons/plus.svg" alt="Icon Moins" />}
                </div>
                <Collapse isOpened={showShipping}>
                    <div className="pb-4 font-normal text-gray-700">
                        Livraison dans toute la France métropolitaine en 5 à 7 jours.<br />
                        Retours sous 14 jours.
                    </div>
                </Collapse>
                <Divider />

                <div onClick={toggleDetails} className="flex justify-between cursor-pointer py-3 font-medium">
                    Details
                    {showDetails ? <img src="/images/icons/minus.svg" alt="Icon Plus" /> : <img src="/images/icons/plus.svg" alt="Icon Moins" />}
                </div>
                <Collapse isOpened={showDetails}>
                    <div className="pb-4 font-normal text-gray-700">
                        Taille des planches : L25cm x h6cm <br/>
                        Vous pouvez choisir des textes, des couleurs et la directions pour chaque flèches. <br/> 
                        Les pancartes sont peintes à la main, et peuvent être différentes de l&apos;aperçu ci-dessous ! <br/>
                        Le lot vous est livré sans la barre de soutien, ni clous !
                    </div>
                </Collapse>
                <Divider />
            </div>
           


        </>
    )
}

export default ProductDetails
