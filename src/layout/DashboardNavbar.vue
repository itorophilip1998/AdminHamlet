<template>
    <base-nav   class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <!-- <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div> -->
            <small style="color: lightgrey;">hamlethr2020@gmail.com</small>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item "> 
                    <div class="media align-items-center" slot="title">
                <router-link to="/profile" class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
                </router-link> 
                    </div> 
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    created() {
        this.getProfile();
    },
    methods: {
        getProfile()
        {
         this.$http.get(`${this.$baseApi}/profile`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.profile=response
         })

        },

      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
