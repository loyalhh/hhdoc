# 防抖

原理: 当持续触发事件时，xx 秒内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
[参考文档](https://github.com/mqyqingfeng/Blog/issues/22)

## 不可取消防抖

```javascript
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 可取消防抖

```javascript
function debounce(func, wait, immediate) {
  let timer = null; // 定义一个定时器
  const debounced = function () {
    const context = this; // 保存函数的上下文
    const args = arguments; // 保存函数参数
    if (timer) clearTimeout(timer); // 清空之前的定时器
    const callNow = immediate && !timer; // 判断是否立即执行 且 不存在定时器
    // 定义一个延迟执行函数
    const later = function () {
      timer = null; // 清空定时器
      // 如果 immediate 参数为 false，则执行传入的函数
      if (!immediate) {
        func.apply(context, args);
      }
    };
    timer = setTimeout(later, wait); // 设置一个新的定时器
    // 如果立即执行，则调用传入的函数
    if (callNow) {
      func.apply(context, args);
    }
  };
  // 定义一个函数，用于取消防抖效果
  const cancelDebounce = function () {
    clearTimeout(timer);
    timer = null;
  };
  // 取消防抖
  debounced.cancel = cancelDebounce;
  return debounced;
}
const setUseAction = debounce(getUserAction, 10000, true);
node.onmousemove = setUseAction; // 使用防抖
setUseAction.cancel(); // 取消防抖
```
