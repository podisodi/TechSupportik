<template>
    <div class="wrapper">
        <auth-component
            buttonText="Зарегистрироваться"
            header="Регистрация"
            class="auth"
            register
            @onSign="register"
            :nameErrors="nameErrors"
            :surnameErrors="surnameErrors"
            :patrErrors="patrErrors"
            :emailErrors="emailErrors"
            :passwordErrors="passwordErrors"
            :passwordCheckErrors="passwordCheckErrors"
            @touch="clearErrors"
        />
    </div>
</template>

<script>
import AuthComponent from '@/components/AuthComponent.vue';

export default {
    name: 'RegistrationView',
    components: {
        AuthComponent,
    },
    data() {
        return {
            nameErrors: [],
            surnameErrors: [],
            patrErrors: [],
            passwordErrors: [],
            passwordCheckErrors: [],
            emailErrors: [],
        }
    },
    methods: {
        register(signData) {
            if(signData.password !== signData.passwordCheck) {
                this.passwordErrors = ['Пароли не совпадают'];
                this.passwordCheckErrors = ['Пароли не совпадают'];
            }
        },
        clearErrors() {
            this.nameErrors = [];
            this.surnameErrors = [];
            this.patrErrors = [];
            this.passwordErrors = [];
            this.passwordCheckErrors = [];
            this.emailErrors = [];
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: calc(100vw - 16px);
    height: calc(100vh - 50px - 4em - 16px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth {
    width: 50%;
}
</style>