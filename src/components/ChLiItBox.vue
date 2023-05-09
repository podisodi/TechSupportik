<template>
  <div class="cli-box">
    <div class="cli-text">
        <span class="title-problem">{{ title }}: </span><span class="last-message">{{ lastMessage }}</span>
    </div>
    <beauty-button class="btn-chat-list" look="primary" text="Продолжить" @click="goToChat(id)" />
  </div>
</template>

<script>
import BeautyButton from './BeautyButton.vue';

export default {
    name: 'ChatListBox',
    props: {
        id: Number,
        title: String,
        lastMessage: String,
    },
    components: {
        BeautyButton,
    },
    methods: {
        goToChat(id) {
            this.$router.push('/chat/' + id);
        }
    }
}

</script>

<style scoped>
.cli-box{
    background-color: rgb(114, 149, 202);
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    height: 4em;
}
.cli-text {
    white-space: nowrap;
    overflow: hidden;
    max-width: 80%;
    text-overflow: ellipsis;
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