# repoll

Automate polling in your React components

#### Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Injected values](#injected-values)
* [Parameters](#parameters)
* [Development](#development)

#### Installation

```
$ npm i repoll --save
```

#### Usage

```javascript
import React, {
  Component
} from 'react';

import repoll from 'repoll';

@repoll({foo: 5000})
class PollingFoo extends Component {
  state = {
    counter: 0
  };
  
  foo = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    <div>
      I will increment the counter every 5 seconds. The current value is {this.counter}.
    </div>
  }
}
```

In the above example, the `foo` function will be called every 5 seconds starting when the component's `constructor` function is fired. This is the most basic usage, but there are multiple ways you can tweak how the intervals are managed.

#### Injected values

When the class is decorated, an instance value of `repollIntervals` is injected into the class, which houses all of the intervals applied via `repoll`. `repollIntervals` is an object whose properties are each objects themselves reflecting a specific interval:

```
{
  interval: Number,
  name: String,
  start: Function,
  stop: Function
}
```

The interval and the name are just metadata; `name` is the name of the function, whereas `interval` is the ID of the interval created internally by `setInterval`. The `start` and `stop` functions will respectively start and stop the polling of the function.

```javascript
const pollingFunctions = {
  foo: 500
};

@repoll(pollingFunctions)
class MyComponent extends Component {
  foo = () => {
    console.log('fired');
  };
  
  render() {
    console.log(this.repollIntervals);
    // {foo: {interval: 0, name: 'foo', start: [Function], stop: [Function]}}
    
    return (
      <div>
        Stuffz
      </div>
    );
  }
}
```

Additionally, the functions that are wired for polling will have the interval injected into it:

```javascript
const pollingFunctions = {
  foo: 500
};

@repoll(pollingFunctions)
class MyComponent extends Component {
  counter = 0;

  foo = (fooInterval) => {
    if (this.counter === 3) {
      console.log('Fired thrice prior, preventing any more calls.');
      
      fooInterval.stop();
    }
    
    this.counter++;
  };
  
  render() {
    return (
      <div>
        Stuffz
      </div>
    );
  }
}
```

You do should not need to make use of it unless you are applying advanced usages.

#### Parameters

**repoll(pollingFunctions: object, options: object = {})**

The decorator is a composed function that accepts up to two parameters and returns a function that extends the `ReactComponent` that is passed to it.

**pollingFunctions**

This is a simple map of `functionName: intervalInMilliseconds`, where each `functionName` reflects a function instantiated in the `ReactComponent`. Example:

```javascript
const pollingFunctions = {
  foo: 5000,
  bar: 2000
};

@repoll(pollingFunctions)
class MyComponent extends Component {
  foo() {
    console.log('I will fire every 5 seconds.');
  }
  
  bar() {
    console.log('I will fire every 2 seconds.');
  }
  
  render() {
    return (
      <div>
        I poll ths stuffz.
      </div>
    );
  }
}
```

As you can see, both `foo` and `bar` line up with the named methods in the class. This means that those methods will fire at the `intervalInMilliseconds` assigned to them in the map. If a name is called out in the map but does not exist in the class, an error is fired.

**options**

An object that is passed to override certain default options. The options available are:

* autoStart *boolean, defaults to true*
* stopOnUnmount *boolean, defaults to true*

For example, if you want to only trigger the polling after some event:

```javascript
const pollingFunctions = {
  foo: 500
};
const options = {
  autoStart: false
};

@repoll(pollingFunctions, options)
class MyComponent extends Component {
  foo = () => {
    console.log('I am fired on polling.');
  };
  
  onClickButton = () => {
    this.repollingIntervals.foo.start();
  };
  
  render() {
    return (
      <button
        onClick={this.onClickButton}
        type="button"
      >
        Click me to start polling
      </button>
    );
  }
}
```

Or if you wanted the polling to continue even after the component unmounts:

```javascript
const pollingFunctions = {
  foo: 500
};
const options = {
  stopOnUnmount: false
};

@repoll(pollingFunctions, options)
class MyComponent extends Component {
  foo = () => {
    console.log('I am fired on polling and will never stop.');
  };
  
  render() {
    return (
      <div>
        I will poll forever...
      </div>
    );
  }
}
```

#### Advanced usage

There are a number of ways you can work with this polling information, but it all un

### Development

Standard stuff, clone the repo and `npm i` to get the dependencies. npm scripts available:
* `compile-for-publish` => runs the `lint` and `transpile` scripts
* `dev` => runs the webpack dev server for the playground
* `lint` => runs ESLint against files in the `src` folder
* `prepublish` => if in publish, runs `compile-for-publish`
* `test` => runs AVA with `NODE_ENV=test`
* `test:watch` => runs `test` but with persistent watcher
* `transpile` => runs Babel against files in `src` to files in `lib`
