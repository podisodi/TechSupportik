<template>
<div class="main-wrapper">
    <div>
        <span>Заявка №{{ requestNum }}: </span><span class="txt-left" v-if="userName">{{ userName }},</span><span class="depart-st"> {{ departament }} </span>
    </div>
    <div>
        <span>Статус обращения: </span><span :class="'status status-' + statusEng">{{ statusStr }}</span>
    </div>
</div>
</template>

<script>
import '@/js/request-statuses'
import { statusToString, statusToRusString } from '@/js/request-statuses';

export default {
    name: 'ChatListLabel',
    props: {
        userName: String,
        departament: String,
        status: Number,
        requestNum: Number
    },
    computed: {
        statusEng: function() {
            return statusToString(this.status);
        },
        statusStr: function() {
            return statusToRusString(this.status);
        }
    }
}
</script>

<style scoped>
.main-wrapper {
    display: flex;
    justify-content: space-between;
}
.txt-left{
    color:black;
    font-size: 18px;
    font-style: italic;  
}
.depart-st{
    color: rgb(60, 10, 199);
    font-size: 18px; 
    font-style: italic;
}
.txt-right{
    color:black;
    font-size: 18px; 
    font-style: italic;  
}
.status {
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
}
.status-accept {
    color: rgb(199, 120, 10);
}
.status-complete {
    color: rgb(6, 109, 5);
}
.status-waiting {
    color: rgb(60, 10, 199);
}
.status-decline {
    color: rgb(199, 48, 10);
}
</style>