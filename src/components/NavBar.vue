<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <!-- container-fluid表示字体更靠近左右 去掉-fluid表示靠近中间一些 -->
    <div class="container">
      <!-- router-link标签是vue中与a类似的标签
其作用是在跳转页面时直接在前端渲染 而不需要在后端请求数据
通过:to绑定to属性 然后在大括号内(注意大括号用引号包含)写入name参数即可绑定页面
name取值貌似可以用单引号或双引号包含字符串
注意name的取值要与路由中的定义一致 -->
      <router-link
        v-if="!$store.state.user.is_login"
        class="navbar-brand"
        :to="{ name: 'userprofile' }"
        >知识库管理
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              v-if="!$store.state.user.is_login"
              class="nav-link"
              :to="{ name: 'home' }"
              >首页
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              v-if="!$store.state.user.is_login"
              class="nav-link"
              :to="{ name: 'addfile' }"
              >ai辅助分类
            </router-link>
          </li>
        </ul>
        <!-- 若未登录 展示登陆和注册 反之展示用户信息 -->
        <!-- 在html中访问store中的信息用$符号 -->
        <ul class="navbar-nav" v-if="!$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }"
              >登陆
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }"
              >注册
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'userprofile' }"
              >{{ $store.state.user.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div
    class="progress"
    role="progressbar"
    aria-label="Basic example"
    aria-valuenow="100"
    aria-valuemin="0"
    aria-valuemax="100"
    style="height: 5px; border-radius: 0"
  >
    <div class="progress-bar" style="width: 100%; height: 5px"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "NavBar",
  setup: () => {
    const store = useStore();
    const logout = () => {
      //调用actions中的api用dispatch 调用mutations中的api用commit
      store.commit("logout");
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped></style>
