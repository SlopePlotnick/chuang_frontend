<template>
  <NavBar></NavBar>
  <router-view :key="$route.fullPath" />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from './components/NavBar.vue';

export default {
  name: "App",
  components: {
    NavBar,
  }
}
</script>

<style></style>
