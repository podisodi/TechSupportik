<template>
  <div class="chats-background">
     <div>
        <h3 class="chats-title"> Мои обращения </h3>
     </div>
     <chat-list-item v-for="item in chats" :key="item.id" :chat="item" />
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
        .then((resp) => this.chats = resp.data.map((x) => {
          const user = x.chat.users.find((u) => u.id != this.$store.state.userId);
          return {
            id: x.chatId,
            userName: user.username,
            userDepartment: user.department.name,
            status: x.state,
            problem: x.problem.name,
            lastMessage: x.chat.lastMessage.content
          };
        }))
        .catch((err) => console.log(err));
    }
  }
}
</script>

<style scoped>
.chats-title{
  text-align: center; 
  padding-top: 35px;
  font-size: 22px;
  color: black;

}
.chats-background{
  background-color:rgb(147, 181, 233);
}
</style>