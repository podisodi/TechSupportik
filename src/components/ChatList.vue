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
      chat: {
        id: 1,
        userName: 'Михал Палыч',
        userDepartment: 'отдел',
        status: 'wait',
        problem: 'принтер сломавсь',
        lastMessage: 'помогите пожождо'
      },
    }
  },
  computed: {
    chats: function() {
        let res = [];
        for(let i = 0; i < 6; i++) {
            let chatClone = {...this.chat};
            chatClone.id = i;
            res.push(chatClone)
        }
      return res;
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