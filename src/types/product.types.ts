export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category_id: number;
    vendor_id: number;

    createdAt?: Date;
    updatedAt?: Date;
};