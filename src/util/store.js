export const setEntity = (store, item) => ({ ...store, [item._id]: item })

export const emptyStringToNull = (item) =>
  Object.fromEntries(Object.entries(item).map(([key, value]) => [key, value === '' ? null : value]))
