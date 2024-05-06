interface ICategory {
  id: number;
  name: string;
  color: string;
  isDefault?: boolean;
}

interface ITask {
  id: number;
  name: string;
  isCompleted: boolean;
  categoryId: string;
  createdAt: number;
}
