import _ElMultipleUpload from "./ElMultipleUpload.vue";
// 提供 app.use 注册组件方法

const ElMultipleUpload = Object.assign(_ElMultipleUpload, {
  install: (
    app,
    options = typeof window !== "undefined" &&
    window.ElMultipleUploadOptions &&
    typeof window.ElMultipleUploadOptions === "object"
      ? window.ElMultipleUploadOptions
      : {}
  ) => {
    Object.assign(ElMultipleUpload.props, options);
    app.component(_ElMultipleUpload.name, _ElMultipleUpload);
  },
});

export default ElMultipleUpload;
