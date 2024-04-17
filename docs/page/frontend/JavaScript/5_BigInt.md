# BigInt

JS 中超过“Number.MAX_SAFE_INTEGER”的数字计算将是不安全的。

```js
Math.pow(2, 53) === Math.pow(2, 53) + 1; // true
// Math.pow(2, 53) => 9007199254740992
// Math.pow(2, 53) + 1 => 9007199254740992
```

```js
使用"BigInt"完全可以避免这个问题
BigInt(Math.pow(2, 53)) === BigInt(Math.pow(2, 53)) + BigInt(1) // false
```
