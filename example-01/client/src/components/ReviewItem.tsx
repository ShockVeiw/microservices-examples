import React from 'react';

interface ReviewItemProps {
    id: string;
    author: string;
    content: string;
}

export function ReviewItem({ id, author, content }: ReviewItemProps) {
    return (
        <li className="review" key={id}>
            <b className="review__author">{author}</b>
            <p className="review__content">{content}</p>
        </li>
    )
}