export function getCachedItemOrDefault(arrayOfObjects, item) {
  if (localStorage.getItem(item) === null) {
    return arrayOfObjects;
  }
  return JSON.parse(localStorage.getItem(item));
}

export function setCachedItem(arrayOfObjects, item) {
  localStorage.setItem(item, JSON.stringify(arrayOfObjects));
}
