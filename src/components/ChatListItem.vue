<template>
    <div>
        <ch-li-it-label style="width: 100%;" :userName="chat.userName" :departament="chat.userDepartment" :status="chat.status" />
        <ch-li-it-box style="width: 100%;" :title="chat.problem" :lastMessage="chat.lastMessage" />
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
            status: String,
            problem: String,
            lastMessage: String,
        }
    }
}
</script>

<style scoped>

</style>