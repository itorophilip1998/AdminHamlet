<template>
    <nav class="navbar navbar-vertical shadow fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <!-- <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button> -->
            <router-link class="navbar-brand" to="/">
                <!-- <img :src="logo" class="navbar-brand-img" alt="..."> -->
         <h2 ><img src="img/brand/hamlet.png" style="width: 40px;">Hamlet <span class="text-primary">Admin</span>
         </h2>
            </router-link> 
            <slot name="mobile-right">
         <hr class="p-0 m-0">

                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item d-none" position="right">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span style="font-size:20px" class="">
                                <!-- <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg"> -->
                                <i class="fas fa-bars    "></i>
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">MENU</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        
                        <router-link to="/dashboard" class="dropdown-item">
                            <i class="fa fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </router-link>
                        <router-link to="/users" class="dropdown-item">
                            <i class="fa fa-users"></i>
                            <span>All Users</span>
                        </router-link>
                        <router-link to="/activeusers" class="dropdown-item">
                            <i class="fa fa-user-friends"></i>
                            <span>Active Users</span>
                        </router-link>
                        <router-link to="/bannedUsers" class="dropdown-item">
                            <i class="fa fa-user-times"></i>
                            <span>Banned Users</span>
                        </router-link>
                         <router-link to="/companies" class="dropdown-item">
                            <i class="fas fa-briefcase    "></i>
                            <span>Companies</span>
                        </router-link>
                        <router-link to="/chats" class="dropdown-item ">
                            <i class="fas fa-comments"></i>
                            <span>Chats</span>
                        </router-link>
                        <router-link to="/feedback" class="dropdown-item">
                            <i class=" ni ni-notification-70"></i>
                            <span>Contact us</span>
                        </router-link>
                       
                        <div class="dropdown-divider"></div>
                        <button  @click="logout()" class="dropdown-item btn">
                            <i class="ni ni-user-run"></i>
                            <span> Logout</span>
                        </button>
                       
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                 <h2>Hamlet <span class="text-primary">Admin</span></h2>
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3"> 
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <button @click="logout()" class="nav-link btn w-100 m-auto">
                            <i class="ni ni-user-run text-blue"></i> <span class="text-muted">Logout</span>
                        </button>
                    </li>  
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      logout()
      { 
          localStorage.removeItem(this.$token)
             this.$router.push("/login")  
        // this.$http.post(`https://hamlet.payfill.co/api/auth/logout`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
        //        console.log(response)
        //  })  
          // let token =localStorage.getItem(this.$token) 
          //  this.$http.post(`https://hamlet.payfill.co/api/auth/logout`, 
          //  {headers:{'Authorization':`Bearer ${token}`}}).then((response)=> {
          //   localStorage.removeItem(this.$token)
          //    this.$router.push("/login")  
          //  }) 
      },
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
<style scoped>
  .clever{
    display: none !important;
  }
</style>

