# 找出两日期之间的天数|日差

```js
const dayDif = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
dayDif(new Date("2020-10-21"), new Date("2021-10-22"));
// Result: 366
```
