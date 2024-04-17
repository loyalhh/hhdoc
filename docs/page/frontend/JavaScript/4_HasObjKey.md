# 检查对象是否存在某个属性

## Object.prototype 原型上判断

如果指定的属性位于对象或其原型链中，“in”运算符将返回 true。

```jsx
const Person = function (age) {
  this.age = age;
};
Person.prototype.name = "fatfish";
const p1 = new Person(24);
console.log("name" in p1); // true  注意这里
const person = { name: "前端小智", salary: 1000 };
console.log("salary" in person); // true
console.log("age" in person); // false
```

::: tip
hasOwnProperty 方法会返回一个布尔值，表示对象自身属性中是否具有对应的值（原型链上的属性不会读取）obj.hasOwnProperty 已经可以过滤掉原型链上的属性，但在某些情况下，它还是不安全
:::

```jsx
const Person = function (age) {
  this.age = age;
};
Person.prototype.name = "fatfish";

const p1 = new Person(24);
console.log(p1.hasOwnProperty("age")); // true
console.log(p1.hasOwnProperty("name")); // fasle  注意这里
```

可以使用**Object.hasOwn**来避免这两个问题，这比“obj.hasOwnProperty”方法更加方便、安全

```jsx
let object = { age: 24 };
Object.hasOwn(object, "age"); // true
let object2 = Object.create({ age: 24 });
Object.hasOwn(object2, "age"); // false
let object3 = Object.create(null);
Object.hasOwn(object3, "age"); // false
```
