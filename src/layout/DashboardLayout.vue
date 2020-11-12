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

        <sidebar-item :link="{name: 'All Users', icon: 'fa fa-users text-blue', path: '/users'}"/>
        <sidebar-item :link="{name: 'Active Users', icon: 'fa fa-user-friends text-blue', path: '/activeusers'}"/>
        <sidebar-item :link="{name: 'Banned Users', icon: 'fa fa-user-times text-blue', path: '/bannedUsers'}"/>
        <sidebar-item :link="{name: 'Companies', icon: 'ni ni-briefcase-24 text-blue', path: '/companies'}"/>
        <sidebar-item :link="{name: 'Chats', icon: 'fas fa-comments   text-blue', path: '/chats'}"/> 
        <sidebar-item :link="{name: 'Contact us', icon: ' ni ni-notification-70 text-blue', path: '/contactus'}"/>
        <sidebar-item :link="{name: 'Send Notifications', icon: 'fa fa-bell text-blue', path: '/notifications'}"/>        
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
<style lang="scss" scoped>
  sidebar-item:hover{
    color:red !important;

  }
</style>
