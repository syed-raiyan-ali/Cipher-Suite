const STORAGE_KEY = "userhistory";

export function getUserHistory() {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
}

export function addToUserHistory(entry) {
  let history = getUserHistory();
  if (history.length >= 5) {
    history.shift(); // Remove oldest
  }
  history.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearUserHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
