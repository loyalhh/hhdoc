# 数组 reduce 方法总结

## 求数组的总和|平均值

```jsx
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4);
// Result: 2.5
// 累加
[1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => a + i);
// 输出：36
// 累加，默认一个初始值
[1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => a + i, 5);
// 输出：41
// 累乘
[1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => a * i);
// 输出：40320
```

## 代替 reverse

```jsx
第一种
[..."hello world"].reduce((a,v) => a + v)
第二种
[..."hello world"].reverse().join('')
function ReverseStr(str = "") {
    return str.split("").reduceRight((t, v) => t + v);
}
const str = "reduce最牛逼";
ReverseStr(str); // "逼牛最ecuder"

const Reverse = (arr = [])=> {
    return arr.reduceRight((t, v) => (t.push(v), t), []);
}
Reverse([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]

```

## 代替 map 和 filter

```jsx
const arr = [0, 1, 2, 3];
// 代替map：[0, 2, 4, 6]
const a = arr.map((v) => v * 2);
const b = arr.reduce((t, v) => [...t, v * 2], []);

// 代替filter：[2, 3]
const c = arr.filter((v) => v > 1);
const d = arr.reduce((t, v) => (v > 1 ? [...t, v] : t), []);

// 代替map和filter：[4, 6]
const e = arr.map((v) => v * 2).filter((v) => v > 2);
const f = arr.reduce((t, v) => (v * 2 > 2 ? [...t, v * 2] : t), []);
```

## 代替 some 和 every

```jsx
const scores = [
  { score: 45, subject: "chinese" },
  { score: 90, subject: "math" },
  { score: 60, subject: "english" },
];
// 代替some：至少一门合格
const isAtLeastOneQualified = scores.reduce(
  (t, v) => t || v.score >= 60,
  false
); // true
// 代替every：全部合格
const isAllQualified = scores.reduce((t, v) => t && v.score >= 60, true); // false
```

## 数组分割

```jsx
function Chunk(arr = [], size = 1) {
  return arr.length
    ? arr.reduce(
        (t, v) => (
          t[t.length - 1].length === size
            ? t.push([v])
            : t[t.length - 1].push(v),
          t
        ),
        [[]]
      )
    : [];
}
const arr = [1, 2, 3, 4, 5];
Chunk(arr, 2); // [[1, 2], [3, 4], [5]]
```

## 数组过滤

```jsx
function Difference(arr = [], oarr = []) {
  return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 6];
Difference(arr1, arr2); // [1, 4, 5]
```

## 数组填充

```jsx
function Fill(arr = [], val = "", start = 0, end = arr.length) {
  if (start < 0 || start >= end || end > arr.length) return arr;
  return [
    ...arr.slice(0, start),
    ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
    ...arr.slice(end, arr.length),
  ];
}
const arr = [0, 1, 2, 3, 4, 5, 6];
Fill(arr, "aaa", 2, 5); // [0, 1, "aaa", "aaa", "aaa", 5, 6]
```

## 数组成员独立拆解

```jsx
function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map((v) => v.length)) }).map((v) => [])
  );
}
const arr = [
  ["a", 1, true],
  ["b", 2, false],
];
Unzip(arr); // [["a", "b"], [1, 2], [true, false]]
```

## 找出数组最大值|最小值

```jsx
最大值[(1, 2, 3, 4, 5, 6, 7, 8)].reduce((a, i) => Math.max(a, i)); //第一种
Math.max(...[1, 2, 3, 4, 5, 6, 7, 8]); //第二种
array.reduce((a, b) => (a > b ? a : b)); //第三种
最小值;
array.reduce((a, b) => (a < b ? a : b));
[1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => Math.min(a, i));
Math.min(...[1, 2, 3, 4, 5, 6, 7, 8]); //第二种
```

## 查找最大值索引|最小值索引

```jsx
const indexOfMax = (arr) =>
  arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2

const indexOfMin = (arr) =>
  arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0);
indexOfMin([2, 5, 3, 4, 1, 0, 9]); // 5
```

## 数组成员个数统计

```jsx
function Count(arr = []) {
  return arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
}
const arr = [0, 1, 1, 2, 2, 2];
Count(arr); // { 0: 1, 1: 2, 2: 3 }
```

## 数组成员位置记录

```jsx
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);
}

const arr = [2, 1, 5, 4, 2, 1, 6, 6, 7];
Position(arr, 2); // [0, 4]
```

## 处理不规则数组

```jsx
let data = [
  ["红色","128g", "苹果手机"],
  ["南北","两室一厅","128㎡","洋房住宅"],
  ["小米","白色","智能运动手表","心率血压血氧","来电信息提醒"],
  ["官方发售","2020年秋季","篮球","球鞋","品牌直邮"]
]
let dataConcat = data.map(item=>item.reduce((a,i)=>`${a} ${i}`))
// 输出结果：
["红色 128g 苹果手机"
"南北 两室一厅 128㎡ 洋房住宅"
"小米 白色 智能运动手表 心率血压血氧 来电信息提醒"
"官方发售 2020年秋季 篮球 球鞋 品牌直邮"]

```

## 按属性分组|对象键值分组

```jsx
let obj = [
  {name: '张三', job: '数据分析师', country: '中国'},
  {name: '艾斯', job: '科学家', country: '中国'},
  {name: '雷尔', job: '科学家', country: '美国'},
  {name: '鲍勃', job: '软件工程师', country: '印度'},
]
obj.reduce((group, curP) => {
  let newkey = curP['country']
  if(!group[newkey]){
    group[newkey]=[]
  }
  group[newkey].push(curP)
  return group
}, [])
  // 输出：
  [ 中国: [{…}, {…}]
印度: [{…}]
美国: [{…}] ]

// using reduce
const todosForUserMap = todos.reduce((accumulator, todo)=>{
  if (accumulator[todo.userId]) accumulator[todo.userId].push(todo);
  if (!accumulator[todo.userId]) accumulator[todo.userId] = [todo];
  return accumulator;
},{})
function Group(arr = [], key) {
    return key ? arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {}) : {};
}
const arr = [
    { area: "GZ", name: "YZW", age: 27 },
    { area: "GZ", name: "TYJ", age: 25 },
    { area: "SZ", name: "AAA", age: 23 },
    { area: "FS", name: "BBB", age: 21 },
    { area: "SZ", name: "CCC", age: 19 }
]; // 以地区area作为分组依据
Group(arr, "area"); // { GZ: Array(2), SZ: Array(2), FS: Array(1) }



```

## 数组成员所含关键字统计

```jsx
function Keyword(arr = [], keys = []) {
  return keys.reduce(
    (t, v) => (arr.some((w) => w.includes(v)) && t.push(v), t),
    []
  );
}
const text = [
  "今天天气真好，我想出去钓鱼",
  "我一边看电视，一边写作业",
  "小明喜欢同桌的小红，又喜欢后桌的小君，真TM花心",
  "最近上班喜欢摸鱼的人实在太多了，代码不好好写，在想入非非",
];
const keyword = ["偷懒", "喜欢", "睡觉", "摸鱼", "真好", "一边", "明天"];
Keyword(text, keyword); // ["喜欢", "摸鱼", "真好", "一边"]
```

## 找到最接近的数值

```jsx
const closest = (arr, n) =>
  arr.reduce((prev, curr) =>
    Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev
  );
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50); // 33
```

## 斐波那契数列

```jsx
function Fibonacci(len = 2) {
  const arr = [...new Array(len).keys()];
  return arr.reduce(
    (t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t),
    [0, 1]
  );
}

Fibonacci(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

## URL 参数反序列化

```jsx
function ParseUrlSearch() {
  return location.search
    .replace(/(^\?)|(&$)/g, "")
    .split("&")
    .reduce((t, v) => {
      const [key, val] = v.split("=");
      t[key] = decodeURIComponent(val);
      return t;
    }, {});
}
// 假设URL为：https://www.baidu.com?age=25&name=TYJ
ParseUrlSearch(); // { age: "25", name: "TYJ" }
```

## URL 参数序列化

```jsx
function StringifyUrlSearch(search = {}) {
  return Object.entries(search)
    .reduce(
      (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
      Object.keys(search).length ? "?" : ""
    )
    .replace(/&$/, "");
}
StringifyUrlSearch({ age: 27, name: "YZW" }); // "?age=27&name=YZW"
```

## 返回对象指定键值

```jsx
function GetKeys(obj = {}, keys = []) {
  return Object.keys(obj).reduce(
    (t, v) => (keys.includes(v) && (t[v] = obj[v]), t),
    {}
  );
}
const target = { a: 1, b: 2, c: 3, d: 4 };
const keyword = ["a", "d"];
GetKeys(target, keyword); // { a: 1, d: 4 }
```

## Redux Compose 函数原理

```jsx
从右到左的顺序组合这些函数。每次迭代过程中，a或prev代表已经组合好的函数，
b或next则是当前要加入组合的函数。最终返回的新函数接受一组参数，
通过链式调用内部函数的方式，实现了将所有传入函数依次执行的效果
const compose = (...funcs) =>
  (fns.reduce((prev, next) => (...args) => prev(next(...args))));

function Compose(...funs) {
    if (funs.length === 0) {
        return arg => arg;
    }
    if (funs.length === 1) {
        return funs[0];
    }
    return funs.reduce((t, v) => (...arg) => t(v(...arg)));
}

```
