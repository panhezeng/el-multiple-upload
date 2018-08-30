<template>
  <el-upload class="el-multiple-upload" ref="upload" v-bind="$attrs"
             action=""
             :before-upload="beforeUpload"
             :http-request="requestUpload"
             :on-success="successUpload"
             :on-remove="removeUpload"
             :accept="type&&`${type}/*`"
             :drag="drag"
             multiple
             :file-list="fileList"
  >
    <div v-if="defaultElement">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <slot/>
  </el-upload>
</template>
<script>
  import { Upload, Message } from 'element-ui'
  import checkUpload from '@panhezeng/utils/dist/check-upload.js'
  import getObjectItemByPath from '@panhezeng/utils/dist/get-object-item-by-path.js'

  export default {
    name: 'ElMultipleUpload',
    components: {'el-upload': Upload},
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
      // 限制大小，单位KB, 默认-1, 即'image', 'audio', 'video'限制2048,51200,512000,其他文件无限制
      size: {
        type: Number,
        default: -1
      },
      // 上传文件类型, 默认可上传所有类型
      type: {
        validator (value) {
          return ['image', 'audio', 'video', 'text', 'application', ''].includes(value)
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
      }
    },
    data () {
      return {
        elFileList: []
      }
    },
    methods: {
      beforeUpload (rawFile) {
        const result = checkUpload(rawFile, this.type, this.size)
        if (this.checkUpload) {
          return this.checkUpload(rawFile, result)
        } else {
          if (result.message) Message.error(result.message)
          return result.validate
        }
      },
      requestUpload (option) {
        return this.upload(option)
      },
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
      }
    }
  }
</script>
