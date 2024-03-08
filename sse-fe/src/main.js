import { createApp } from "vue";
import App from "./App.vue";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
VMdPreview.use(vuepressTheme, {
  Prism,
});
const app = createApp(App);

app.use(VMdPreview);

app.use(ArcoVue);

app.mount("#app");
