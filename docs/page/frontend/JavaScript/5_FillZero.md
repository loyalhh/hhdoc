# 数字补零 0

```js
const fillZero = (num, len) => num.toString().padStart(len, "0");
console.log(fillZero(5, 4)); // 输出: "0005"
console.log(fillZero(123, 6)); // 输出: "00123"
console.log(fillZero(1000, 8)); // 输出: "0001000"
```
