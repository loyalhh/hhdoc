# 设置读取删除 Cookie

## 清除所有 cookie

你可以通过使用 document.cookie 访问 cookie 并清除它来轻松清除存储在网页中的所有 cookie。

```jsx
document.cookie.split(";").forEach((cookie) => {
  const key = cookie.replace(/^ +/, "").replace(/=.*/, "");
  document.cookie = `${key}=;expires=${new Date(0).toUTCString()};path=/`;
});
```

## 设置 cookie

```jsx
export const setCookie = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};
```

## 读取 cookie

```jsx
export const getCookie = (key) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split("; ");
  let cookieValue = "";
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split("=");
    if (temp[0] === key) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
};
```

## 删除 cookie

```jsx
export const delCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};
```

## 获取所有 cookie 并转为对象

```jsx
const getCookies = () =>
  document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});
```
