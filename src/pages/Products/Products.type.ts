export interface IProduct {
    // интерфейс данных, соответствующий структуре ответа от сервера

    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}