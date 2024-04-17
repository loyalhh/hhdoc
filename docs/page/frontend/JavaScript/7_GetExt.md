# 获取文件后缀名

```js
/**
 * 获取文件后缀名
 * @param {String} filename
 */
export const getExt = (filename) => {
  if (typeof filename == "string") {
    // 如果文件没有后缀名，返回null
    if (!filename.includes(".")) {
      return null;
    }
    return filename.split(".").pop().toLowerCase();
  } else {
    throw new Error("filename must be a string type");
  }
};
```
