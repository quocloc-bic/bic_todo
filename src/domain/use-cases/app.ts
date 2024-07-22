import { ICategoryRepository } from '@bic_todo/domain/repositories/category-repository';
import { ITaskRepository } from '@bic_todo/domain/repositories/task-repository';

export const initialize = async (
  categoryRepository: ICategoryRepository,
  taskRepository: ITaskRepository,
) => {
  categoryRepository.configure();
  taskRepository.configure();
};
