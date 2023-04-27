export const setLocalStorageValue = <T>(key: string, value: string | T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorageValue = <T>(key: string): T | undefined => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }
};
