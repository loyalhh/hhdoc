# 颜色操作 RGB 十六进制

## 将 RGB 转换为十六进制

```js
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
rgbToHex(0, 51, 255);
// Result: #0033ff
```

## 生成随机十六进制颜色

```js
const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
console.log(randomHex());
//Result: #92b008
```

## 生成 RGB 颜色字符串

```js
const randomRgbColor = () =>
  `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;
```
