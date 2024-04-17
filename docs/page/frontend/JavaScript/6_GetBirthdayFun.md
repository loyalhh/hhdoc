# 计算距离下次生日还有多少天

```js
function getBirthdayFun() {
  // 获取当前日期对象
  const now = new Date();
  // 创建一个表示今年生日的日期对象
  const thisYearBirthday = new Date(now.getFullYear(), 11, 19);
  // 注意月份是从0开始计数的，所以12月用11表示
  // 判断当前时间是否大于今年生日
  if (now.getTime() >= thisYearBirthday.getTime()) {
    // 如果已经过了今年生日，则计算下一年的生日
    thisYearBirthday.setFullYear(thisYearBirthday.getFullYear() + 1);
  }
  // 计算距离下次生日的天数
  const diffTime = Math.abs(thisYearBirthday - now);
  const daysUntilNextBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // 时间戳转换为天数并向上取整
  return daysUntilNextBirthday;
}
```
