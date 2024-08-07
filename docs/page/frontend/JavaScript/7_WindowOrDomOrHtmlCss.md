# 浏览器操作 dom 操作

## 图片懒加载

```html
<!-- 大多数现代浏览器都支持 loading="lazy" 属性，但在一些较旧的浏览器中可能不被支持。 -->
<img src="example.jpg" alt="示例图片" loading="lazy" />
```

## 获取可视窗口高度\宽度

```js
// 获取可视窗口高度
export const getClientHeight = () => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
};
//获取页面宽度
export const getPageViewWidth = () => {
  //document.compatMode兼容摸式
  return (
    document.compatMode == "BackCompat"
      ? document.body
      : document.documentElement
  ).clientWidth;
};
```

## 滚动到指定元素区域

```js
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};
```

[参考 mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#%E7%A4%BA%E4%BE%8B)

## 滚动到页面底部

```js
export const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
};
```

## 滚动到页面顶部

```js
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};
```

## 开启全屏\关闭全屏

```js
export const launchFullscreen = (el) => {
  // const el = document.documentElement
  const rfs =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;
  if (typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  }
};
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
```

## 遍历 DOM 结构 createNodeIterator

```js
<div id="app">
  <p>hello</p>
  <div class="title">标题</div>
  <div>
    <div class="content">内容</div>
  </div>
</div>;
const body = document.getElementsByTagName("body")[0];
const item = document.createNodeIterator(body); //让body变成可遍历的
let root = item.nextNode(); // 下一层

while (root) {
  console.log(root);
  if (root.nodeType !== 3) {
    root.setAttribute("data-index", 123); //给每个节点添加一个属性
  }
  root = item.nextNode();
}
```

<div align=center>
    <img src=./assets/7_dom.png width=100% />
</div>

## 打印 dom

```js
console.dir(document.body);
```

## 流畅且高效动画

::: tip
与 setInterval 和 setTimeout

requestAnimationFrame 的调用频率通常为每秒 60 次。这意味着我们可以在每次重绘之前更新动画的状态，并确保动画流畅运行，而不会对浏览器的性能造成影响。

setInterval 与 setTimeout 它可以让我们在指定的时间间隔内重复执行一个操作，不会考虑浏览器的重绘，而是按照指定的时间间隔执行回调函数，可能会被延迟执行，从而影响动画的流畅度。
:::

```js
let distance = 0;
let box = document.getElementById("box");
let box2 = document.getElementById("box2");
window.addEventListener("click", function () {
  requestAnimationFrame(function move() {
    box.style.transform = `translateX(${distance++}px)`;
    requestAnimationFrame(move); //递归
  });
  setTimeout(function change() {
    box2.style.transform = `translateX(${distance++}px)`;
    setTimeout(change, 17);
  }, 17);
});
```

## 获取元素 CSS 属性值

两个参数，第一个参数是你想要获取哪个元素的 CSS ，第二个参数是一个伪元素

```js
const box = document.getElementById("box");
const style = window.getComputedStyle(box, "after");
const height = style.getPropertyValue("height");
const width = style.getPropertyValue("width");
console.log(style);
console.log(width, height);
```

## 获取元素位置和尺寸信息

```js
const box = document.getElementById("box");
const rect = box.getBoundingClientRect();
console.log(rect.x); // 元素左边界相对于视口的 x 坐标
console.log(rect.y); // 元素上边界相对于视口的 y 坐标
console.log(rect.width); // 元素的宽度
console.log(rect.height); // 元素的高度
console.log(rect.top); // 元素上边界相对于视口顶部的距离
console.log(rect.right); // 元素右边界相对于视口左侧的距离
console.log(rect.bottom); // 元素下边界相对于视口顶部的距离
console.log(rect.left); // 元素左边界相对于视口左侧的距离
```

应用场景判断一个容器是否出现在可视窗口内

```js
const box = document.getElementById("box");
window.onscroll = function () {
  //window.addEventListener('scroll',()=>{})
  console.log(checkInView(box));
};
function checkInView(dom) {
  const { top, left, bottom, right } = dom.getBoundingClientRect();
  return (
    top > 0 &&
    left > 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

## 判断元素是否在视口中

```js
if (window?.IntersectionObserver) {
  let images = [...document.querySelectorAll(".item img.lazy")]; // 假设我们只关注class为"item"的元素内的lazy类图片
  let io = new IntersectionObserver(
    (entries) => {
      //intersectionRatio：目标元素与视口的交叉比例，值在 0 到 1 之间
      //isIntersecting：目标元素是否与视口相交
      //intersectionRect：目标元素与视口的交叉区域的位置和尺寸信息
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 1) {
          const img = entry.target;
          img.src = img.dataset.src; // 假设图片的真实src地址存储在img的dataset.src属性中
          img.classList.remove("lazy"); // 移除懒加载标记
          io.unobserve(img); // 一旦加载完成，取消对该图片的观察
        }
      });
    },
    {
      root: null, //指定观察器的根元素，默认为视口
      rootMargin: "0px 0px", //设置根元素的外边距，用于扩大或缩小交叉区域
      threshold: 1, //指定交叉比例的阈值，可以是单个数值或由多个数值组成的数组
    }
  );
  images.forEach((img) => io.observe(img));
}
```

## 图片未上传地址查看

```js
const getObjectURL = (file) => {
  let url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  }
  return url;
};
```

## 判断横竖屏

```js
function hengshuping() {
  if (window.orientation == 180 || window.orientation == 0) {
    alert("竖屏状态！");
  }
  if (window.orientation == 90 || window.orientation == -90) {
    alert("横屏状态！");
  }
}
window.addEventListener(
  "onorientationchange" in window ? "orientationchange" : "resize",
  hengshuping,
  false
);
```

横竖屏样式变更

```css
<style>
  @media all and (orientation: landscape) {
    body {
      background-color: #ff0000;
    }
  }

  @media all and (orientation: portrait) {
    body {
      background-color: #00ff00;
    }
  }
</style>
```

## 屏幕录制

```js
const streamPromise = navigator.mediaDevices.getDisplayMedia();
streamPromise.then((stream) => {
  var recordedChunks = []; // 录制的视频数据

  var options = { mimeType: "video/webm; codecs=vp9" }; // 设置编码格式
  var mediaRecorder = new MediaRecorder(stream, options); // 初始化MediaRecorder实例

  mediaRecorder.ondataavailable = handleDataAvailable; // 设置数据可用（录屏结束）时的回调
  mediaRecorder.start();

  // 视频碎片合并
  function handleDataAvailable(event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data); // 添加数据，event.data是一个BLOB对象
      download(); // 封装成BLOB对象并下载
    }
  }
  // 文件下载
  function download() {
    var blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    // 此处可将视频上传到后端
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }
});
```

## 阻止关闭事件

```js
window.onbeforeunload = function () {
  return "您确定要离开haorooms博客吗？";
};
```

## sendBeacon 关闭页面卸载向服务器发送数据

```js
function report(url, data) {
  if (typeof navigator.sendBeacon !== "function") {
    return console.error("sendBeacon不被支持");
  }
  navigator.sendBeacon(url, data);
}
window.addEventListener("unload", logData, false);
function logData() {
  report("/log", "被卸载了");
}
```

## 相对地址转换为绝对地址

```js
function realativeToAbs(href) {
  let aEl = document.createElement("a");
  aEl.href = href;
  const result = aEl.href;
  aEl = null;
  return result;
}
console.log("realativeToAbs", realativeToAbs("../a/b/b/index.html"));
// realativeToAbs http://127.0.0.1:5500/a/b/b/index.html
```

## 非正则替换的 html 代码 encode 和 decode

```js
function htmlencode(s) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(s));
  var result = div.innerHTML;
  div = null;
  return result;
}
function htmldecode(s) {
  var div = document.createElement("div");
  div.innerHTML = s;
  var result = div.innerText || div.textContent;
  div = null;
  return result;
}
htmlencode("<div>3>5 & 666</div>"); // &lt;div&gt;3&gt;5 &amp; 666&lt;/div&gt;
htmldecode("&lt;div&gt;3&gt;5 &amp; 666&lt;/div&gt;"); // <div>3>5 & 666</div>
```

## 带图带事件的桌面通知

<div align=center>
    <img src=./assets/7_notify.png  />
</div>

```js
function doNotify(title, options = {}, events = {}) {
  const notification = new Notification(title, options);
  for (let event in events) {
    notification[event] = events[event];
  }
}

function notify(title, options = {}, events = {}) {
  if (!("Notification" in window)) {
    return console.error("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    doNotify(title, options, events);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        doNotify(title, options, events);
      }
    });
  }
}
notify(
  "中奖提示",
  {
    icon: "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f1a9f122e925aeef5e4534ff7f706729~300x300.image",
    body: "恭喜你，掘金签到一等奖",
    tag: "prize",
  },
  {
    onclick(ev) {
      console.log(ev);
      ev.target.close();
      window.focus();
    },
  }
);
```

## 获取某个元素所有的兄弟元素

```js
const a = (el) =>
  [].slice.call(el.parentNode.children).filter((child) => child !== el);
```

## 禁止右键、选择、复制

```js
['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
  document.addEventListener(ev, function (event) {
    return (event.returnValue = false)
  })
})
// css方法禁用选择和复制
body {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
```

## 编辑页面|元素

与前端的 JavaScript 有关，设计模式让你可以编辑页面上的任何内容。只要打开浏览器控制台，输入以下内容即可。

```js
document.designMode = "on";
<div contenteditable="true">这里是可编辑的内容</div>;
```

## 复制到剪贴板

```js
const copyToClipboard = (text) =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
copyToClipboard("Hello World");
```

## 获取页面选定的文本

使用内置的 getSelectionproperty 获取用户选择的文本。

```js
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```

## 判断当前页面是否可见|激活

```js
const isTabInView = () => !document.hidden;
```

## 打开浏览器打印框

```js
const showPrintDialog = () => window.print();
当你需要将当前页面打印出来，但是需要修改一下当前排版
<style>
  /* 使用@media print可以调整你需要的打印样式 */
  @media print {
    .noprint {
      display: none;
    }
  }
</style>
<div class="print">print</div>
<div class="noprint">noprint</div>

```

## 阻止冒泡事件

```js
export const stopPropagation = (e) => {
  e = e || window.event;
  if (e.stopPropagation) {
    // W3C阻止冒泡方法
    e.stopPropagation();
  } else {
    e.cancelBubble = true; // IE阻止冒泡方法
  }
};
```
