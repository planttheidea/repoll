import test from 'ava';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import React, {
  Component
} from 'react';
import sinon from 'sinon';
import {
  mount
} from 'enzyme';

import repoll from '../src';

import {
  isFunction,
  isNumber,
  isObject
} from '../src/is';

const sleep = (ms = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

test('if repoll not as method throws error', (t) => {
  const consoleStub = sinon.stub(console, 'error');

  @repoll
  class Foo extends Component {
    render() {
      return (
        <div>
          Should not throw
        </div>
      )
    }
  }

  t.true(consoleStub.calledOnce);

  consoleStub.restore();
});

test('if repoll with no arguments throws error', (t) => {
  const consoleStub = sinon.stub(console, 'error');
  const noArgumentsMessage = 'TypeError: You must pass in an object with key: value pairs being functionName: polling interval.';

  @repoll()
  class Foo extends Component {
    render() {
      return (
        <div>
          Should not throw
        </div>
      )
    }
  }

  t.true(consoleStub.calledOnce);
  t.true(consoleStub.calledWith(noArgumentsMessage));

  consoleStub.restore();
});

test('if repoll with invalid arguments throws error', (t) => {
  const consoleStub = sinon.stub(console, 'error');
  const invalidArsMessage = 'TypeError: You must pass in an object with key: value pairs being functionName: polling interval.';

  @repoll('foo')
  class Foo extends Component {
    render() {
      return (
        <div>
          Should not throw
        </div>
      )
    }
  }

  t.true(consoleStub.calledOnce);
  t.true(consoleStub.calledWith(invalidArsMessage));

  consoleStub.restore();
});

test('if repoll with one argument creates intervals but does not start them', (t) => {
  const fn = 'render';
  const fnInterval = 500;
  const repollIntervals = {
    [fn]: fnInterval
  };

  @repoll(repollIntervals)
  class Foo extends Component {
    render() {
      return (
        <div>
          Should not throw
        </div>
      )
    }
  }

  const wrapper = mount(<Foo/>);
  const wrapperIntervals = wrapper.node.repollIntervals;

  t.true(isObject(wrapperIntervals));
  t.true(isObject(wrapperIntervals.render));

  t.true(isNull(wrapperIntervals.render.interval));

  t.true(isString(wrapperIntervals.render.name));
  t.is(wrapperIntervals.render.name, 'render');

  t.true(isFunction(wrapperIntervals.render.start));
  t.true(isFunction(wrapperIntervals.render.stop));

  wrapper.unmount();
});

test('if repoll with two arguments creates intervals and starts them', async (t) => {
  const fn = 'stub';
  const fnInterval = 500;
  const repollIntervals = {
    [fn]: fnInterval
  };
  const options = {
    autoStart: true
  };

  @repoll(repollIntervals, options)
  class Foo extends Component {
    stub = sinon.stub();

    render() {
      return (
        <div>
          Should not throw
        </div>
      )
    }
  }

  const wrapper = await mount(<Foo/>);
  const wrapperIntervals = wrapper.node.repollIntervals;

  t.true(isObject(wrapperIntervals));
  t.true(isObject(wrapperIntervals.stub));

  t.false(isNull(wrapperIntervals.stub.interval));

  t.true(isString(wrapperIntervals.stub.name));
  t.is(wrapperIntervals.stub.name, 'stub');

  t.true(isFunction(wrapperIntervals.stub.start));
  t.true(isFunction(wrapperIntervals.stub.stop));

  await sleep(2050); // small amount larger than interval * 4 due to slight delay in initial start

  t.is(wrapper.node.stub.callCount, 4);

  wrapper.unmount();
});

test('that repoll does not continue firing after unmount', async (t) => {
  const fn = 'stub';
  const fnInterval = 500;
  const repollIntervals = {
    [fn]: fnInterval
  };
  const options = {
    autoStart: true
  };

  let firedOnUnmount = false;

  @repoll(repollIntervals, options)
  class Foo extends Component {
    componentWillUnmount() {
      firedOnUnmount = true;
    }

    stub = sinon.stub();

    render() {
      return (
        <div>
          Should not throw
        </div>
      )
    }
  }

  const wrapper = await mount(<Foo/>);

  wrapper.unmount();

  await sleep(1000); // enough time for the interval to fire once if still active

  t.true(firedOnUnmount);
  t.true(wrapper.node.stub.notCalled);
  t.deepEqual(wrapper.node.repollIntervals, {});
});