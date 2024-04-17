# 获取某年月份天数

可以使用`Date`对象的`getDate()`方法来获取指定月份的天数。

```js
const getDaysNum = (year, month) => new Date(year, month, 0).getDate();
const day = getDaysNum(2024, 2); // 29
```
