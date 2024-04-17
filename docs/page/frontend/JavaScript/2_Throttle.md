# 节流

原理: 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
[参考文档](https://github.com/mqyqingfeng/Blog/issues/26)

## 函数节流

```javascript
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 可以理解问第一次执行，最后一次不执行
    2 表定时器版 可以理解为第一次不执行，最后一次执行
 */
function throttle(func, wait, type) {
  if (type === 1) {
    let previous = 0;
  } else if (type === 2) {
    let timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}
```

## 兼顾性节流

```js
// 方法三：第一次会马上执行，最后一次也会执行
function throttle(fn, delay) {
  // 初始化定时器
  let timer = null;
  // 上一次调用时间
  let prev = null;
  // 返回闭包函数
  return function () {
    // 现在触发事件时间
    let now = Date.now();
    // 触发间隔是否大于delay
    let remaining = delay - (now - prev);
    // 保存事件参数
    const args = arguments;
    // 清除定时器
    clearTimeout(timer);
    // 如果间隔时间满足delay
    if (remaining <= 0) {
      // 调用fn，并且将现在的时间设置为上一次执行时间
      fn.apply(this, args);
      prev = Date.now();
    } else {
      // 否则，过了剩余时间执行最后一次fn
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
```

## 支持取消节流

```javascript
function throttle(func, wait) {
  let timer = null; // 定时器
  let startTime = Date.now(); // 记录开始时间
  function throttled() {
    const curTime = Date.now(); // 获取当前时间
    const remaining = wait - (curTime - startTime); // 计算剩余时间
    const context = this; // 保存函数执行上下文
    const args = arguments; // 保存函数参数
    if (timer) clearTimeout(timer); // 清除之前的定时器
    // 定义一个延迟执行函数
    const later = function () {
      // 如果剩余时间大于0，则设置定时器
      func.apply(context, args); // 在剩余时间后执行函数
      startTime = Date.now(); // 更新开始时间
    };
    if (remaining <= 0) {
      // 如果剩余时间小于等于0，表示可以立即执行
      func.apply(context, args); // 执行函数
      startTime = Date.now(); // 更新开始时间
    } else {
      timer = setTimeout(later, remaining);
    }
  }
  // 定义一个函数，用于取消节流效果
  const cancelThrottle = function () {
    clearTimeout(timer);
    timer = null;
  };
  // 取消节流
  throttled.cancel = cancelThrottle;
  return throttled;
}
//使用注意最终版：支持取消节流；
//另外通过传入第三个参数，
//options.leading 来表示是否可以立即执行一次
//opitons.trailing 表示结束调用的时候是否还要执行一次，
//默认都是true注意设置的时候不能同时将 leading 或 trailing 设置为 false。
container.onmousemove = throttle(getUserAction, 1000);
container.onmousemove = throttle(getUserAction, 1000, {
  leading: false,
});
container.onmousemove = throttle(getUserAction, 1000, {
  trailing: false,
});
```
