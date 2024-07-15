import { ICategory } from '@bic_todo/domain/entities/category';
import { ICategoryRepository } from '@bic_todo/domain/repositories/category-repository';
import SQLite from '@bic_todo/infrastructure/database/sqlite';

export class SqliteCategoryRepository implements ICategoryRepository {
  constructor(private readonly database: SQLite) {}

  async configure() {
    await this.createTableIfNotExist();
  }

  async createTableIfNotExist() {
    const query = `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL, 
          color TEXT NOT NULL,
          isDefault INTEGER NOT NULL DEFAULT 0
      )`;
    await this.database.run(query);

    await this.createDefault();
  }

  async createDefault() {
    const query = 'SELECT * FROM categories WHERE isDefault = 1';
    const result = await this.database.getAll<ICategory>(query);

    if (result.length === 1) {
      return;
    }

    await this.create('Default', '#00f', true);
  }

  async create(
    name: string,
    color: string,
    isDefault?: boolean,
  ): Promise<number | undefined> {
    const query = `INSERT INTO categories (name, color, isDefault) VALUES (?, ?, ?)`;
    const result = await this.database.run(query, [
      name,
      color,
      isDefault ? 1 : 0,
    ]);

    return result.lastInsertRowId;
  }

  async update(data: ICategory): Promise<void> {
    const query = `UPDATE categories SET name = ?, color = ? where id = ?`;
    await this.database.run(query, [data.name, data.color, data.id]);
  }

  async fetchAll(): Promise<ICategory[]> {
    const query = 'SELECT * FROM categories';
    return await this.database.getAll<ICategory>(query);
  }

  async delete(id: number): Promise<void> {
    const query = 'SELECT isDefault FROM categories WHERE id = ?';
    const result = await this.database.getAll<ICategory>(query, [id]);

    if (result.length === 0) {
      throw new Error('Category not found');
    }

    if (result[0].isDefault) {
      throw new Error('Cannot delete default category');
    }

    const deleteQuery = 'DELETE FROM categories WHERE id = ?';
    await this.database.run(deleteQuery, [id]);
  }
}

let sqliteCategoryRepositoryInstance: SqliteCategoryRepository;
export const useSqliteCategoryRepository = () => {
  if (sqliteCategoryRepositoryInstance === undefined) {
    const sqlite = new SQLite();
    sqliteCategoryRepositoryInstance = new SqliteCategoryRepository(sqlite);
  }
  return sqliteCategoryRepositoryInstance;
};
