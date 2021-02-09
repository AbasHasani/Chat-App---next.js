import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState<any>(() => initialValue);
  useEffect(() => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) {
      setValue(savedValue);
    } else {
      return null;
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};
export default useLocalStorage;
