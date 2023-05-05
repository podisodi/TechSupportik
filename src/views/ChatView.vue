<template>
    <div>    
        <vue-advanced-chat
            class="chat-test"
            :current-user-id="$store.state.userId"
            :messages="JSON.stringify(messages)"
            :messages-loaded="msgLoaded"
            :rooms="JSON.stringify([room])"
            :room-info-enabled="false"
            :single-room="true"
            :text-messages="JSON.stringify({LAST_SEEN: 'последний раз был(а) в сети '})"
            show-emojis="false"
            show-audio="false"
            show-reaction-emojis="false"
            :menu-actions="JSON.stringify([
                {name: 'f1', title: 'Убрать уведомления'},
                {name: 'f2', title: 'Пожаловаться на собеседника'}])"
            @send-message="msgSend($event.detail[0])"
            @fetch-messages="fetch()"
            :styles="JSON.stringify({
                header: {
                    background: 'var(--color-info-light)'
                },
                content: {
                    background: 'var(--color-info-semilight)'
                },
                footer: {
                    background: 'var(--color-info-semilight)'
                }
            })"
        />
    </div>

</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';
import {register} from 'vue-advanced-chat';
register();

export default {
    name: "ChatView",
    components: {
        BeautyButton,
    },
    props: {
        id: {
            type: String | Number,
            default: 0
        },
    },
    data() {
        return {
            chatId: this.id,
            curPage: 0,
            messagesPerPage: 20,
            showFooter: false,
            chat: {
                id: 0, 
                users: [],
                messages: []
            },
            room: {
                roomId: '1',
                roomName: '',
                avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png',
                users: []
            },
            messages: [],
            msgLoaded: false,
            problems: [],
            createRequest: false
        }
    },
    created() {
        if (this.id > 0) {
            this.initRoom();
        } else {
            this.startDialog();
        }
    },
    methods: {
        async initRoom() {
            this.chat = await this.getChat();
            if(this.chat == null) return;

            this.room.roomId = this.chat.id;
            this.room.users = this.chat.users.map((user) => {
                return {
                    _id: user.id.toString(),
                    username: user.username,
                    avatar: 'https://myshmarket.site' + user.avatar.route,
                    status: {
                        state: user.isLogged ? 'online' : 'offline',
                        lastChanged: new Date(user.lastLogoutDate).getUTCDate(),
                    }
                }
            });
            this.setRoomName();
        },
        fetch() {
            if(!this.id) {
                setTimeout(() => {
                    this.msgLoaded = true;
                });
            } else {
                this.getMessages();
            }
        },
        msgSend(message) {
            if(this.id > 0) {
                this.newMessage(message.content);
            } else if (this.createRequest) {
                this.addUserMessage(message.content);
                const problemId = Number(message.content);
                if(problemId == NaN) {
                    this.addBotMessage('Пожалуйста, введите цифру из списка');
                    return;
                }

                this.$http.post(`requests?problemId=${problemId}`)
                    .then((resp) => {
                        this.chatId = resp.data.chatId;
                        this.initRoom();
                        this.addBotMessage('Заявка успешно создана! Скоро подключится специалист...');
                    })
                    .catch((err) => console.log(err));
            }
		},
        setRoomName() {
            const user = this.chat.users.find(x => x.id !== this.$store.state.userId);
            if(user) {
                this.room.roomName = user.username;
                this.room.avatar = 'https://myshmarket.site' + user.avatar.route;
            } else {
                this.room.roomName = 'Бот техподдержки';
                this.room.avatar = 'https://myshmarket.site/assets/images/uploaded/image20.png';
            }
            
        },
        async getChat() {
            try {
                return (await this.$http.get('chats/' + this.chatId)).result;
            } catch (err) {
                console.log(err);
                return null;
            }
        },
        async getMessages() {
            const take = this.messagesPerPage;
            const skip = this.curPage * this.messagesPerPage;
            let messages = (await this.$http.get('chats/messages/' + this.chat.id, { params: { take: take, skip: skip } })).result;
            if(!!messages && messages.length) {
                this.messages = [...this.messages, ...messages];
            } else {
                this.msgLoaded = true;
            }
        },
        addBotMessage(content) {
            this.messages = [...this.messages, {
                _id: this.messages.length,
                content: content,
                senderId: 0,
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png'
            }];
        },
        addUserMessage(content) {
            this.messages = [...this.messages, {
                _id: this.messages.length,
                content: content,
                senderId: this.$store.state.userId,
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                avatar: `https://myshmarket.site${this.$store.state.userAvatar}`
            }]
        },
        async startDialog() {
            await this.getProblems();
            let str = 'Вас приветствует бот техподдержки. Пожалуйста, введите цифру проблемы, которая у вас возникла:';
            this.problems.forEach((x, i) => str += `\n${i+1} - ${x.name}`);
            this.addBotMessage(str);
            this.createRequest = true;
        },
        async getProblems() {
            await this.$http.get(`problems/groups/${this.$store.state.problemGroupId}`)
                .then((resp) => this.problems = resp.data)
                .catch((err) => console.log(err));
        },
        newMessage(content) {
            this.$http.post(`chats/messages/new/${this.id}`, {content: content})
            .then((resp) => {
                const msg = resp.data;
                this.messages = [...this.messages, {
                    _id: msg.id,
					content: msg.content,
					senderId: msg.senderId,
					timestamp: msg.timestamp,
					date: msg.date.toString(),
                    username: '',
                    avatar: 'https://myshmarket.site' + msg.avatar.route
                }];
            })
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>

</style>