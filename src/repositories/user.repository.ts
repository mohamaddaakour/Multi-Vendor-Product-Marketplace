import { pool } from "../config/db";
import type { User, UserRole } from "../types/user.types";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    return result.rows[0] || null;
  }

  async createUser(
    email: string,
    password: string,
    role: UserRole,
  ): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, password, role)
        VALUES ($1, $2, $3)
        RETURNING id, email, role, created_at, updated_at`,
      [email, password, role],
    );

    return result.rows[0];
  }
}
