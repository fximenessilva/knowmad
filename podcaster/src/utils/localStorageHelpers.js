const getter = (namespace) => {
  const item = localStorage.getItem(namespace);
  if (item === null) {
    return null;
  }
  return JSON.parse(item);
};

const setter = (namespace, value) => {
  return localStorage.setItem(namespace, JSON.stringify(value));
};

const remover = (namespace) => {
  return localStorage.removeItem(namespace);
};

export { getter, setter, remover };
