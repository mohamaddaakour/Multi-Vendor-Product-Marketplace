import { pool } from "../config/db";
import { Product } from "../types/product.types";

export class ProductRepository {
    
     async createProduct(product: Omit<Product, "id">): Promise<Product> {
        const result = await pool.query(
            `INSERT INTO products (name, description, price, stock, category_id, vendor_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                product.name,
                product.description,
                product.price,
                product.stock,
                product.category_id,
                product.vendor_id
            ]
        );

        return result.rows[0];
    }
}