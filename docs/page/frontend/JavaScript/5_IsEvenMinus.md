# 判断负数奇数偶数

## 是否为负数

```js
function isMinus(number) {
  return number !== number >>> 0;
}
```

## 是否是奇数

```js
function isOdd(number) {
  return number & (1 === 1);
}
```

## 是否是偶数

```js
const isEven = (num) => num % 2 === 0;
console.log(isEven(2));
```

## 判断整数是否相等

```js
function isEqual(number1, number2) {
  return (number1 ^ number2) === 0;
}
```
