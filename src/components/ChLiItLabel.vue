<template>
<div class="main-wrapper">
    <div>
        <span class="txt-left">{{ userName }}</span>,<span class="depart-st"> {{ departament }} </span>
    </div>
    <div>
        <span>Статус обращения: </span><span :class="'status status-' + status">{{ statusStr }}</span>
    </div>
</div>
</template>

<script>
import '@/js/request-statuses'
import { statusToRusString } from '@/js/request-statuses';

export default {
    name: 'ChatListLabel',
    props: {
        userName: String,
        departament: String,
        status: Number,
    },
    computed: {
        statusStr: function() {
            return statusToRusString(status);
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
.status-start{
    color: rgb(199, 120, 10);
}
.status-finish{
    color: rgb(13, 199, 10);
}
.status-wait{
    color: rgb(60, 10, 199);
}
.status-reject{
    color: rgb(199, 48, 10);
}
</style>