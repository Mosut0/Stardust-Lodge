import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <h3>{review.reviewer}</h3>
          <p>{review.review}</p>
          <p>Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
