import Immutable, {fromJS} from 'immutable';

export function setItem (name, value) {
  const isImmutable = Immutable.Iterable.isIterable(value);
  const data = isImmutable ? value.toJSON() : value;
  //console.log('[Set Viewer]', data);
  return localStorage.setItem(name, JSON.stringify(data));
}

export function getJSItem (name, where) {
  const item = localStorage.getItem(name);
  const data = item ? JSON.parse(item) : null;
  //console.log(`[Get Viewer] ${where || ''}`, data);
  return data;
}

export function getImmutableItem (name) {
  const data = localStorage.getItem(name);
  return data ? fromJS(JSON.parse(data)) : null;
}

export default {
  setItem,
  getJSItem,
  getImmutableItem
};
