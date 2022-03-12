import React, { useState } from "react";
import Link from 'next/link'
import ClientReviewStars from './ClientReviewStars';
import { Collapse } from 'react-collapse';
import { Link as LinkScroll } from 'react-scroll';

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


    return (
        <>
            <LinkScroll activeClass="active" to="reviews" spy={true} smooth={true}>
                <div className="cursor-pointer text-black">
                    <ClientReviewStars />
                </div>
            </LinkScroll>

            <Text h1 className="my-4 font-bitter">{product.name}</Text>
            {previewMode && <Tooltip text={'Cette pancarte à été crée par un utilisateur !'} placement="right" type="dark"><Tag>Mode: Previsualisation</Tag></Tooltip>}
            <Text p className="my-4"><span dangerouslySetInnerHTML={{__html: product.description}}></span></Text>

            <div className="flex py-4">
                {!previewMode ? (
                    <LinkScroll activeClass="active" to="configuration" spy={true} smooth={true} className="w-full">
                        <button disabled={product.soldOut} className="h-12 w-full bg-black text-white hover:bg-white hover:text-black hover:border border border-black pl-3 pr-4 items-center text-center" type="button">
                            { product.soldOut ? 'Rupture de stock' : 'Configurer' }
                        </button>
                    </LinkScroll>
                    
                    
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
                        Expédition dans toute la France métropolitaine en 5 à 7 jours par Mondial Relais.<br />
                        Retours et échanges non acceptés dû a la grande configuration des flèches.
                    </div>
                </Collapse>
                <Divider />

                <div onClick={toggleDetails} className="flex justify-between cursor-pointer py-3 font-medium">
                    Détails
                    {showDetails ? <img src="/images/icons/minus.svg" alt="Icon Plus" /> : <img src="/images/icons/plus.svg" alt="Icon Moins" />}
                </div>
                <Collapse isOpened={showDetails}>
                    <div className="pb-4 font-normal text-gray-700">
                        Pancarte de décorations avec des flèches directionnelle en bois personnalisable.<br />
                        Taille des flèches : L25cm x h6cm <br/>
                        Vous pouvez choisir des textes, des couleurs et la directions pour chaque flèches. <br/>
                        Les pancartes sont réalisées à la main, et peuvent être différentes de l&apos;aperçu ci-dessous ! <br/>
                        Le lot vous est livré sans la barre de soutien, ni clous !<br />
                        Fabriqué en France.
                    </div>
                </Collapse>
                <Divider />
            </div>
           


        </>
    )
}

export default ProductDetails
