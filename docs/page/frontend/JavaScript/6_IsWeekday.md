# 查询某天是否为工作日

```js
const isWeekday = (date) => date.getDay() % 6 !== 0;
isWeekday(new Date("2022-03-11"));
// true
```
