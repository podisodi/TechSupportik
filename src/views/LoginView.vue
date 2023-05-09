<template>
    <div class="wrapper">
        <auth-component buttonText="Войти" header="Вход" class="auth" @onSign="login" />
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
            this.$store.commit('loading', true);
            this.$http.post('users/login?email=' + signData.email + '&password=' + signData.password)
                .then((resp) => {
                        this.$store.commit('login', {
                        userId: resp.data.id,
                        userName: resp.data.surname
                            + ' ' + resp.data.name
                            + (!resp.data.patronymic.length ? '' : ' ' + resp.data.patronymic),
                        userAvatar: 'https://myshmarket.site' + resp.data.avatar.route,
                        isSpecialist: resp.data.isSpecialist
                    });
                    this.$router.push('/');
                })
                .catch((err) => console.log(err))
                .finally(() => this.$store.commit('loading', false));
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