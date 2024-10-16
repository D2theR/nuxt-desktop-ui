// directives/v-draggable.js
export default {
  mounted(el) {
    el.style.position = "absolute";
    el.style.cursor = "move";

    el.addEventListener("mousedown", (e) => {
      const offsetX = e.clientX - el.offsetLeft;
      const offsetY = e.clientY - el.offsetTop;

      function onMouseMove(e) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }

      document.addEventListener("mousemove", onMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
      );
    });
  },
};
