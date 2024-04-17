# 获取/反转对象键值对

## 获取 keyvalue

```js
const person = {
  name: "前端小智",
  age: 20,
};
Object.keys(person); // ['name', 'age']
Object.entries(person); // [['name', '前端小智'], ['age', 20]]
Object.keys(person).forEach((key) => {
  console.log(`${key} is ${person[key]}`);
});
// 使用 entries 获取键和值
Object.entries(person).forEach(([key, value]) => {
  console.log(`${key} is ${value}`);
});
// name is 前端小智
// age is 20
```

## 反转 keyvalue

```js
const invert = (obj) =>
  Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});
```
