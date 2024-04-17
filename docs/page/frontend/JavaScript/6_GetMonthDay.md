# 获取某年某月的第一天|最后一天

## 第一天

```js
const getMonthFirstDay = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
};
letfirstDayOfApril2022 = getMonthFirstDay(new Date("2022-04-15")); // 可以传入任意日期对象
console.log(firstDayOfApril2022.toISOString().slice(0, 10)); // 输出 "2022-04-01"
```

## 最后一天

```js
const getLastDayOfMonth = (date = new Date()) => {
  const nextMonthFirstDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );
  return new Date(nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1));
};
// 使用示例
let lastDayOfApril2022 = getLastDayOfMonth(new Date("2022-04-15"));
console.log(lastDayOfApril2022.toISOString().slice(0, 10)); // 输出 "2022-04-30"
```
