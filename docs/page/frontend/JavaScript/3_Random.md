# 获取随机数

## 生成 1 到 10 之间的随机整数

```javascript
function getRandomNumber(min, max) {
  // 计算范围内的随机数
  let random = Math.random() * (max - min + 1) + min;
  // 向下取整得到整数
  let randomNumber = Math.floor(random);
  // 返回随机数
  return randomNumber;
}

// 生成 1 到 10 之间的随机整数
let number = getRandomNumber(1, 10);
console.log(number);
```

## 声明和初始化数组

```javascript
const array = Array(5).fill('');
// 输出
(5) ["", "", "", "", ""]

const matrix = Array(5).fill(0).map(()=>Array(5).fill(0));
// 输出
(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 0, 0, 0, 0]
2: (5) [0, 0, 0, 0, 0]
3: (5) [0, 0, 0, 0, 0]
4: (5) [0, 0, 0, 0, 0]
length: 5

```

## 数组中获取随机数

```js
export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
```
