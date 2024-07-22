const categoryColorPalette = [
  '#ef4444',
  '#dc2626',
  '#fdba74',
  '#fb923c',
  '#22c55e',
  '#16a34a',
  '#38bdf8',
  '#0ea5e9',
  '#a855f7',
  '#9333ea',
];

export const getCategoryColorPalette = () => {
  return categoryColorPalette;
};

export const isTimestampToday = (timestamp: number): boolean => {
  const dueDate = new Date(timestamp);
  const today = new Date();

  // Compare year, month, and day
  return (
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate()
  );
};
