// plugins/directives.client.js
import { defineNuxtPlugin } from "#app";
import Draggable from "~/directives/v-draggable.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("draggable", Draggable);
});
