<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fa fa-tachometer-alt text-primary',
            path: '/dashboard'
          }"
        />    

        <sidebar-item :link="{name: 'Users', icon: 'fa fa-users text-blue', path: '/users'}"/>
        <sidebar-item :link="{name: 'Companies', icon: 'ni ni-briefcase-24 text-blue', path: '/companies'}"/>
        <sidebar-item :link="{name: 'Chats', icon: 'fas fa-comments   text-blue', path: '/chats'}"/> 
        <sidebar-item :link="{name: 'Contact us', icon: ' ni ni-notification-70 text-blue', path: '/contactus'}"/>
        <sidebar-item :link="{name: 'Admin Profile', icon: 'ni ni-single-02 text-blue', path: '/profile'}"/>
         
        <!-- <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/> -->
        <!-- <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/> -->
        <!-- <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>  -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
