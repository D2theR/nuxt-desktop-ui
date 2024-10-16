<!-- components/Window.vue -->
<template>
    <div class="absolute bg-white rounded shadow-lg overflow-hidden" :style="windowStyle" @mousedown="bringToFront">
        <!-- Window Header (Drag Handle) -->
        <div class="bg-gray-200 p-2 cursor-move flex justify-between items-center" @mousedown.stop="initDrag">
            <h3 class="text-sm font-bold">{{ title }}</h3>
            <button @click.stop="closeWindow" class="text-sm">X</button>
        </div>
        <!-- Window Content -->
        <div class="window-content relative overflow-auto" :style="contentStyle">
            <slot></slot>
        </div>
        <!-- Resize Handle (Bottom Right Corner) -->
        <div class="resize-handle resize-handle-bottom-right"
            @mousedown.stop.prevent="initResize($event, 'bottom-right')"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useZIndex } from '~/composables/useZIndex';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Window Title',
    },
    initialPosition: {
        type: Object,
        default: () => ({ x: 100, y: 100 }),
    },
    initialSize: {
        type: Object,
        default: () => ({ width: 300, height: 200 }),
    },
});

const emits = defineEmits(['update', 'close']);

const { zIndex, bringToFront } = useZIndex();

const width = ref(props.initialSize.width);
const height = ref(props.initialSize.height);
const position = ref({ ...props.initialPosition });

const windowStyle = computed(() => ({
    width: `${width.value}px`,
    height: `${height.value}px`,
    zIndex: zIndex.value,
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
}));

const headerHeight = 40; // Adjust according to your header's actual height
const resizeHandleHeight = 16; // Height of the resize handle
const contentStyle = computed(() => ({
    height: `${height.value - headerHeight}px`,
    paddingBottom: `${resizeHandleHeight}px`, // To prevent content from overlapping the resize handle
}));

// Dragging Logic
let dragging = false;
let dragOffset = { x: 0, y: 0 };

function initDrag(event) {
    if (resizing) return; // Prevent dragging while resizing
    dragging = true;
    dragOffset.x = event.clientX - position.value.x;
    dragOffset.y = event.clientY - position.value.y;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
}

function onDrag(event) {
    if (!dragging) return;

    position.value.x = event.clientX - dragOffset.x;
    position.value.y = event.clientY - dragOffset.y;
}

function stopDrag() {
    dragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}

// Resizing Logic
let resizing = false;
let resizeDirection = '';

function initResize(event, direction) {
    resizing = true;
    resizeDirection = direction;

    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', stopResize);
}

function onResize(event) {
    if (!resizing) return;

    const deltaX = event.movementX;
    const deltaY = event.movementY;

    if (resizeDirection === 'bottom-right') {
        width.value += deltaX;
        height.value += deltaY;
    }

    // Ensure minimum size
    if (width.value < 200) width.value = 200;
    if (height.value < 100) height.value = 100;
}

function stopResize() {
    resizing = false;
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', stopResize);
}

// Watch for changes and emit updates
watch(
    [width, height, position],
    () => {
        emits('update', {
            id: props.id,
            position: position.value,
            size: { width: width.value, height: height.value },
        });
    },
    { deep: true }
);

// Close window
function closeWindow() {
    emits('close', props.id);
}
</script>

<style scoped>
.resize-handle {
    position: absolute;
    width: 16px;
    height: 16px;
    background: transparent;
    z-index: 10;
}

.resize-handle-bottom-right {
    right: 0;
    bottom: 0;
    cursor: nwse-resize;
}

.window-content {
    overflow: auto;
    padding: 8px;
}
</style>
