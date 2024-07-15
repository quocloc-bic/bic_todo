import { ICategoryRepository } from '../repositories/category-repository';
import { ITaskRepository } from '../repositories/task-repository';

export const initialize = async (
  categoryRepository: ICategoryRepository,
  taskRepository: ITaskRepository,
) => {
  categoryRepository.configure();
  taskRepository.configure();
};
