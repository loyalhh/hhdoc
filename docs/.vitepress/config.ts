import { defineConfig } from "vitepress";
import sidebarConf from "./router/sidebarConf";
import navConf from "./router/navConf";

export default defineConfig({
  // head 会被渲染成 <link .... >
  base: "/hhdoc/", // 部署到github pages
  head: [
    ["link", { rel: "icon", href: "/hhdoc/hero.png" }], // 页头icon
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ], // 字体
  ],
  lang: "zh-CN",
  title: "Hho", //站点标题
  appearance: true, //主题切换
  description: "Hho 的documents",
  lastUpdated: true, //最后更新时间
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  themeConfig: {
    logo: "/hero.png", //站点logo
    search: {
      provider: "local",
    }, //搜索
    nav: navConf, //导航栏
    socialLinks: [{ icon: "github", link: "https://github.com/loyalhh/hhdoc" }], //社交链接
    sidebar: sidebarConf, //侧边栏
    outline: {
      level: [2, 6], //意味着只显示从二级标题（##）到六级标题（######）的内容
      label: "目录",
    }, //目录
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    notFound: {
      title: "这里什么也没有，去首页看看吧",
      quote: "",
      linkText: "返回首页",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "Copyright © 2024-present Hho",
    },
  },
});
