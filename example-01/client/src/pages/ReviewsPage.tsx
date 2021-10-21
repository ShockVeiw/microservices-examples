import React from 'react';
import axios from 'axios';
import { useParams, useLocation, Link } from 'react-router-dom';

import { Review, Product } from '../shared/interfaces';
import { ReviewItem } from '../components/ReviewItem';
import '../styles/ReviewsPage.css';

interface ReviewsPageState {
    productTitle: string;
    reviews: Review[];
}

interface ReviewsPageParamTypes {
    productId: string;
}

interface ReviewsPageLocationState {
    productTitle: string;
}

export function ReviewsPage() {
    const [state, setState] = React.useState<ReviewsPageState>({ productTitle: '', reviews: [] });
    const { productId } = useParams<ReviewsPageParamTypes>();
    const inputAuthorRef = React.useRef<HTMLInputElement>(null);
    const textAreaContentRef = React.useRef<HTMLTextAreaElement>(null);
    const location = useLocation<ReviewsPageLocationState>();

    const fetchReviews = async () => {
        const productTitle =
            state.productTitle ||
            location?.state?.productTitle ||
            ((await axios.get(`http://products.com/products/${productId}`)).data as Product).title;
        const { data: reviews } = await axios.get(`http://products.com/reviews/${productId}`);

        setState({ productTitle, reviews });
    }

    const createReview = (content: string, author?: string) => {
        if (!content) {
            alert('A review cannot be empty!');
            return;
        }

        axios
            .post(`http://products.com/reviews/${productId}/create`, { author, content })
            .then(fetchReviews)

        if (inputAuthorRef?.current?.value) inputAuthorRef.current.value = '';
        if (textAreaContentRef?.current?.value) textAreaContentRef.current.value = '';
    }

    React.useEffect(() => {
        fetchReviews();
    });

    return (
      <>
          <Link to="/">
              <button className="back-btn">🠔</button>
          </Link>
          <h1 className="app__title">{`Reviews of ${state.productTitle}`}</h1>
          <form className="add-review-form">
              <input className="add-review-form__input" type="text" placeholder="Your nickname" ref={inputAuthorRef}/>
              <textarea
                  className="add-review-form__textarea"
                  placeholder="Share your experience about the product"
                  ref={textAreaContentRef}
              />
              <button
                  type="button"
                  onClick={() => createReview(textAreaContentRef?.current?.value || '', inputAuthorRef?.current?.value || undefined)}
              >Add</button>
          </form>
          <ul className="reviews-list">
              {state.reviews.map((review: Review) => <ReviewItem id={review.id} author={review.author} content={review.content} />)}
          </ul>
      </>
    );
}