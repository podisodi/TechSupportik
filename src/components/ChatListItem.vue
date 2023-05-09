<template>
    <div style="cursor: pointer" @click="emit('click', $event)">
        <ch-li-it-label style="width: 100%;" :userName="chat.userName" :departament="chat.userDepartment" :status="chat.status" />
        <ch-li-it-box style="width: 100%;" :id="chat.id" :title="chat.problem" :lastMessage="chat.lastMessage" :chosen="chosen" />
    </div>
</template>

<script>
import ChLiItBox from '@/components/ChLiItBox.vue';
import ChLiItLabel from '@/components/ChLiItLabel.vue';

export default {
    name: 'ChatListItem',
    components: {   
        ChLiItBox,
        ChLiItLabel,
    },
    props: {
        chat: {
            id: Number,
            userName: String,
            userDepartment: String,
            status: Number,
            problem: String,
            lastMessage: String,
        },
        chosen: Boolean,
    },
    methods: {
        emit(emitter) {
            this.$emit(emitter);
        }
    }
}
</script>

<style scoped>

</style>