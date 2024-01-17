<template>
  <div class="alert alert-danger" role="alert">
    您来到了一片不存在的区域 请返回
    <router-link :to="{ name: 'home' }" class="alert-link">首页</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped></style>
