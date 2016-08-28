import test from 'ava';

import {
  isFunction,
  isNumber,
  isObject
} from '../src/is';

test('if isFunction correctly validates functions', (t) => {
  const normalFunction = function() {};
  const arrowFunction = () => {};

  t.true(isFunction(normalFunction));
  t.true(isFunction(arrowFunction));

  const array = [];
  const boolean = true;
  const number = 12;
  const object = {};
  const string = 'foo';

  t.false(isFunction(array));
  t.false(isFunction(boolean));
  t.false(isFunction(number));
  t.false(isFunction(object));
  t.false(isFunction(string));
});

test('if isNumber correctly validates numbers', (t) => {
  const number = 12;

  t.true(isNumber(number));

  const array = [];
  const arrowFunction = () => {};
  const boolean = true;
  const normalFunction = function() {};
  const object = {};
  const string = 'foo';

  t.false(isNumber(array));
  t.false(isNumber(arrowFunction));
  t.false(isNumber(boolean));
  t.false(isNumber(normalFunction));
  t.false(isNumber(object));
  t.false(isNumber(string));
});

test('if isObject correctly validates objects', (t) => {
  const object = {};

  t.true(isObject(object));

  const array = [];
  const arrowFunction = () => {};
  const boolean = true;
  const normalFunction = function() {};
  const number = 12;
  const string = 'foo';

  t.false(isObject(array));
  t.false(isObject(arrowFunction));
  t.false(isObject(boolean));
  t.false(isObject(normalFunction));
  t.false(isObject(number));
  t.false(isObject(string));
});