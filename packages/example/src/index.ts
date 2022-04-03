import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ElMultipleUpload from "@panhezeng/el-multiple-upload";

const app = createApp(App);

app.use(ElementPlus);

app.use(ElMultipleUpload);

app.mount("#app");
