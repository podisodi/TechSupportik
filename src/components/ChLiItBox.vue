<template>
  <div class="cli-box" :class="{'chosen': chosen}">
    <div class="cli-text">
        <span class="title-problem">{{ title }}: </span><span class="last-message">{{ lastMessage }}</span>
    </div>
    <beauty-button class="btn-chat-list" look="primary" text="Продолжить" @click="goToChat($event, id)" />
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
        chosen: Boolean
    },
    components: {
        BeautyButton,
    },
    methods: {
        goToChat($event, id) {
            $event.stopPropagation();
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
.chosen {
    background-color: rgb(46, 67, 99);
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