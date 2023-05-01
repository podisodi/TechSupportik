<template>
    <div class="wrapper">
        <auth-component buttonText="Войти" header="Вход" class="auth" @onSign="login(signData)" />
        <h5>Если у вас ещё нет аккаунта, можете <router-link to="register">зарегистрироваться</router-link></h5>
    </div>
</template>

<script>
import AuthComponent from '@/components/AuthComponent.vue';

export default {
    name: 'LoginView',
    components: {
        AuthComponent,
    },
    methods: {
        login(signData) {
            this.$http.post('users/login?email=' + signData.email + '&password=' + signData.password)
            .then((resp) => this.$store.login(resp.data))
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: calc(100vw - 16px);
    height: calc(100vh - 50px - 4em - 16px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.auth {
    width: 50%;
}
</style>