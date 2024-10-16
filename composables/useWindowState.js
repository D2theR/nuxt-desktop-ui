import { ref, onMounted, watch } from "vue";

export function useWindowState() {
  const windows = ref([]);

  // Load saved state from localStorage on mount
  onMounted(() => {
    const savedState = localStorage.getItem("windowState");
    if (savedState) {
      windows.value = JSON.parse(savedState);
    } else {
      // Initialize with default windows if no saved state
      windows.value = [
        {
          id: "window1",
          title: "User Form",
          component: "UserForm",
          position: { x: 100, y: 100 },
          size: { width: 300, height: 200 },
        },
        {
          id: "window2",
          title: "User Data",
          component: "DataTable",
          position: { x: 400, y: 150 },
          size: { width: 300, height: 200 },
        },
        // Add more windows as needed
      ];
    }
  });

  // Watch for changes and save to localStorage
  watch(
    windows,
    (newVal) => {
      localStorage.setItem("windowState", JSON.stringify(newVal));
    },
    { deep: true }
  );

  // Function to update a window's state
  function updateWindow(updatedWindow) {
    const index = windows.value.findIndex((w) => w.id === updatedWindow.id);
    if (index !== -1) {
      windows.value[index] = { ...windows.value[index], ...updatedWindow };
    }
  }

  return { windows, updateWindow };
}
