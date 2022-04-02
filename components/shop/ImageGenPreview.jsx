import React, {useState} from "react";
import { Text, Button } from '@geist-ui/core'

export default function ImageGenPreview({update, content, product}) {
  const [preview, setPreview] = useState(false)

  if(!product){return 'loading'}

  return (
    <>
      <div className="text-center pb-12 md:pb-16">
        <Text h1 className='text-5xl font-bitter md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4' data-aos="zoom-y-out">Votre <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-violet-400">TiPancarte</span></Text>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl font-bitter font-semibold text-gray-800 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Prévisualisez un aperçu de votre configuration dans une situations réelle</p>
          <Button onClick={() => update() && setPreview(true)}>{preview ? 'Actualiser' : 'Prévisualiser'}</Button>
        </div>
      </div>
      {preview && (
        <div className="w-full h-full relative">
          <img className="object-center object-cover md:w-1/2 w-full mx-auto h-full" src="https://tipancarte.s3.eu-west-3.amazonaws.com/files/example_door.jpg" alt="Visuel représentant un exemple dans un salon" />
          <img className="object-center object-cover md:w-1/5 w-1/2 absolute" style={{left: "48%", top: "25%"}} src= {content.base64Image} alt="" />
        </div>
      )}
    </>
  );
}
