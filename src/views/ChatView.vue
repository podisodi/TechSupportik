<template>
    <div>    
        <vue-advanced-chat v-if="isLoaded"
            class="chat-test"
            :current-user-id="$store.state.userId.toString()"
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
            @delete-message="msgDel($event.detail[0].message)"
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
import { append, appendFront } from '@/js/append';
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
            isLoaded: false,
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
            isGotMessages: false,
            maxMsgId: 0,
            msgLoaded: false,
            problems: [],
            createRequest: false,
            request: null,
            hasSolverMessages: false,
        }
    },
    created() {
        this.initRoom();
    },
    methods: {
        async initRoom() {
            this.chat = await this.getChat();
            if(!this.chat) {
                this.room.users = [
                    {
                        _id: '0',
                        username: 'Бот техподдержки',
                        avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png',
                        status: {
                            state: 'online'
                        }
                    },
                    {
                        _id: this.$store.state.userId.toString(),
                        username: this.$store.state.userName,
                        avatar: this.$store.state.userAvatar,
                        status: {
                            state: 'online'
                        }
                    }
                ];

                this.startDialog();
            } else {
                this.room.roomId = this.chat.id.toString();
                this.room.users = this.chat.users.map((user) => {
                    return {
                        _id: user.id.toString(),
                        username: user.username,
                        avatar: 'https://myshmarket.site' + user.avatar.route,
                        status: {
                            state: user.isLogged ? 'online' : 'offline',
                            lastChanged: new Date(user.lastLogoutDate).toLocaleString('ru-RU'),
                        }
                    }
                });
                await this.initRequest();
            }
            
            this.setRoomName();
            this.isLoaded = true;
        },
        initRequest() {
            this.$http.get('requests/byChat/' + this.chatId)
            .then((resp) => this.request = resp.data)
            .catch((err) => console.log(err));

            this.$http.get('chats/solverWrote/' + this.chatId)
            .then((resp) => this.hasSolverMessages = resp.data)
            .catch((err) => console.log(err));
        },
        fetch() {
            if(this.id == 0 || this.id == '0') {
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
                const problemIndex = Number(message.content);
                if(
                    problemIndex == NaN
                    || problemIndex > this.problems.length
                ) {
                    this.addBotMessage('Пожалуйста, введите цифру из списка');
                    return;
                }
                const problemId = this.problems[problemIndex - 1].id;

                this.$http.post(`requests?problemId=${problemId}`)
                    .then((resp) => {
                        this.chatId = resp.data.chatId;
                        this.initRoom();
                        this.addBotMessage('Заявка успешно создана! Скоро подключится специалист...');
                    })
                    .catch((err) => console.log(err));
            }
		},
        msgDel(message) {
            if(this.id <= 0) return;

            this.$http.delete('chats/messages/' + message._id)
            .then(() => this.messages = this.messages.filter((x) => x._id != message._id))
            .catch((err) => console.log(err));
        },
        setRoomName() {
            const user = this.room.users.find(x => x._id != this.$store.state.userId);
            if(user) {
                this.room.roomName = user.username;
                this.room.avatar = user.avatar;
            } else {
                this.room.roomName = 'Бот техподдержки';
                this.room.avatar = 'https://myshmarket.site/assets/images/uploaded/image20.png';
            }
        },
        async getChat() {
            try {
                const res = await this.$http.get('chats/' + this.chatId);
                return res.data;
            } catch (err) {
                console.log(err);
                return null;
            }
        },
        async getMessages() {
            this.msgLoaded = false;
            const take = this.messagesPerPage;
            const skip = this.curPage * this.messagesPerPage;
            let messages = (await this.$http.get(
                'chats/messages/' + this.chat.id, { params: { take: take, skip: skip } })).data
                .map(this.mapMessage);
            if(messages && messages.length) {
                messages.forEach((x) => {
                    if(this.maxMsgId < x._id) this.maxMsgId = x._id;
                });
                this.messages = appendFront(this.messages, messages);
                this.curPage++;
            }

            if(!messages || messages.length < take) {
                this.msgLoaded = true;
            }

            if (!this.isGotMessages) setTimeout(() => this.checkMessages(), 10000);
            this.isGotMessages = true;
        },
        addBotMessage(content) {
            this.messages = append(this.messages, {
                _id: this.messages.length,
                content: content,
                senderId: '0',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                avatar: 'https://myshmarket.site/assets/images/uploaded/image20.png'
            });
        },
        addUserMessage(content) {
            this.messages = append(this.messages, {
                _id: this.messages.length,
                content: content,
                senderId: this.$store.state.userId.toString(),
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                avatar: this.$store.state.userAvatar
            });
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
            this.$http.post(`chats/messages/new/${this.id}`, JSON.stringify(content))
            .then((resp) => {
                const msg = resp.data;
                if(msg.id > this.maxMsgId) this.maxMsgId = msg.id;
                this.messages = append(this.messages, this.mapMessage(msg));
                if(!this.hasSolverMessages && this.request.state == 1 && this.isSolverMessage(msg)) {
                    this.$http.put('requests/status/' + this.request.id + '?newStatus=2')
                    .then((resp) => this.request.state = resp.data.state)
                    .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
        },
        mapMessage(msg) {
            return {
                    _id: msg.id.toString(),
					content: msg.content,
					senderId: msg.senderId.toString(),
					timestamp: msg.timestamp,
					date: (new Date(msg.date)).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                    username: '',
                    avatar: 'https://myshmarket.site' + msg.avatar.route
            }
        },
        async checkMessages() {
            if(this.chat.id <= 0) return;

            try {
                let messages = (await this.$http.get(
                    'chats/messages/' + this.chat.id, { params: { take: 10, skip: 0 } })).data
                    .map(this.mapMessage);
                
                let msgToAdd = messages.filter((x) => x._id > this.maxMsgId);
                if(msgToAdd.length > 0) {
                    this.messages = append(this.messages, msgToAdd);
                    msgToAdd.forEach((x) => {
                        if(this.maxMsgId < x._id) this.maxMsgId = x._id;
                    });
                };

                setTimeout(() => this.checkMessages(), 10000);
            }
            catch (err) {
                console.log(err);
            }
        },
        isSolverMessage(msg) {
            let senderId = msg.senderId;
            if(senderId instanceof String) {
                senderId = Number(senderId);
            }

            const u = this.chat.users.find((x) => x.id == senderId);
            return u && u.isSpecialist;
        }
    }
}
</script>