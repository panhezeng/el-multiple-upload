<template>
  <h1>上传的mock演示，response永远是一样的数据</h1>
  <el-multiple-upload ref="mUpload" v-model:file-list="data.fileList" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

// import ElMultipleUpload from "@panhezeng/el-multiple-upload";

export default defineComponent({
  name: "App",
  components: {
    // ElMultipleUpload,
  },
  setup() {
    const data = reactive({
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    });

    function upload(option: any) {
      const file = option.file;
      if (Object.prototype.toString.call(file) !== "[object File]") {
        throw new Error("file参数必须为File数据类型");
      }

      return new Promise((resolve) => {
        const success = (res: any) => {
          if (Object.prototype.toString.call(res) !== "[object Object]") {
            res = { Key: file.name };
          }
          // res.url = `http://dummyimage.com/200x100/50B347/FFF&text=${res.Key}`;
          res.url =
            "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
          // console.log("success", res);
          resolve({ data: res });
        };

        setTimeout(success, 300);
      });
    }

    return { data, upload };
  },
});
</script>

<style></style>
