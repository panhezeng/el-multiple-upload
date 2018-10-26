# el-multiple-upload

## 示例

[点击预览](https://panhezeng.github.io/el-multiple-upload/)

示例代码目录 /example

示例使用的apiary mock服务每次Request获得的Response都是不变的。免费服务可能会出现无响应等错误。免费又稳定，限制少，支持https的mock也就apiary。getsandbox也不错就是每个月限制5000次请求。

## 说明

基于element-ui的el-upload组件的进一步封装，功能更单一，就是上传单个文件，增加常用功能，比如，检查校验，预览，删除，编辑等

首先请按element-ui官方文档安装element-ui，确保能正常使用element-ui

修改了output方式，通过require或window方式使用，不需要加.default


```vue
<script>
export default {
    props: {
      // 上传文件的方法
      upload: {
        required: true,
        type: Function
      },
      // 从上传方法返回对象中获取url的path
      resPathOfUrl: {
        type: String,
        default: 'data.url'
      },
      // 已上传文件数组
      fileList: {
        type: Array,
        default () {
          return []
        }
      },
      // 上传前检查方法，第一个参数是上传文件数据，第二个参数是内部检查结果，方法必须返回布尔值，不是必须，默认走内部checkUpload逻辑
      checkUpload: Function,
      // size 单位KB，默认undefined，文件使用默认限制大小，如果不限制大小则传0
      size: {
        type: Number
      },
      // 上传文件类型, 默认可上传所有类型
      type: {
        validator (value) {
          return value === '' || /^(image|audio|video|text|application|\.)/.test(value)
        },
        default: ''
      },
      // 拖拽上传
      drag: {
        type: Boolean,
        default: true
      },
      // 是否在上传区域显示默认元素
      defaultElement: {
        type: Boolean,
        default: true
      },
      // 点击文件列表中已上传的文件时的钩子函数, 默认是打开窗口
      onPreview: Function
    },
    methods: {
      successUpload (response, file, fileList) {
        this.elFileList = fileList
        // 当没有文件处于准备或者上传中状态时, 即本次批量上传最后一次回调, 则同步数据
        if (fileList.every(file => !(file.status === 'ready' || file.status === 'uploading'))) {
          // 把上传成功的文件同步出去,并且只保留name和url, url替换成外网地址, uid和status在这里无法去除, 因为fileList同步后, el-upload组件又会watch并赋值这两属性, 如果后端要求去除, 则只能在最终表单提交时处理
          this.$emit('update:fileList', fileList.reduce((accumulator, file) => {
            if (file.status === 'success') {
              if (file.response) {
                accumulator.push({
                  uid: file.uid,
                  name: file.name,
                  url: getObjectItemByPath(file.response, this.resPathOfUrl, file.url)
                })
              } else {
                accumulator.push(file)
              }
            }
            return accumulator
          }, []))
        }
      },
      removeUpload (file, fileList) {
        this.elFileList = fileList
        this.$emit('update:fileList', fileList)
      },
      previewUpload (file) {
        window.open(file.url)
      }
    }
  }
</script>
```

## 用法

如果不希望每次使用组件时都显式传入upload prop，则可以在全局注册组件前，通过Vue.use方式安装组件，给use传第二个参数，或者直接赋值window.ElMultipleUploadOptions，数据结构要求{upload:foo}。upload是上传接口方法，这样后面多处使用该组件实例时就不需要显式传入upload prop了。
还有一种方法，就是再包一层，在包裹js里，直接修改此组件的props，其他地方使用修改后的组件

`<el-multiple-upload :file-list.sync="fileList" ref="mUpload"/>`

### internal vue element-ui 方式

`npm i vue element-ui @panhezeng/el-multiple-upload -S`

#### 异步
```vue
<script>
  const ElMultipleUpload = () => import('@panhezeng/el-multiple-upload')
 
   export default {
     components: {ElMultipleUpload}
   }
</script>
```

#### 同步

##### export default components
```vue
<script>
    import ElMultipleUpload from '@panhezeng/el-multiple-upload'

    export default {
      components: {ElMultipleUpload}
    }
</script>
```

##### Vue.use
```vue
<script>
    import Vue from 'vue'
    import ElMultipleUpload from '@panhezeng/el-multiple-upload'

    Vue.use(ElMultipleUpload, {upload: upload})
</script>
```

### external vue element-ui 方式

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@latest/lib/theme-chalk/index.css">
<script src="https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@latest/lib/index.js"></script>
```

`npm i @panhezeng/el-multiple-upload -S`

```javascript
// auto install
  window.ElMultipleUploadOptions = {upload: upload}
  require('@panhezeng/el-multiple-upload')
```
or 
```html
<!--auto install-->
<script>
window.ElMultipleUploadOptions = {upload: upload}
</script>
<script src="https://cdn.jsdelivr.net/npm/@panhezeng/el-multiple-upload@latest/dist/el-multiple-upload.min.js"></script>
```

## 编译

``` bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build

# 发版
npm version patch && npm publish --access public

```

