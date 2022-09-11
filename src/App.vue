<template>
  <el-container>
    <el-header>
      <TheNavBar />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';
export default {
  name: 'App',
  components: {
    TheNavBar,
  },
};
</script>

<style></style>