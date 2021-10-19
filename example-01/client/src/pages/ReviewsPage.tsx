import React from 'react';
import axios from 'axios';
import { useParams, useLocation, Link } from 'react-router-dom';

import { Review } from '../shared/interfaces';
import { ReviewItem } from '../components/ReviewItem';
import '../styles/ReviewsPage.css';

interface ReviewsPageParamTypes {
    productId: string;
}

interface ReviewsPageLocationState {
    productTitle: string;
}

export function ReviewsPage() {
    const [reviews, setReviews] = React.useState<Review[]>([]);
    const { productId } = useParams<ReviewsPageParamTypes>();
    const inputAuthorRef = React.useRef<HTMLInputElement>(null);
    const textAreaContentRef = React.useRef<HTMLTextAreaElement>(null);
    const location = useLocation<ReviewsPageLocationState>();
    const { productTitle } = location.state;

    const fetchReviews = async () => {
        const res = await axios.get(`http://localhost:5001/products/${productId}/reviews`);

        setReviews(res.data);
    }

    const createReview = (content: string, author?: string) => {
        if (!content) {
            alert('A review cannot be empty!');
            return;
        }

        axios
            .post(`http://localhost:5001/products/${productId}/reviews/create`, { author, content })
            .then(fetchReviews)
    }

    React.useEffect(() => {
        fetchReviews();
    });

    return (
      <>
          <Link to="/">
              <button className="back-btn">🠔</button>
          </Link>
          <h1 className="app__title">{`Reviews of ${productTitle}`}</h1>
          <form className="add-review-form">
              <input className="add-review-form__input" type="text" placeholder="Your nickname" ref={inputAuthorRef}/>
              <textarea
                  className="add-review-form__textarea"
                  placeholder="Share your experience about the product"
                  ref={textAreaContentRef}
              />
              <button
                  onClick={() => createReview(textAreaContentRef?.current?.value || '', inputAuthorRef?.current?.value || undefined)}
              >Add</button>
          </form>
          <ul className="reviews-list">
              {reviews.map((review: Review) => <ReviewItem id={review.id} author={review.author} content={review.content} />)}
          </ul>
      </>
    );
}