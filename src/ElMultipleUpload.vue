<template>
  <el-upload
    class="el-multiple-upload"
    ref="upload"
    v-bind="$attrs"
    action=""
    :before-upload="beforeUpload"
    :http-request="requestUpload"
    :on-success="successUpload"
    :on-remove="removeUpload"
    :on-preview="onPreview || previewUpload"
    :accept="accept"
    :drag="drag"
    multiple
    :file-list="fileList"
  >
    <div v-if="defaultElement">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <slot />
  </el-upload>
</template>
<script>
import { Upload, Message } from "element-ui";
import checkUpload from "@panhezeng/utils/dist/check-upload.js";
import getObjectItemByPath from "@panhezeng/utils/dist/get-object-item-by-path.js";

export default {
  name: "ElMultipleUpload",
  components: { "el-upload": Upload },
  props: {
    // 上传文件的方法
    upload: {
      required: true,
      type: Function
    },
    // 从上传方法返回对象中获取url的path
    resPathOfUrl: {
      type: String,
      default: "data.url"
    },
    // 已上传文件数组
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 上传前检查方法，第一个参数是上传文件数据，第二个参数是内部检查结果，方法必须返回布尔值，不是必须，默认走内部checkUpload逻辑
    checkUpload: {
      type: Function,
      default: undefined
    },
    // 图片类型宽度高度限制，默认不限制
    imageDimensions: {
      validator(value) {
        return (
          /^\[object Object\]$/.test(Object.prototype.toString.call(value)) &&
          Object.prototype.hasOwnProperty.call(value, "width") &&
          Object.prototype.hasOwnProperty.call(value, "height")
        );
      },
      type: Object,
      default() {
        return {
          width: undefined,
          height: undefined
        };
      }
    },
    // 和HTML的input元素的accept属性一样，支持用逗号分隔的MIME类型或者.文件后缀名组成的字符串，默认空字符串，不限制类型
    accept: {
      validator(value) {
        return (
          value === "" || /^(image|audio|video|text|application|\.)/.test(value)
        );
      },
      type: String,
      default: ""
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
    onPreview: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      elFileList: []
    };
  },
  computed: {},
  methods: {
    beforeUpload(file) {
      // 开始上传后，不让编辑
      this.$emit("file", file);
      this.$emit("before-upload", file);
      if (this.checkUpload) {
        return this.checkUpload(file);
      } else {
        return new Promise(async (resolve, reject) => {
          const result = await checkUpload(
            file,
            this.accept,
            this.size,
            this.imageDimensions.width,
            this.imageDimensions.height
          );
          if (result.validation) {
            resolve();
          } else {
            if (result.message) Message.error(result.message);
            this.$emit("validation-error");
            reject();
          }
        });
      }
    },
    requestUpload(option) {
      return this.upload(option);
    },
    successUpload(response, file, fileList) {
      this.elFileList = fileList;
      // 当没有文件处于准备或者上传中状态时, 即本次批量上传最后一次回调, 则同步数据
      if (
        !fileList.some(
          file => file.status === "ready" || file.status === "uploading"
        )
      ) {
        // 把上传成功的文件同步出去,并且只保留name和url, url替换成外网地址, uid和status在这里无法去除, 因为fileList同步后, el-upload组件又会watch并赋值这两属性, 如果后端要求去除, 则只能在最终表单提交时处理
        this.$emit(
          "update:fileList",
          fileList.reduce((accumulator, file) => {
            if (file.status === "success") {
              if (file.response) {
                accumulator.push({
                  uid: file.uid,
                  name: file.name,
                  url: getObjectItemByPath(
                    file.response,
                    this.resPathOfUrl,
                    file.url
                  )
                });
              } else {
                accumulator.push(file);
              }
            }
            return accumulator;
          }, [])
        );
      }
      this.$emit("success-upload", { response, file, fileList });
      this.$emit("finish-upload");
    },
    removeUpload(file, fileList) {
      this.elFileList = fileList;
      this.$emit("update:fileList", fileList);
      this.$emit("remove-upload", { file, fileList });
    },
    previewUpload(file) {
      window.open(file.url);
    }
  }
};
</script>
