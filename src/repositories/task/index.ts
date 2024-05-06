import SQLiteHelper from '@bic_todo/utils/database';

export const createTasksTableIfNotExist = async () => {
  const query = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    isCompleted INTEGER NOT NULL CHECK (isCompleted IN (0, 1)),
    categoryId TEXT NOT NULL,
    createdAt INTEGER NOT NULL, 
    FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE CASCADE)`;
  await SQLiteHelper.getInstance().execute(query);
};

export const createTask = async (data: ITask): Promise<number | undefined> => {
  const query = `INSERT INTO tasks (name, isCompleted, categoryId, createdAt) VALUES (?, ?, ?, ?)`;
  const result = await SQLiteHelper.getInstance().execute(query, [
    data.name,
    data.isCompleted ? 1 : 0,
    data.categoryId,
    data.createdAt,
  ]);

  return result.insertId;
};

export const updateTask = async (data: ITask): Promise<void> => {
  const query = `UPDATE tasks SET name = ?, isCompleted = ?, categoryId = ?, createdAt = ? WHERE id = ?`;
  await SQLiteHelper.getInstance().execute(query, [
    data.name,
    data.isCompleted ? 1 : 0,
    data.categoryId,
    data.createdAt,
    data.id,
  ]);
};

export const deleteTask = async (id: number): Promise<void> => {
  const query = `DELETE FROM tasks where id = ?`;
  await SQLiteHelper.getInstance().execute(query, [id]);
};

export const fetchAllTasks = async (): Promise<ITask[]> => {
  const query = 'SELECT * FROM tasks';
  const result = await SQLiteHelper.getInstance().execute(query);

  return Array.from(result.rows._array, (row: any) => ({
    id: row.id,
    name: row.name,
    isCompleted: row.isCompleted === 1,
    categoryId: row.categoryId,
    createdAt: row.createdAt,
  }));
};

export const fetchAllCompletedTasks = async (): Promise<ITask[]> => {
  const query = 'SELECT * FROM tasks WHERE isCompleted = 1';
  const result = await SQLiteHelper.getInstance().execute(query);

  return Array.from(result.rows._array, (row: any) => ({
    id: row.id,
    name: row.name,
    isCompleted: row.isCompleted === 1,
    categoryId: row.categoryId,
    createdAt: row.createdAt,
  }));
};

export const fetchAllTodayTasks = async (): Promise<ITask[]> => {
  const today = new Date().toISOString().split('T')[0];
  const query = `SELECT * FROM tasks WHERE date(createdAt) = ?`;
  const result = await SQLiteHelper.getInstance().execute(query, [today]);

  return Array.from(result.rows._array, (row: any) => ({
    id: row.id,
    name: row.name,
    isCompleted: row.isCompleted === 1,
    categoryId: row.categoryId,
    createdAt: row.createdAt,
  }));
};

export const fetchAllTasksByCategoryId = async (
  categoryId: string,
): Promise<ITask[]> => {
  const query = 'SELECT * FROM tasks WHERE categoryId = ?';
  const result = await SQLiteHelper.getInstance().execute(query, [categoryId]);

  return Array.from(result.rows._array, (row: any) => ({
    id: row.id,
    name: row.name,
    isCompleted: row.isCompleted === 1,
    categoryId: row.categoryId,
    createdAt: row.createdAt,
  }));
};
