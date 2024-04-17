# 数字取整~~代替 Math.floor()

## 正负浮点数取整

```js
~~3.1415926; // 3

function toInt(floatNumber) {
  return floatNumber >> 0;
}
23.9 |
  (0 - // 23
    23.9) |
  0; // -23
```

## 正浮点数取整

```js
function toInt(floatNumber) {
  return floatNumber >>> 0;
}
```
