<template>
    <div>
        <beauty-button look="primary" :text="curUser" @click="changeUser" />
        <vue-advanced-chat
            :current-user-id="curUser"
            :messages="JSON.stringify(messages)"
            :messages-loaded="msgLoaded"
            :rooms="JSON.stringify([room])"
            :room-info-enabled="false"
            :single-room="true"
            :text-messages="JSON.stringify({LAST_SEEN: 'последний раз был(а) на бутылке '})"
            @send-message="msgSend($event.detail[0])"
            @fetch-messages="fetch()"
        />
    </div>

</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';
import {register} from 'vue-advanced-chat';
register();

export default {
    name: "TestView",
    components: {
        BeautyButton,
    },
    data() {
        return {
            curUser: '1',
            room: {
                roomId: '1',
                roomName: '',
                avatar: '',
                users: [
                    {
                        _id: '1',
                        username: 'Михал Палыч Терентьев',
                        avatar: '',
                        status: {
                            state: 'offline',
                            lastChanged: 'вчера'
                        }
                    },
                    {
                        _id: '2',
                        username: 'Наталья Морская Пехота',
                        avatar: '',
                        status: {
                            state: 'online',
                            lastChanged: 'pizda'
                        }
                    },
                ]
            },
            messages: [],
            msgLoaded: false,
        }
    },
    created() {
        this.setRoomName();
    },
    methods: {
        fetch() {
            setTimeout(() => {
                this.messages = [];
                this.msgLoaded = true;
            });
        },
        msgSend(message) {
			this.messages = [
				...this.messages,
				{
					_id: this.messages.length,
					content: message.content,
					senderId: this.curUser,
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				}
			];
		},
        changeUser() {
            this.curUser = this.curUser == '1' ? '2' : '1';
            this.setRoomName();
        },
        setRoomName() {
            this.room.roomName = this.room.users.find(x => x._id !== this.curUser).username;
        }
    }
}
</script>

<style>

</style>