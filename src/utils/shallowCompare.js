import shallowCompare from 'react-addons-shallow-compare';

export default function (nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}
