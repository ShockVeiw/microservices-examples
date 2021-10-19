import React from 'react';

interface ReviewItemProps {
    author: string;
    content: string;
}

export function ReviewItem({ author, content }: ReviewItemProps) {
    return (
        <li className="review">
            <b className="review__author">{author}</b>
            <p className="review__content">{content}</p>
        </li>
    )
}