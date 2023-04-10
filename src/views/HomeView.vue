<template>
  <div>
    <h3 class="main-title"> С чем у вас возникла проблема? </h3>
    <div class="main-container">
      <beauty-button class="btn" v-for="(problemType, index) in problemTypes" :key="index" look="secondary" :text="problemType.name" />
      <beauty-button class="btn" look="primary" text="Мои обращения" />
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
      problemType: {
        id: 1,
        name: 'Аппаратное обеспечение'
      },
    }
  },
  computed: {
    problemTypes: function() {
      return [this.problemType, this.problemType, this.problemType, this.problemType];
    }
  }
}
</script>
<style scoped>
.main-container{
  width: 100%;
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
  width: 50%;
  height: 4em;
}

</style>