# 对象深拷贝

## 深度封装克隆

```jsx
export const deepClone = (obj, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //正则对象直接返回一个新的正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};
```

## 简易封装克隆

```jsx
//函数拷贝
const copyObj = (obj = {}) => {
  //变量先置空
  let newobj = null;
  //判断是否需要继续进行递归
  if (typeof obj == "object" && obj !== null) {
    newobj = obj instanceof Array ? [] : {};
    //进行下一层递归克隆
    for (var i in obj) {
      newobj[i] = copyObj(obj[i]);
    }
    //如果不是对象直接赋值
  } else newobj = obj;
  return newobj;
};
```

使用 lodash.cloneDeep()拷贝

## 最新 js 深拷贝

```jsx
// 将原始对象传递给该函数， 它将返回一个具有不同引用和对象属性引用的深层副本

const obj = { name: "Mike", friends: [{ name: "Sam" }] };
const clonedObj = structuredClone(obj);

console.log(obj.name === clonedObj); // false
console.log(obj.friends === clonedObj.friends); // false
```
