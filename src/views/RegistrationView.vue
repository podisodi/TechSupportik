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
            if(!this.validate(signData)) {
                return;
            }

            this.$store.commit('loading', true);
            this.$http.post('users/register', {
                name: signData.name,
                surname: signData.surname,
                patronymic: signData.patr,
                email: signData.email,
                password: signData.password,
                avatarId: 1,
                departmentId: 1
            })
                .then((resp) => {
                    this.$store.commit('login', {
                        userId: resp.data.id,
                        userName: resp.data.surname
                            + ' ' + resp.data.name
                            + (!resp.data.patronymic.length ? '' : ' ' + resp.data.patronymic),
                        userAvatar: resp.data.avatar.route
                    });
                    this.$router.push('/');
                })
                .catch((err) => console.log(err))
                .finally(() => this.$store.commit('loading', false));
        },
        validate(signData) {
            let isValid = true;

            if(!signData.name.length) {
                this.nameErrors = [...this.nameErrors, 'Заполните имя'];
                isValid = false;
            }
            
            if(!signData.surname.length) {
                this.surnameErrors = [...this.surnameErrors, 'Заполните фамилию'];
                isValid = false;
            }

            if(!signData.email.length) {
                this.emailErrors = [...this.emailErrors, 'Заполните адрес эл. почты'];
                isValid = false;
            }

            if(!signData.password.length) {
                this.passwordErrors = [...this.passwordErrors, 'Введите пароль'];
                isValid = false;
            }

            if(signData.password !== signData.passwordCheck) {
                this.passwordErrors = [...this.passwordErrors, 'Пароли не совпадают'];
                this.passwordCheckErrors = [...this.passwordCheckErrors, 'Пароли не совпадают'];
                isValid = false;
            }

            return isValid;
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