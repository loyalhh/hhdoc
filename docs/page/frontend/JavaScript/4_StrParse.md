# 字符串转对象

字符串比如'{name: "jack"}'转换成对象时，直接使用 JSON.parse 将会报错

```jsx
const strParse = (str) =>
  JSON.parse(
    str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\'/g, '"')
  );
strParse('{name: "jack"}');
```
