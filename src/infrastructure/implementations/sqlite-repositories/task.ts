import { ITask } from '@bic_todo/domain/entities/task';
import { ITaskRepository } from '@bic_todo/domain/repositories/task-repository';
import SQLite from '@bic_todo/infrastructure/database/sqlite';

export class SqliteTaskRepository implements ITaskRepository {
  constructor(private readonly database: SQLite) {}

  async configure() {
    await this.createTableIfNotExist();
  }

  async createTableIfNotExist() {
    const query = `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            isCompleted INTEGER NOT NULL CHECK (isCompleted IN (0, 1)),
            categoryId INTEGER NOT NULL,
            dueDate INTEGER NOT NULL, 
            FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE CASCADE)`;
    await this.database.run(query);
  }

  async create(
    name: string,
    categoryId: number,
    dueDate: number,
  ): Promise<number | undefined> {
    const query = `INSERT INTO tasks (name, isCompleted, categoryId, dueDate) VALUES (?, ?, ?, ?)`;
    const result = await this.database.run(query, [
      name,
      0,
      categoryId,
      dueDate,
    ]);

    return result.lastInsertRowId;
  }

  async update(data: ITask): Promise<void> {
    const query = `UPDATE tasks SET name = ?, isCompleted = ?, categoryId = ?, dueDate = ? WHERE id = ?`;
    await this.database.run(query, [
      data.name,
      data.isCompleted ? 1 : 0,
      data.categoryId,
      data.dueDate,
      data.id,
    ]);
  }

  async toggleCompletion(id: number, isCompleted: boolean): Promise<void> {
    const query = `UPDATE tasks SET isCompleted = ? WHERE id = ?`;
    await this.database.run(query, [isCompleted ? 1 : 0, id]);
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM tasks where id = ?`;
    await this.database.run(query, [id]);
  }

  async fetchAllTasks(pageNumber: number, limit: number): Promise<ITask[]> {
    const offset = (pageNumber - 1) * limit;
    const query = `SELECT * FROM tasks LIMIT ? OFFSET ?`;
    return await this.database.getAll<ITask>(query, [limit, offset]);
  }

  async fetchAllCompletedTasks(
    pageNumber: number,
    limit: number,
  ): Promise<ITask[]> {
    const offset = (pageNumber - 1) * limit;
    const query = `SELECT * FROM tasks WHERE isCompleted = 1 LIMIT ? OFFSET ?`;
    return await this.database.getAll<ITask>(query, [limit, offset]);
  }

  async fetchAllTodayTasks(
    pageNumber: number,
    limit: number,
  ): Promise<ITask[]> {
    const offset = (pageNumber - 1) * limit;
    const query = `SELECT * FROM tasks WHERE date(dueDate / 1000, 'unixepoch') = date('now', 'start of day') LIMIT ? OFFSET ?`;
    return await this.database.getAll<ITask>(query, [limit, offset]);
  }

  async fetchAllTasksByCategoryId(
    categoryId: number,
    pageNumber: number,
    limit: number,
  ): Promise<ITask[]> {
    const offset = (pageNumber - 1) * limit;
    const query = `SELECT * FROM tasks categoryId = ? LIMIT ? OFFSET ?`;
    return await this.database.getAll<ITask>(query, [
      categoryId,
      limit,
      offset,
    ]);
  }
}

let sqliteTaskRepositoryInstance: SqliteTaskRepository;
export const useSqliteTaskRepository = () => {
  if (sqliteTaskRepositoryInstance === undefined) {
    const sqlite = new SQLite();
    sqliteTaskRepositoryInstance = new SqliteTaskRepository(sqlite);
  }
  return sqliteTaskRepositoryInstance;
};
