# 字符串处理方法

## 替换匹配的所有字符

ES12 中 replaceAll 的新方法被添加到 String.prototype

```jsx
const str = "Red-Green-Blue";
// 只规制第一次出现的
str.replace("-", " "); // Red Green-Blue
// 使用 RegEx 替换所有匹配项
str.replace(/\-/g, " "); // Red Green Blue
str.replaceAll("-", " "); // Red Green Blue
```

## **大小写转换**

```jsx
//type 1-全大写 2-全小写 3-首字母大写
export const turnCase = (str, type) => {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      //return str[0].toUpperCase() + str.substr(1).toLowerCase() // substr 已不推荐使用
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
      return str.charAt(0).toUpperCase() + str.slice(1); //都是小写的时候
    default:
      return str;
  }
};
```

## **反转字符串**

使用 split、reverse 和 join 方法轻松反转字符串

```jsx
const reverse = (str) => str.split("").reverse().join("");
reverse("hello world");
// Result: 'dlrow olleh'
```

## 随机字符串

```jsx
const randomString = () => Math.random().toString(36).slice(2);
randomString();
```

## 截断字符串

```jsx
const truncateString = (string, length) =>
  string.length < length ? string : `${string.slice(0, length - 3)}...`;
truncateString("Hi, I should be truncated because I am too loooong!", 36);
// 'Hi, I should be truncated because...'
```

## 去除字符串中的 HTML

```jsx
const stripHtml = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";
```

## 手机号脱敏\中间四位变成\*

```jsx
第一种;
export const telFormat = (tel) => {
  tel = String(tel);
  return tel.substr(0, 3) + "****" + tel.substr(7);
};
第二种;
export const hideMobile = (mobile) => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}; //187****2345
```

## 驼峰命名转换成短横线命名

```jsx
export const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (item) => "-" + item.toLowerCase());
};
```

## 短横线命名转换成驼峰命名

```jsx
export const getCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase());
};
```

## 全角转半角

```jsx
export const toCDB = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};
```

## 半角转全角

```jsx
export const toDBC = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};
```

## 字符串转 base64 与 base64 转字符串

```jsx
// 加密字符串转base64
function base64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}
// 解密base64转字符串
function base64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}
utf8_to_b64("✓ à la mode"); // "4pyTIMOgIGxhIG1vZGU="
b64_to_utf8("4pyTIMOgIGxhIG1vZGU="); // "✓ à la mode"
```

## 判断回文字符串

```jsx
const isReverse = (str1, str2) => {
  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").split("").reverse().join("");
  return normalize(str1) === normalize(str2);
};

console.log(isReverse("anagram", "margana")); // true
console.log(isReverse("rac", "car")); // true
```

## 判断两个字符串是否为互相排列

```jsx
const isAnagram = (str1, str2) => {
  const normalize = (str) => {
    return str.toLowerCase().normalize("NFD").split("").sort().join("");
  };

  return normalize(str1) === normalize(str2);
};
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("heArT", "traEH")); // true
```

## 检查路径是否是相对路径

```jsx
function isRelativePath(path) {
  // 绝对路径通常会以协议（如 'http://'、'https://' 或 'file://'）开始，
  // 或者在非网络环境中以根路径（如 '/' 在Unix系统中或 '\' 在Windows系统中）开始。
  // 如果路径不满足这些条件，则可认为它是相对路径。
  const absolutePathStart = /^([a-z]+:)?[\\/]|\\\\/i; // 匹配协议或根路径
  return !absolutePathStart.test(path);
}
console.log(isRelativePath("C:\\path\\to\\file")); // false (Windows绝对路径 with drive letter)
console.log(isRelativePath("http://example.com/path")); // false (网络绝对路径)
console.log(isRelativePath("path/to/file")); // true (相对路径)
```
