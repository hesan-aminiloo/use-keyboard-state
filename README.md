# Use keyboard state
This is a custom hook that helps you detect if the virtual keyboard is open on mobile devices. It also gives you the keyboard height to change your styles accordingly.

<br />

## Installation
```js
npm install use-keyboard-state

// or

yarn add use-keyboard-state
```

<br />

## Usage
Import the package:
```js
import useKeyboardState from 'use-keyboard-state';
```
And inside your component you can use it simply by

```js
const [isKeyboardOpen, keyboardHeight] = useKeyboardState();
```

- `isKeyboardOpen` is a `Boolean` that toggles whenever user focuses on an input element
- `keyboardHeight` is a `number` value that returns the height of the keyboard.