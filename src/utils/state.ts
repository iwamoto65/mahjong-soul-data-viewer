export const setField = <T>(stateSetter: React.Dispatch<React.SetStateAction<T>>, field: keyof T, value: T[keyof T]) => {
  stateSetter(prevState => ({
    ...prevState,
    [field]: value
  }));
};
