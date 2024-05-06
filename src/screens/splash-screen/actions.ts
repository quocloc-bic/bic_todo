import { createCategoriesTableIfNotExist } from '@bic_todo/repositories/category';
import { createTasksTableIfNotExist } from '@bic_todo/repositories/task';

export const initialize = async () => {
  await createCategoriesTableIfNotExist();
  await createTasksTableIfNotExist();
};
