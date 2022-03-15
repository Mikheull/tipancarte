import React, { useState } from "react";
import ClientReviewStars from '../shop/ClientReviewStars';
import { Collapse } from 'react-collapse';
import { Link as LinkScroll } from 'react-scroll';

import {  Divider, Tag, Tooltip} from '@geist-ui/core'

function ProductDetailsLoading({ previewMode = false, savedMode = false }) {
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

            <div className="my-4 font-bitter animate-pulse bg-slate-200 h-4 w-full"></div>
            {previewMode && <Tooltip text={'Cette pancarte à été crée par un utilisateur !'} placement="right" type="dark"><Tag>Mode: Previsualisation</Tag></Tooltip>}
            {savedMode && <Tooltip text={'Cette pancarte à été sauvegardée dans votre profil !'} placement="right" type="dark"><Tag>Mode: Sauvegarde</Tag></Tooltip>}
            <div className="my-4 animate-pulse bg-slate-200 h-20 w-full"></div>

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

export default ProductDetailsLoading
