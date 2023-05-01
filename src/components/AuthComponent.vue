<template>
  <div class="auth-wrapper">
    <Keypress key-event="keyup" :key-code="13" @success="onSign" />
    <div class="auth-header">
        {{ header }}
    </div>
    <div class="auth-body">
        <input v-if="register"
            v-model="signData.surname"
            placeholder="Фамилия"
            v-tooltip.right="{
                content: !!surnameErrors.length ? surnameErrors.join(', ') : null,
                shown: !!surnameErrors.length,
                triggers: [],
            }"
            :class="{ 'input-err': !!surnameErrors.length }"
            @focus="$emit('touch')"
        />
        <input v-if="register"
            v-model="signData.name"
            placeholder="Имя"
            v-tooltip.right="{
                content: !!nameErrors.length ? nameErrors.join(', ') : null,
                shown: !!nameErrors.length,
                triggers: [],
            }"
            :class="{ 'input-err': !!nameErrors.length }"
            @focus="$emit('touch')"
        />
        <input v-if="register"
            v-model="signData.patr"
            placeholder="Отчество"
            v-tooltip.right="{
                content: !!patrErrors.length ? patrErrors.join(', ') : null,
                shown: !!patrErrors.length,
                triggers: [],
            }"
            :class="{ 'input-err': !!patrErrors.length }"
            @focus="$emit('touch')"
        />
        <input
            v-model="signData.email"
            placeholder="Электронная почта"
            v-tooltip.right="{
                content: !!emailErrors.length ? emailErrors.join(', ') : null,
                shown: !!emailErrors.length,
                triggers: [],
            }"
            :class="{ 'input-err': !!emailErrors.length }"
            @focus="$emit('touch')"
        />
        <input
            v-model="signData.password"
            type="password"
            placeholder="Пароль"
            v-tooltip.right="{
                content: !!passwordErrors.length ? passwordErrors.join(', ') : null,
                shown: !!passwordErrors.length,
                triggers: [],
            }"
            :class="{ 'input-err': !!passwordErrors.length }"
            @focus="$emit('touch')"
        />
        <input v-if="register"
            v-model="signData.passwordCheck"
            type="password"
            placeholder="Повторите пароль"
            v-tooltip.right="{
                content: !!passwordCheckErrors.length ? passwordCheckErrors.join(', ') : null,
                shown: !!passwordCheckErrors.length,
                triggers: [],
            }"
            :class="{ 'input-err': !!passwordCheckErrors.length }"
            @focus="$emit('touch')"
        />
        
        <div style="height: 4em; width: 50%;">
            <beauty-button
                look="primary"
                :text="buttonText"
                @click="onSign"
                style="width: 100%;"
            />
        </div>
    </div>
  </div>
</template>

<script>
import BeautyButton from './BeautyButton.vue';
import Keypress from 'vue-keypress';

export default {
    name: "AuthComponent",
    components: {
        BeautyButton,
        Keypress,
    },
    props: {
        header: String,
        buttonText: String,
        register: Boolean,

        nameErrors: {
            type: Array,
            default: () => [],
            required: false
        },
        surnameErrors: {
            type: Array,
            default: () => [],
            required: false
        },
        patrErrors: {
            type: Array,
            default: () => [],
            required: false
        },
        emailErrors: {
            type: Array,
            default: () => [],
            required: false
        },
        passwordErrors: {
            type: Array,
            default: () => [],
            required: false
        },
        passwordCheckErrors: {
            type: Array,
            default: () => [],
            required: false
        },
    },
    data() {
        return {
            signData: {
                email: '',
                password: '',
                passwordCheck: '',
                name: '',
                surname: '',
                patr: '',
            }
        }
    },
    methods: {
        onSign() {
            this.$emit('touch');
            this.$emit('onSign', this.signData);
        }
    }
}
</script>

<style>
.auth-wrapper {
    background-color: var(--color-info-semilight);
    border-radius: 14px;
    padding-bottom: 30px;
}

.auth-header {
    background-color: var(--color-info-light);
    box-shadow: rgba(0,0,0,0.3) 0px 5px 10px 0px;
    padding: 10px 0 10px 0;
    font-weight: bold;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
}

.auth-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    gap: 15px;
    box-sizing: border-box;
}

.auth-body > input {
    width: 70%;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    padding: 1em 10px 1em 10px;
    transition: .3s;
    border: 1px solid rgba(100, 100, 100, 0);
}

.auth-body > input:focus {
    outline: none;
    border: 1px solid rgba(100, 100, 100, 1);
}

.v-popper__inner {
    background: #af0000 !important;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.input-err {
    border: 1px solid red !important;
}
</style>