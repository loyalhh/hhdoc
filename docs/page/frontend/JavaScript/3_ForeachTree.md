# 遍历树节点

```js
export const foreachTree = (data, callback, childrenName = 'children') => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i])
    if (data[i][childrenName] && data[i][childrenName].length > 0) {
      foreachTree(data[i][childrenName], callback, childrenName)
    }
  }
  let result
foreachTree(data, (item) => {
  if (item.id === 9) {
    result = item
  }
})
console.log('result', result)  // {id: 9,label: "三级 1-1-1"}

```
