export interface Product {
    id: string;
    title: string;
    reviewsAmount: number;
    price: number;
}

export interface Review {
    id: string;
    author: string;
    content: string;
    productId: string;
}