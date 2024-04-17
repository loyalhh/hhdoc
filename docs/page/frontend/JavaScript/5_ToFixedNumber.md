# 截断数字

```js
const toFixed = (n, fixed) =>
  `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0];
toFixed(10.255, 2); // 10.25
```
