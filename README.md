# jump-to-chinese-page
## 功能
检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。

## 兼容性
适用于 Tampermonkey Chrome 扩展，暂未测试其他同类扩展的兼容性。

## 使用方法：
1. 安装 Tampermonkey Chrome 扩展，此扩展可以为浏览器添加脚本运行能力。
2. 在扩展中选择“添加新脚本”，将 app.js 中的代码全部复制到编辑器中，直接使用 ```ctrl + S``` 快捷键保存即可。
3. 确认该脚本已启用。

## 其他说明：
脚本代码包含了仅在 MDN 相关页面上运行的设置，不需要额外配置。

目前脚本没有添加自动更新功能。

## 已知问题：
1. 由于指向页内标题的参数会随着语言的变化而变化，故仅通过当前方法改变页面语言时，# 后面的参数失效。目前的处理方法是直接去除 # 后面的参数。

## 更新内容：
### 0.1.1
- 第一个版本，实现从非中文页面跳转到中文页面的基本功能。
### 0.2.0
- 去除了 # 后面的参数，因为指向页内标题的参数会随着语言的变化而变化，故目前强行去除了该参数。