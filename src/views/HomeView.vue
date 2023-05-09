<template>
  <div>
    <h3 class="main-title" v-if="!$store.state.isSpecialist"> С чем у вас возникла проблема? </h3>
    <div class="main-container">
      <div class="sub-sontainer" v-if="!$store.state.isSpecialist">
        <beauty-button v-for="problemType in problemTypes"
          class="btn"
          :key="problemType.id"
          look="secondary"
          :text="problemType.name"
          @click="goToProblemChat(problemType.id)"
        />
      </div>
      
      <beauty-button class="btn-half" look="primary" text="Мои обращения" @click="$router.push('/chats')" />
    </div>
  </div>
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';

export default {
  name: 'HomeView',
  components: {
    BeautyButton,
  },
  data() {
    return {
      problemTypes: []
    }
  },
  methods: {
    initProblemTypes() {
      this.$http.get('problems/groups')
      .then((resp) => this.problemTypes = resp.data)
      .catch((err) => console.log(err));
    },
    goToProblemChat(problemId) {
      this.$store.commit('problemGroup', problemId);
      this.$router.push('/chat/0');
    },
  },
  created() {
    this.initProblemTypes();
  },
}
</script>
<style scoped>
.main-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.sub-sontainer {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.main-title{
  text-align: center; 
  padding-top: 35px;
  font-size: 22px;
  color: rgb(84, 10, 47);
}
.btn {
  width: 100%;
  height: 4em;
}

.btn-half {
  width: 50%;
  height: 4em;
}

</style>