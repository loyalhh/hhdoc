# 秒数转换

```js
const isToday = (date) =>
  date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
```
