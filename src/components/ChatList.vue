<template>
  <div class="chats-background">
     <div>
        <h2 class="chats-title"> Мои обращения </h2>
     </div>
     <div class="list-wrapper">
      <chat-list-item v-for="item in chats" :key="item.id" :chat="item" style="margin-top: 30px;" />
     </div>
  </div>
 </template>

<script>
import ChatListItem from './ChatListItem.vue'

export default {
    name: 'ChatList',
    components: {
        ChatListItem,
  },
  data() {
    return {
      chats: [],
    }
  },
  created() {
    this.initChats();
  },
  methods: {
    initChats() {
      this.$http.get('requests/byUser')
        .then((resp) => this.chats = resp.data.map(this.mapChat))
        .catch((err) => console.log(err));
    },
    mapChat(request) {
      const u = request.chat.users.find((u) => u.id != this.$store.state.userId);
      return {
        id: request.chat.id,
        userName: u?.username,
        userDepartment: u?.department.name,
        status: request.state,
        problem: request.problem.name,
        lastMessage: request.chat.lastMessage?.content
      }
    }
  }
}
</script>

<style scoped>
.chats-title{
  text-align: center;
  color: black;

}
.chats-background {
  background-color:rgb(147, 181, 233);
  border-radius: 14px;
  box-shadow: rgba(0,0,0,0.3) 0px 5px 10px 0px;
}

.list-wrapper {
  padding: 20px 35px 20px 35px;
}
</style>