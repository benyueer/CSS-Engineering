# CIJ简介

## CIJ的出现与争议
CIJ 在 2014 年由 Facebook 的员工 Vjeux 在 NationJS 会议上提出：可以借用 JS 解决许多 CSS 本身的一些“缺陷”，比如全局作用域、死代码移除、生效顺序依赖于样式加载顺序、常量共享等等问题。

### CIJ 的优劣势
优势：
1. 局部作用域样式。使用Pure CSS时，class在全局生效，可能会影响其他元素，但CIJ直接在元素上应用样式，是局部作用域，不糊影响其他元素
2. 代码组织。CIJ可以将样式写在组件里而不是单独目录的CSS文件
3. 可以在样式中使用JS变量

劣势：
1. 增加了运行时开销。当组件渲染时，CIJ库需要将样式“序列化”为可插入文档的Pure CSS，这会消耗性能
2. CIJ 增加了包体积。
3. 频繁插入CSS会消耗浏览器性能
4. CIJ因为库的问题会造成意外的错误

## 参考文章
- [再见，CSS-in-JS](https://cloud.tencent.com/developer/article/2340450)
- [CSS-in-JS：一个充满争议的技术方案](https://zhuanlan.zhihu.com/p/165089496)