// external dependencies
import {Component} from 'react';

/**
 * get the object class of the object passed
 *
 * @param {*} object
 * @returns {string}
 */
const {toString} = Object.prototype;

/**
 * determine whether object passed is a function
 *
 * @param {*} object
 * @returns {boolean}
 */
const isFunction = (object) => typeof object === 'function';

/**
 * determine whether object passed is a number
 *
 * @param {*} object
 * @returns {boolean}
 */
const isNumber = (object) => typeof object === 'number' && object === object;

/**
 * determine whether object passed is null
 *
 * @param {*} object
 * @returns {boolean}
 */
const isNull = (object) => object === null;

/**
 * determine whether object passed is an object
 *
 * @param {*} object
 * @returns {boolean}
 */
const isObject = (object) => !!object && toString.call(object) === '[object Object]';

/**
 * determine whether object passed is a ReactComponent
 *
 * @param {*} object
 * @returns {boolean}
 */
const isReactComponent = (object) => Component.isPrototypeOf(object);

export {isFunction};
export {isNull};
export {isNumber};
export {isObject};
export {isReactComponent};
