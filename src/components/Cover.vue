<template>
  <div class="cover" v-if="$store.state.isLoading">
    <sync-loader color="white" :loading="true" size="25px" />
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';

export default {
    name: 'CoverComponent',
    components: {
        SyncLoader,
    }
}
</script>

<style scoped>
.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
}
</style>