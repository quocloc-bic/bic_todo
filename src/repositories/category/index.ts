import SQLiteHelper from '@bic_todo/utils/database';

export const createCategoriesTableIfNotExist = async () => {
  const query = `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    color TEXT NOT NULL,
    isDefault INTEGER NOT NULL DEFAULT 0
)`;
  await SQLiteHelper.getInstance().execute(query);

  await createDefaultCategory();
};

const createDefaultCategory = async () => {
  const query = 'SELECT * FROM categories WHERE isDefault = 1';
  const result = await SQLiteHelper.getInstance().execute(query);

  if (result.rows.length === 1) {
    return;
  }

  await createCategory('Default', '#00f', true);
};

export const createCategory = async (
  name: string,
  color: string,
  isDefault: boolean = false,
): Promise<number | undefined> => {
  const query = `INSERT INTO categories (name, color, isDefault) VALUES (?, ?, ?)`;
  const result = await SQLiteHelper.getInstance().execute(query, [
    name,
    color,
    isDefault ? 1 : 0,
  ]);

  return result.insertId;
};

export const updateCategory = async (data: ICategory): Promise<void> => {
  const query = `UPDATE categories SET name = ?, color = ? where id = ?`;
  await SQLiteHelper.getInstance().execute(query, [
    data.name,
    data.color,
    data.id,
  ]);
};

export const deleteCategory = async (id: number): Promise<void> => {
  const query = 'SELECT isDefault FROM categories WHERE id = ?';
  const result = await SQLiteHelper.getInstance().execute(query, [id]);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  const isDefault = result.rows.item(0).isDefault === 1;

  if (isDefault) {
    throw new Error('Cannot delete default category');
  }

  const deleteQuery = 'DELETE FROM categories WHERE id = ?';
  await SQLiteHelper.getInstance().execute(deleteQuery, [id]);
};

export const fetchAllCategories = async (): Promise<ICategory[]> => {
  const query = 'SELECT * FROM categories';
  const result = await SQLiteHelper.getInstance().execute(query);

  return Array.from(result.rows._array, (row: any) => ({
    id: row.id,
    name: row.name,
    color: row.color,
    isDefault: row.isDefault,
  }));
};
