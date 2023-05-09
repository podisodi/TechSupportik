<template>
  <div class="chats-background">
    <div>
      <h2 class="chats-title"> Мои обращения </h2>
    </div>
    <div v-if="$store.state.isSpecialist && chats.some((x) => x.chosen)" class="set-status-btns">
      <span>Установить статус:</span>
      <beauty-button class="status-btn" look="primary" text="Начато" @click="setStatuses(1)" />
      <beauty-button class="status-btn" look="primary" text="Ждет решения" @click="setStatuses(2)" />
      <beauty-button class="status-btn" look="primary" text="Завершено" @click="setStatuses(3)" />
      <beauty-button class="status-btn" look="primary" text="Отклонено" @click="setStatuses(4)" /> 
    </div>
    <div class="list-wrapper">
      <chat-list-item v-for="(item, index) in chats"
        :key="item.id"
        :chat="item"
        :chosen="item.chosen"
        style="margin-top: 30px;"
        @click="chooseChat(index)"
      />
    </div>
  </div>
 </template>

<script>
import ChatListItem from './ChatListItem.vue';
import BeautyButton from './BeautyButton.vue';

export default {
  name: 'ChatList',
  components: {
    ChatListItem,
    BeautyButton,
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
        lastMessage: request.chat.lastMessage?.content,
        chosen: false,
        requestId: request.id
      }
    },
    chooseChat(i) {
      this.chats[i].chosen = !this.chats[i].chosen;
    },
    setStatuses(newStatus) {
      this.$http.put('requests/statuses?newStatus=' + newStatus, this.chats.filter((x) => x.chosen).map((x) => x.requestId))
      .then(() => this.initChats())
      .catch((err) => console.log(err));
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

.set-status-btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.status-btn {
  font-size: 14px;
}
</style>