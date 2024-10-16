<template>
  <div class="w-screen h-screen bg-blue-600 relative overflow-hidden">
    <component v-for="window in windows" :is="WindowComponent" :key="window.id" :id="window.id" :title="window.title"
      :initialPosition="window.position" :initialSize="window.size" @update="updateWindow">
      <component :is="componentsMap[window.component]" />
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWindowState } from '~/composables/useWindowState';
import WindowComponent from '~/components/Window.vue';
// import UserForm from '~/components/UserForm.vue';
import DataTable from '~/components/DataTable.vue';

const { windows, updateWindow } = useWindowState();

// Map component names to actual components
const componentsMap = {
  // UserForm,
  DataTable,
  // Add other components as needed
};
</script>

<style>
body {
  margin: 0;
}
</style>
