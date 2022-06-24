import Cookie from 'js-cookie';

const storage: any = {};

try {
  if (!window.localStorage) {
    throw Error('no local storage');
  }

  storage.set = (key: any, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));
  storage.get = (key: any) => {
    const item = localStorage.getItem(key);
    try {
      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      return null;
    }
  };
  storage.remove = (key: any) => localStorage.removeItem(key);
} catch (e) {
  storage.set = Cookie.set;
  storage.remove = Cookie.remove;
}

export default storage;
