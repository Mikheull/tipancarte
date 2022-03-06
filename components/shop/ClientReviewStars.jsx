import React from 'react';
import reviews from '../../seeds/reviews.json';

export default function ClientReviewStars() {
  const total = reviews.map(function(review){
    return review.stars
  })
  const sum = total.reduce((a, b) => a + b, 0);
  const avg = (sum / total.length) || 0;

  return (
    <div className="flex">
      <div className="flex relative">
        {[1, 2, 3, 4, 5].map(index => (
          <img key={index} src="/images/icons/star.svg" alt="" className="w-4" />
        ))}
        <div
          className="flex absolute left-0 top-0 right-0 bottom-0 overflow-hidden"
          style={{ flexWrap: 'nowrap', width: `${avg * 20}%` }}
        >
          {[1, 2, 3, 4, 5].map(index => (
            <img key={index} src="/images/icons/star-solid.svg" alt="" className="w-4 block" />
          ))}
        </div>
      </div>
      <span className="ml-2 text-sm font-semibold">
        {avg}/5
      </span>
    </div>
  );
}
