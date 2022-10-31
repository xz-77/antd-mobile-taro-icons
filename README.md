GitHub 仓库: [antd-mobile-taro-icons](https://github.com/xz-77/antd-mobile-taro-icons)

**喜欢的话，麻烦点个赞，谢谢 🙏**

## 新手指南

```bash
$ yarn add antd-mobile-taro-icons
# or
$ npm install antd-mobile-taro-icons --save-dev
```

## 引入

直接引入组件即可，`antd-mobile-taro-icons`的相关 css 文件会自动加载

```javascript
import { CheckIcon } from 'antd-mobile-taro-icons';
```

## Icon 图标

[图标网址](https://xz-77.github.io/antd-mobile-taro-icons/)

## 核心思想

- 由于小程序不支持`svg`，在[iconfont](https://www.iconfont.cn/)上也没有找到`antd-mobile`的矢量图，所以这里使用的是[iconfont](https://www.iconfont.cn/)中[手机淘宝图标库](https://www.iconfont.cn/collections/index?spm=a313x.7781069.1998910419.5&type=1&page=4)转`base64`，与`antd-mobile`的图标库会有细微的差别
