<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <!-- 加上.prevent是为了阻止默认的提交行为 -->
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3">
                        <label for="password_confirm" class="form-label">确认密码</label>
                        <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from "../components/ContentBase.vue";
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '../router/index';
import $ from 'jquery';

export default {
    name: "LoginView",
    components: {
        ContentBase
    },

    setup: () => {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let password_confirm = ref('');
        let error_message = ref('');

        const register = () => {
            // 每次登陆之前先清空error_message
            error_message.value = "";

            $.ajax({
                url: 'http://192.168.43.171:8000/register',
                type: "POST",
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: password_confirm.value,
                },
                success: (resp) => {
                    if (resp.result === 'success') {
                        // 此处可以理解为根据../store/username.js中定义的login函数的要求进行传参
                        store.dispatch("login", {
                            username: username.value,
                            password: password.value,
                            success: () => {
                                //如果登陆成功需要进行页面跳转 跳转到好友列表页面
                                //跳转页面的api为router.push
                                router.push({ name: 'home' });
                            },
                            error: () => {
                                //如果登陆失败 更新错误信息
                                error_message.value = "系统异常 请稍后重试";
                            },
                        });
                    } else {
                        error_message.value = resp.result;
                    }
                }
            })
        };

        return {
            username,
            password,
            error_message,
            register,
            password_confirm,
        }
    }
}

</script>

<style scoped>
button {
    width: 100%;
}

.error-message {
    color: red;
}
</style>