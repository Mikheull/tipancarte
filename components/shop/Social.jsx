import React from 'react';
import { Text, Link } from '@geist-ui/core'

export default function Social() {

  const imagesInfo = [
    {
      image: '/images/insta/original__post_insta.jpg',
      translateRatio: -50
    },
    {
      image: '/images/insta/2.jpg',
      translateRatio: 30
    },
    {
      image: '/images/insta/original__post_insta.jpg',
      translateRatio: 0
    },
    {
      image: '/images/insta/4.jpg',
      translateRatio: -20
    },
    {
      image: '/images/insta/original__post_insta.jpg',
      translateRatio: -80
    }
  ];

  return (
    <div className="mx-auto max-w-7xl md:px-0 px-10">
      <div className='w-full md:w-1/2 mx-auto'>
        <Text h2>Suivez nous sur Instagram pour des idées de pancartes</Text>
        <Link href="https://instagram.com/tipancarte" target={"_blank"} rel="noreferrer" icon><span className='underline'>Instagram</span></Link>
      </div>
        
      <div className="flex footer-follow--images">
        {imagesInfo.map((item, i) => (
          <div key={i} className="justify-content-sm-end flex-col follow-images">
            <div
              style={{
                paddingBottom: '100%',
                background: `url("${item.image}") center center/cover`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}