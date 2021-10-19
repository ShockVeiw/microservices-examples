import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Review } from '../shared/interfaces';
import { ReviewItem } from '../components/ReviewItem';
import '../styles/ReviewsPage.css';

interface ReviewsPageParamTypes {
    productId: string;
}

export function ReviewsPage() {
    const [reviews, setReviews] = React.useState<Review[]>([]);
    const { productId } = useParams<ReviewsPageParamTypes>();

    const fetchReviews = async () => {
        const res = await axios.get(`http://localhost:5001/products/${productId}/reviews`);

        setReviews(res.data);
    }

    React.useEffect(() => {
        fetchReviews();
    }, []);

    return (
      <>
          <h1 className="app__title">Comments</h1>
          <form className="add-review-form">
              <input className="add-review-form__input" type="text" placeholder="Your nickname"/>
              <textarea className="add-review-form__textarea" placeholder="Share your experience about the product"></textarea>
              <button>Add</button>
          </form>
          <ul className="reviews-list">
              {reviews.map((review: Review) => <ReviewItem author={review.author} content={review.content} />)}
          </ul>
      </>
    );
}