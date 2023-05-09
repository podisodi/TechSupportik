<template>
  <div :class="'btn btn-primary btn-' + look + (disabled ? ' disabled btn-' + look + '-disabled' : '')" v-on:click="$emit('click')" >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "BeautyButton",
  props: {
    text: String,
    look: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.btn {
  padding: 10px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none !important;
  color: black;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: fit-content;
  user-select: none;
  border: none;
}

.btn-primary {
  background: linear-gradient(to bottom left, #3ae93a, #028d47);
}

.btn-primary:hover {
  background: linear-gradient(to top right, #238823, #015a2e);
}

.btn-primary:active {
  background: #3caa3c;
  padding: 8px;
  font-size: 0.99em;
  color: #252531;
}

.btn-secondary {
  background: linear-gradient(to top right, #ff0000, #f8b706);
}

.btn-secondary:hover {
  background: linear-gradient(to top right, #b40c0c, #fda744);
}

.btn-secondary:active {
  background: #ff4500;
  padding: 8px;
  font-size: 0.99em;
  color: #252531;
}

.btn-warning {
  background: linear-gradient(to top right, #ff0000, #fd6428);
}

.btn-warning:hover {
  background: linear-gradient(to top right, #c21919, #d11b14);
}

.btn-warning:active {
  background: #ff0000;
  padding: 8px;
  font-size: 19px;
  color: #252531;
}

.disabled {
  user-select: none;
  color: #3b3b3b;
  pointer-events: none;
}

.btn-primary-disabled {
  background: linear-gradient(to bottom left, #ace9ac, #2e8a5c);
}

.btn-secondary-disabled {
  background: linear-gradient(to top right, #fd7171, #eecc6e);
}

.btn-warning-disabled {
  background: linear-gradient(to top right, #fd6c6c, #f5a687);;
}
</style>
