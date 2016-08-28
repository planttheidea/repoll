// external dependencies
import React from 'react';

// object class checkers
import {
  isFunction,
  isNumber,
  isObject,
  isReactComponent
} from './is';

/* eslint-disable no-console */

/**
 * send console error message identifying it as a TypeError
 *
 * @param {string} message
 */
const typeErrorWithConsole = (message) => {
  console.error(`TypeError: ${message}`);
};

/**
 * throw new TypeError with message
 *
 * @param {string} message
 */
const typeErrorFallback = (message) => {
  throw new TypeError(message);
};

const throwTypeError = (window.console && window.console.error) ? typeErrorWithConsole : typeErrorFallback;

/* eslint-enable */

/**
 * set the object of data for the interval
 *
 * @param {object} intervalMap
 * @param {string} key
 * @param {number} timeInMs
 * @param {function} fn
 * @returns {object}
 */
const setRepollIntervalData = (intervalMap, key, timeInMs, fn) => {
  let intervalMetadata = {
    interval: null,
    name: key
  };

  intervalMetadata.stop = () => {
    clearInterval(intervalMap[key].interval);
    intervalMap[key].interval = null;
  };

  intervalMetadata.start = () => {
    intervalMetadata.interval = setInterval(() => {
      fn(intervalMetadata, intervalMap);
    }, timeInMs);
  };

  return intervalMetadata;
};

/**
 * noop to return passed item
 *
 * @param {Component} ReactClass
 * @returns {Component}
 */
const returnSameClass = (ReactClass) => {
  return ReactClass;
};

const DEFAULT_OPTIONS = {
  autoStart: true,
  stopOnUnmount: true
};

/**
 * decorator to poll all functions based on map of polls passed
 *
 * @param {object} functionMap
 * @param {object} options={}
 * @returns {function(React.Component): React.Component}
 */
const repoll = (functionMap, options = {}) => {
  let hasError = false;

  if (isReactComponent(functionMap)) {
    throwTypeError('Cannot decorate the provided React class directly, you must use repoll as a method passing an' +
      'object of key: value pairs being functionName: polling interval.');

    hasError = true;
  } else if (!isObject(functionMap)) {
    throwTypeError('You must pass in an object with key: value pairs being functionName: polling interval.');

    hasError = true;
  } else if (!isObject(options)) {
    throwTypeError('Options passed must be an object.');

    hasError = true;
  }

  if (hasError) {
    return returnSameClass;
  }
  
  const coalescedOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  return (ReactClass) => {
    if (!isReactComponent(ReactClass)) {
      typeErrorWithConsole('Decorated function must be a ReactClass: functional components are not supported at this time.');

      return ReactClass;
    }

    class RepollComponent extends ReactClass {
      constructor(...args) {
        super(...args);

        if (isFunction(super.constructor)) {
          super.constructor(...args);
        }

        this.repollIntervals = {};

        for (let key in functionMap) {
          const intervalTimeInMs = functionMap[key];

          if (!isNumber(intervalTimeInMs)) {
            throwTypeError('Intervals must be specified as a number signifying the number of milliseconds to wait.');
          }

          if (isFunction(this[key])) {
            this.repollIntervals[key] = setRepollIntervalData(this.repollIntervals, key, 
              intervalTimeInMs, this[key]);
            
            if (coalescedOptions.autoStart) {
              this.repollIntervals[key].start();
            }
          } else {
            throwTypeError(`${key} is not a function on the React Class being decorated.`);
          }
        }
      }

      componentWillUnmount() {
        if (coalescedOptions.stopOnUnmount && isFunction(super.componentWillUnmount)) {
          super.componentWillUnmount();
        }

        for (let key in this.repollIntervals) {
          this.repollIntervals[key].stop();
        }

        this.repollIntervals = {};
      }

      repollIntervals = {};

      render() {
        return super.render();
      }
    }

    return RepollComponent;
  };
};

export default repoll;
