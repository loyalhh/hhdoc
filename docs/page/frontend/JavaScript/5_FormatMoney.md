# 数字千分位分隔|金额格式化

```js
const num = 100010001;
num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 100,010,001
function formatMoney(num) {
  return (+num).toLocaleString("en-US");
}
//formatMoney(123456.78)123,456.78
```

```js
export const format = (n) => {
  let numStr = n.toString();
  let parts = numStr.split(".");
  // 整数部分处理
  let integerPart = parts[0];
  let formattedInteger = "";
  let len = integerPart.length;
  if (len > 3) {
    let remainder = len % 3;
    if (remainder > 0) {
      formattedInteger += integerPart.slice(0, remainder);
    }
    for (let i = remainder; i < len; i += 3) {
      formattedInteger += "," + integerPart.slice(i, i + 3);
    }
  } else {
    formattedInteger = integerPart;
  }
  // 小数部分处理
  let decimalPart = parts[1] || "";
  return formattedInteger + "." + decimalPart;
};
```

```js
//decimals：保留几位小数 dec_point：小数点符号 thousands_sep：千分位符号
export const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals);
  const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
  const dec = typeof dec_point === "undefined" ? "." : dec_point;
  let s = "";
  const toFixedFix = function (n, prec) {
    const k = Math.pow(10, prec);
    return "" + Math.ceil(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}; //moneyFormat(10000000) // 10,000,000.00
moneyFormat(10000000, 3, ".", "-"); // 10-000-000.000
```
