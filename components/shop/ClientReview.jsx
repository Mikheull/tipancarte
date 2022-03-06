import React from 'react';
import reviews from '../../seeds/reviews.json';
import { Text, useModal, Modal } from '@geist-ui/core'
import ReviewStars from './ReviewStars';

export default function ClientReview() {
  const { setVisible, bindings } = useModal()

  const total = reviews.map(function(review){
    return review.stars
  })
  const sum = total.reduce((a, b) => a + b, 0);
  const avg = (sum / total.length) || 0;

  return (
    <div className="mt-10" id="reviews">
      <Text h3>{avg} étoiles sur {reviews.length} avis</Text>

      <div className='grid md:grid-cols-2 grid-cols-1 bg-violet-50'>
        {reviews.map((review, index) => (
          (index >= 4) ? '' : (
            <div className='px-10 py-12 border border-violet-100' key={index}>
              <ReviewStars count={review.stars} />

              <div>
                <Text p className='text-2xl'>{review.title}</Text>
                <Text p className=''>{review.description}</Text>
                <span className='text-gray-400 text-sm'>{review.reviewBy} | {review.date}</span>
              </div>
            </div>
          )
        ))}
      </div>

      <div className='py-6 border border-violet-100 bg-violet-50 flex items-center justify-center cursor-pointer' onClick={() => setVisible(true)}>
        <span className='underline'>Voir tout les avis</span>
      </div>

      <Modal {...bindings} width="90vw">
        <Modal.Title>
          <div className='flex justify-between items-center w-full'>
            <div>Tout les avis</div>
            <img
              src={`/images/icons/cross.svg`}
              className="cursor-pointer h-6"
              alt="Close icon"
              onClick={() => setVisible(false)}
            />
          </div>
        </Modal.Title>

        <Modal.Content>
          <div className='grid md:grid-cols-2 grid-cols-1 bg-violet-50'>
            {reviews.map((review, index) => (
              <div className='px-10 py-12 border border-violet-100' key={index}>
                <ReviewStars count={review.stars} />

                <div>
                  <Text p className='text-2xl'>{review.title}</Text>
                  <Text p className=''>{review.description}</Text>
                  <span className='text-gray-400 text-sm'>{review.reviewBy} | {review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}
