# 获取 hh:mm:ss 时间

```js
const timeFormat = (date) => date.toTimeString().slice(0, 8);
timeFormat(new Date());
```
