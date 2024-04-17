# 秒数转换

```js
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8);
formatSeconds(200); // 00:03:20
```
