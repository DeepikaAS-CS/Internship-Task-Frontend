export const loadData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const subscribeToStorage = (callback) => {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
