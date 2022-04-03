# el-multiple-upload

## 示例

[点击预览](https://panhezeng.github.io/el-multiple-upload/)

组件代码目录 packages/component
示例代码目录 packages/example

## 说明

基于 element-ui 的 el-upload 组件的进一步封装，功能更单一，就是上传单个文件，增加常用功能，比如，检查校验，预览，删除，编辑等

首先请按 element-ui 官方文档安装 element-ui，确保能正常使用 element-ui

修改了 output 方式，通过 require 或 window 方式使用，不需要加.default

事件 this.$emit('request-upload', option)  this.$emit('success-upload', response) this.$emit('error-upload', {err, file}) this.$emit('finish-upload')

使用了 Promise, 请自行解决兼容性

## 用法

### internal vue 方式

`npm i vue element-plus @panhezeng/el-multiple-upload -S`

#### 异步

```vue
<script>
import { defineAsyncComponent } from "vue";
const ElMultipleUpload = defineAsyncComponent(() =>
  import("@panhezeng/el-multiple-upload")
);
import "@panhezeng/el-multiple-upload/dist/style.css";
export default {
  components: { ElMultipleUpload },
};
</script>
```

#### 同步

```vue
<script>
import ElMultipleUpload from "@panhezeng/el-multiple-upload";
import "@panhezeng/el-multiple-upload/dist/style.css";
export default {
  components: { ElMultipleUpload },
};
</script>
```

### external vue 方式

```html
<link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css"
/>
<link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/npm/@panhezeng/el-multiple-upload/dist/style.css"
/>
<script src="//cdn.jsdelivr.net/combine/npm/vue@~3/dist/vue.global.min.js,npm/element-plus,npm/@panhezeng/el-multiple-upload/dist/el-multiple-upload.umd.js"></script>

export default { components: { ElMultipleUpload: window.ElMultipleUpload }, };
```

### 全局安装方式

```js
import { createApp } from "vue";
import App from "./App.vue";
import ElMultipleUpload from "@panhezeng/el-multiple-upload";
import "@panhezeng/el-multiple-upload/dist/style.css";
const app = createApp(App);
app.use(ElMultipleUpload);
app.mount("#app");
```

## IDE

### WebStorm

搜索 ESLint , 勾选 Automatic ESLint 和 Run eslint -- fix on save

Languages and Frameworks | JavaScript ，选择 Flow
Languages and Frameworks | TypeScript ，service 取消勾选

lerna 使用

```
lerna init
lerna create packagename
```

lerna.json

```
  "version": "independent",  // 不同模块不同版本
  "npmClient": "yarn",  // 指定 npmClent 为 yarn
  "useWorkspaces": true // 将 useWorkspaces 设置为 true
```

顶层的 package.json

```
"workspaces":[
        "packages/*"
        ]
```

```
lerna exec --scope packagename

lerna add packageaname --scope=packagebname

```

## 发版

`lerna version`

## 环境

[构建加速](https://help.aliyun.com/document_detail/202442.html)

- 重置前端依赖环境，cd 到项目目录，删除前端依赖相关文件

  ```shell
  rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml
  ```

- 初始化前端环境

  安装 pnpm _Mac 建议使用 `brew install pnpm`_

  ```shell
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  ```

  安装 node

  ```shell
  pnpm env use --global lts && pnpm install -g pnpm npm yarn lerna npm-check-updates
  ```

  ```
  /Users/panhezeng/Library/pnpm/nodejs/16.14.2/pnpm-global/5/node_modules/yarn
  ```
