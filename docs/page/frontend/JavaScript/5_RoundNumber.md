# 指定位数四舍五入

```js
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d);
round(1.005, 2); //1.01
round(1.555, 2); //1.56
```
