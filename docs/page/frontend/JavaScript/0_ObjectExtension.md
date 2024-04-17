# 对象的拓展

## Object.is()

Object.is 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```javascript
Object.is("foo", "foo");
// true
Object.is({}, {});
// false
```

不同之处只有两个：一是+0 不等于-0，二是 NaN 等于自身。

```javascript
Object.is(+0, -0); // false      +0 === -0 //true
Object.is(NaN, NaN); // true     NaN === NaN // false
```

## 解构

```javascript
const { firstName: trueName, lastName } = fullName; //别名解构
const { firstName: trueName, lastName, age = 18 } = fullName; //默
认值解构;
const { age, ...username } = fullName; //从一个对象中解构一个属性rest运算符 ('...') 将变量的其余部属性
```
