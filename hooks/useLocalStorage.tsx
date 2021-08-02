import { useState, useCallback } from 'react';


export interface LocalStorageProps<T> {
  storedValue: T | null,
  setStorageValue: (value: T | null) => void | T | null,
  getStoredValue: T | null,
}

// Hook
function useLocalStorage<GetType>(key: string, initialValue: GetType | null = null): LocalStorageProps<GetType> {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  const setStorageValue = useCallback(
    (value: GetType | null) => {
      try {
        // Allow value to be a function so we have same API as useState
        // Save state
        setStoredValue((data: GetType | null) => {
          const valueToStore = value instanceof Function ? value(data) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
        // Save to local storage
      } catch (error) {
        // A more advanced implementation would handle the error case
        // window.console.log('error form local storage', error);
      }
    },
    [setStoredValue, key],
  );

  return {
    storedValue,
    setStorageValue,
    get getStoredValue(): any {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : storedValue;
      } catch (error) {
        // If error also return initialValue
        // window.console.log('error form local storage', error);
        return storedValue;
      }
    },
  };
}

export default useLocalStorage;
