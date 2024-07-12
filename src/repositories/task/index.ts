import SQLiteHelper from '@bic_todo/utils/database';

export const createTasksTableIfNotExist = async () => {
  const query = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    isCompleted INTEGER NOT NULL CHECK (isCompleted IN (0, 1)),
    categoryId INTEGER NOT NULL,
    dueDate INTEGER NOT NULL, 
    FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE CASCADE)`;
  await SQLiteHelper.getInstance().execute(query);
};

export const createTask = async (
  name: string,
  categoryId: number,
  dueDate: number,
): Promise<number | undefined> => {
  const query = `INSERT INTO tasks (name, isCompleted, categoryId, dueDate) VALUES (?, ?, ?, ?)`;
  const result = await SQLiteHelper.getInstance().run(query, [
    name,
    0,
    categoryId,
    dueDate,
  ]);

  return result.lastInsertRowId;
};

export const findTaskById = async (id: number): Promise<ITask | undefined> => {
  const query = `SELECT * FROM tasks WHERE id = ?`;
  const result = await SQLiteHelper.getInstance().getAll<ITask>(query, [id]);
  return result.at(0);
};

export const updateTask = async (data: ITask): Promise<void> => {
  const query = `UPDATE tasks SET name = ?, isCompleted = ?, categoryId = ?, dueDate = ? WHERE id = ?`;
  await SQLiteHelper.getInstance().run(query, [
    data.name,
    data.isCompleted ? 1 : 0,
    data.categoryId,
    data.dueDate,
    data.id,
  ]);
};

export const deleteTask = async (id: number): Promise<void> => {
  const query = `DELETE FROM tasks where id = ?`;
  await SQLiteHelper.getInstance().run(query, [id]);
};

const PAGE_SIZE = 20;

export const fetchAllTasks = async (pageNumber: number): Promise<ITask[]> => {
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const query = `SELECT * FROM tasks LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
  return await SQLiteHelper.getInstance().getAll<ITask>(query);
};

export const fetchAllCompletedTasks = async (
  pageNumber: number,
): Promise<ITask[]> => {
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const query = `SELECT * FROM tasks WHERE isCompleted = 1 LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
  return await SQLiteHelper.getInstance().getAll<ITask>(query);
};

export const fetchAllTodayTasks = async (
  pageNumber: number,
): Promise<ITask[]> => {
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const query = `SELECT * FROM tasks WHERE date(dueDate / 1000, 'unixepoch') = date('now', 'start of day') LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
  return await SQLiteHelper.getInstance().getAll<ITask>(query);
};

export const fetchAllTasksByCategoryId = async (
  categoryId: number,
  pageNumber: number,
): Promise<ITask[]> => {
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const query = `SELECT * FROM tasks WHERE categoryId = ? LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
  return await SQLiteHelper.getInstance().getAll<ITask>(query, [categoryId]);
};
