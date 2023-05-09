import draggable from "vuedraggable";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.drag = draggable;
});
