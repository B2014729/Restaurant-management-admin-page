<template>
  <div v-if="authToken" class="container-fluid">
    <div class="row mt-2">
      <div class="col-md-2 col-12">
        <Logo></Logo>
        <hr>
        <NavComponent></NavComponent>
      </div>
      <div class="col-md-10 col-12">
        <HeaderComponent></HeaderComponent>
        <hr>
        <router-view style="min-height: 640px ;background-color: #e8e8e8cb;">
        </router-view>
      </div>
    </div>
  </div>
  <div v-else>
    <LoginPage class="w-100" />
  </div>
</template>

<script>
import LoginPage from '@/pages/loginPage.vue';
import Logo from '@/components/logoComponent.vue';
import HeaderComponent from '@/components/headerComponent.vue';
import NavComponent from '@/components/navComponent.vue';


export default {
  name: 'App',
  components: {
    Logo,
    HeaderComponent,
    NavComponent,
    LoginPage
  },

  data() {
    return {
      authToken: true,
    };
  },

  created() {
    if (!this.$cookies.get('jwt')) {
      this.authToken = false;
    } else {
      this.authToken = true;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link-active>li,
.router-link-exact-active>.nav-item {
  background-color: #d6d5d5;
  border-radius: 5px;
  color: black;
}

label::after {
  background-color: rgba(91, 91, 91, 0) !important;
  border-radius: 0 !important;
}
</style>
