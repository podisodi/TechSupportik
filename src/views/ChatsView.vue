<template>
  <div class="content">
    <chat-list style="width: 65%;" />
  </div>
</template>

<script>
import ChatList from '@/components/ChatList.vue';

export default {
    name: "ChatsView",
    components: {
        ChatList,
    },
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>