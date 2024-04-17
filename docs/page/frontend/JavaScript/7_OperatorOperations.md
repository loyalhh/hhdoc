# 运算符操作

## 逻辑赋值运算符 && || ??

逻辑赋值运算符是由逻辑运算符&&、||、??和赋值运算符=组合而成。

```jsx
const a = 1;
const b = 2;
a &&= b;
console.log(a); // 2
// 上面等价于
a && (a = b);
// 或者
if (a) {
  a = b;
}
const a = null;
const b = 3;
a ||= b;
console.log(a); // 3
// 上面等价于
a || (a = b);
const a = null;
const b = 3;
a ??= b;
console.log(a); // 3
// 上面等价于
if (a === null || a === undefined) {
  a = b;
}
```

## 使用 !! 操作符

!! 运算符可用于将表达式的结果快速转换为布尔值(true 或 false):

```js
const greeting = "Hello there!";
console.log(!!greeting); // true

const noGreeting = "";
console.log(!!noGreeting); // false
```

## 空值合并 ?? 操作符

当我们想检查一个变量是否为 null 或 undefined 时，??操作符很有用。当它的左侧操作数为 null 或 undefined 时，它返回右侧的操作数，否则返回其左侧的操作数。

```js
const foo = null ?? "Hello";
console.log(foo); // 'Hello'

const bar = "Not null" ?? "Hello";
console.log(bar); // 'Not null'

const baz = 0 ?? "Hello";
console.log(baz); // 0
```

## 使用\*\*代替 Math.pow()

```js
//Longhand
const power = Math.pow(4, 3); // 64
// Shorthand
const power = 4 ** 3; // 64
```
