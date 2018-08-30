export const ElMultipleUpload = require('./ElMultipleUpload.vue').default

let Vue

function install (_Vue, options = (typeof window !== 'undefined' && window.ElMultipleUploadOptions)) {

  if (Vue) {
    console.warn('[ElMultipleUpload] already installed. Vue.use(ElMultipleUpload) should be called only once.')
    return
  }

  Vue = _Vue

  if (Object.prototype.toString.call(options) === '[object Object]') {
    if (Object.prototype.toString.call(options.upload) === '[object Function]') {
      Object.assign(ElMultipleUpload.props.upload, {
        required: false,
        default: options.upload
      })
    }
  }

  Vue.component(ElMultipleUpload.name, ElMultipleUpload)
}

/* istanbul ignore next */
ElMultipleUpload.install = install

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


