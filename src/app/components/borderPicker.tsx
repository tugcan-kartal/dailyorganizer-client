export const borderPicker = (task: any) => {
    if (task.importance_level === "1") {
      return "border-green-500";
    } else if (task.importance_level === "2") {
      return "border-yellow-500";
    } else if (task.importance_level === "3") {
      return "border-blue-500";
    } else if (task.importance_level === "4") {
      return "border-red-500";
    }
};