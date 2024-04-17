# 删除无效属性

删除一个对象中的属性值为 null 或 undefined 的所有属性

```jsx
const removeNullUndefined = (obj) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
removeNullUndefined({ name: "", age: undefined, sex: null }); // { name: '' }
```
