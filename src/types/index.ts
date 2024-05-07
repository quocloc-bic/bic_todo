interface ICategory {
  id: number;
  name: string;
  color: string;
  isDefault: boolean;
}

type UpdatingCategory = Omit<ICategory, 'id' | 'isDefault'>;

interface ITask {
  id: number;
  name: string;
  isCompleted: boolean;
  categoryId: number;
  dueDate: number;
}

type UpdatingTask = Omit<ITask, 'id' | 'isCompleted'>;
