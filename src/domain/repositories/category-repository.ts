import { ICategory } from '../entities/category';

export interface ICategoryRepository {
  configure(): Promise<void>;
  create(
    name: string,
    color: string,
    isDefault?: boolean,
  ): Promise<number | undefined>;
  fetchAll(): Promise<ICategory[]>;
  update(category: ICategory): Promise<void>;
  delete(id: number): Promise<void>;
}
