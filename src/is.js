// external dependencies
import {
  Component
} from 'react';

/**
 * get the object class of the object passed
 *
 * @param {*} object
 * @returns {string}
 */
const toString = (object) => {
  return Object.prototype.toString.call(object);
};

/**
 * determine whether object passed is a function
 *
 * @param {*} object
 * @returns {boolean}
 */
const isFunction = (object) => {
  return toString(object) === '[object Function]' || typeof object === 'function';
};

/**
 * determine whether object passed is a number
 *
 * @param {*} object
 * @returns {boolean}
 */
const isNumber = (object) => {
  return toString(object) === '[object Number]' && object === object;
};

/**
 * determine whether object passed is an object
 *
 * @param {*} object
 * @returns {boolean}
 */
const isObject = (object) => {
  return !!object && toString(object) === '[object Object]';
};

/**
 * determine whether object passed is a ReactComponent
 *
 * @param {*} object
 * @returns {boolean}
 */
const isReactComponent = (object) => {
  return Component.isPrototypeOf(object);
};

export {isFunction};
export {isNumber};
export {isObject};
export {isReactComponent};
