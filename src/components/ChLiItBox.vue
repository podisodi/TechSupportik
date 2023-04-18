<template>
  <div class="cli-box">
    <div class="cli-text">
        <span class="title-problem">{{ title }}: </span><span class="last-message">{{ lastMessage }}</span>
    </div>
    <beauty-button class="btn-chat-list" look="primary" text="Продолжить" />
  </div>
</template>

<script>
import BeautyButton from './BeautyButton.vue';

export default {
    name: 'ChatListBox',
    props: {
        title: String,
        lastMessage: String,
    },
    components: {
        BeautyButton,
    }
}

</script>

<style scoped>
.cli-box{
    background-color: rgb(114, 149, 202);
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
}
.cli-text {
    white-space: nowrap;
    overflow: hidden;
    max-width: 65%;
    text-overflow: ellipsis;
}
.btn-chat-list {
  width: 17%;
  height: 2.45em;
}
.title-problem{
    color: black;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
}
.last-message{
    color: black;
    font-size: 18px; 
    text-align: left;
}
</style>