import { ElUpload, ElMessage } from "element-plus";
import checkUpload from "@panhezeng/utils/dist/check-upload.js";
import getObjectItemByPath from "@panhezeng/utils/dist/get-object-item-by-path.js";
import { resolveComponent, openBlock, createBlock, withCtx, createElementBlock, createCommentVNode, renderSlot, createElementVNode, createTextVNode } from "vue";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "ElMultipleUpload",
  components: {
    ElUpload
  },
  inheritAttrs: false,
  props: {
    upload: {
      required: true,
      type: Function
    },
    resPathOfUrl: {
      type: String,
      default: "data.url"
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    checkUpload: {
      type: Function,
      default: void 0
    },
    size: {
      type: Number,
      default: void 0
    },
    imageDimensions: {
      validator(value) {
        return /^\[object Object\]$/.test(Object.prototype.toString.call(value)) && Object.prototype.hasOwnProperty.call(value, "width") && Object.prototype.hasOwnProperty.call(value, "height");
      },
      type: Object,
      default() {
        return {
          width: void 0,
          height: void 0
        };
      }
    },
    accept: {
      validator(value) {
        return value === "" || /^(image|audio|video|text|application|\.)/.test(value);
      },
      type: String,
      default: ""
    },
    drag: {
      type: Boolean,
      default: true
    },
    defaultElement: {
      type: Boolean,
      default: true
    },
    onPreview: {
      type: Function,
      default: void 0
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
      this.$emit("file", file);
      this.$emit("before-upload", file);
      if (this.checkUpload) {
        return this.checkUpload(file);
      } else {
        return new Promise((resolve, reject) => {
          checkUpload(file, this.accept, this.size, this.imageDimensions.width, this.imageDimensions.height).then((result) => {
            if (result.validation) {
              resolve();
            } else {
              if (result.message)
                ElMessage.error(result.message);
              this.$emit("validation-error");
              reject();
            }
          });
        });
      }
    },
    requestUpload(option) {
      this.$emit("request-upload", option);
      return this.upload(option);
    },
    successUpload(response, file, fileList) {
      this.elFileList = fileList;
      if (!fileList.some((file2) => file2.status === "ready" || file2.status === "uploading")) {
        this.$emit("update:fileList", fileList.reduce((accumulator, file2) => {
          if (file2.status === "success") {
            if (file2.response) {
              accumulator.push({
                uid: file2.uid,
                name: file2.name,
                url: getObjectItemByPath(file2.response, this.resPathOfUrl, file2.url)
              });
            } else {
              accumulator.push(file2);
            }
          }
          return accumulator;
        }, []));
      }
      this.$emit("success-upload", { response, file, fileList });
      this.$emit("finish-upload");
    },
    beforeRemoveUpload(file, fileList) {
      if (this.$refs.upload) {
        const refUpload = this.$refs.upload;
        const refUploadInner = refUpload.$refs["upload-inner"];
        const reqs = refUploadInner.reqs;
        if (file) {
          let uid = file;
          if (file.uid)
            uid = file.uid;
          if (reqs[uid] && reqs[uid].abort) {
            reqs[uid].abort();
          }
        } else {
          Object.keys(reqs).forEach((uid) => {
            if (reqs[uid] && reqs[uid].abort)
              reqs[uid].abort();
            delete reqs[uid];
          });
        }
        fileList.splice(fileList.indexOf(file), 1);
        this.$refs.upload.onRemove(file, fileList);
      }
      return false;
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
const _hoisted_1 = {
  key: 0,
  class: "el-upload-box",
  style: { "display": "flex", "flex-direction": "column", "justify-content": "center", "align-items": "center", "height": "100%" }
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", {
  class: "el-icon-upload",
  style: { "width": "67px", "height": "67px" }
}, [
  /* @__PURE__ */ createElementVNode("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "data-v-ba633cb8": ""
  }, [
    /* @__PURE__ */ createElementVNode("path", {
      fill: "currentColor",
      d: "M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
    })
  ])
], -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ createTextVNode("\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),
  /* @__PURE__ */ createElementVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")
], -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_upload = resolveComponent("el-upload");
  return openBlock(), createBlock(_component_el_upload, {
    ref: "upload",
    class: "el-multiple-upload",
    action: "",
    "before-upload": $options.beforeUpload,
    "http-request": $options.requestUpload,
    "on-success": $options.successUpload,
    "on-remove": $options.removeUpload,
    "before-remove": $options.beforeRemoveUpload,
    "on-preview": $props.onPreview || $options.previewUpload,
    accept: $props.accept,
    drag: $props.drag,
    multiple: "",
    "file-list": $props.fileList
  }, {
    default: withCtx(() => [
      $props.defaultElement ? (openBlock(), createElementBlock("div", _hoisted_1, _hoisted_4)) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["before-upload", "http-request", "on-success", "on-remove", "before-remove", "on-preview", "accept", "drag", "file-list"]);
}
var _ElMultipleUpload = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const ElMultipleUpload = Object.assign(_ElMultipleUpload, {
  install: (app, options = typeof window !== "undefined" && window.ElMultipleUploadOptions && typeof window.ElMultipleUploadOptions === "object" ? window.ElMultipleUploadOptions : {}) => {
    Object.assign(ElMultipleUpload.props, options);
    app.component(_ElMultipleUpload.name, _ElMultipleUpload);
  }
});
export { ElMultipleUpload as default };
