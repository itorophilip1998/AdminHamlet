<template>
       <div >
<!-- navbar -->
<nav class="navbar  navbar-expand-md navbar-light shadow border p-2 w-100">
  <div class="container-fluid">
    <a class="navbar-brand " href="#"> <img src="img/brand/hamlet.png" style="width: 40px;"> <b>Hamlet<span class="text-primary">Admin</span></b></a>
  <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item mx-1">
                <a class="btn shadow btn-sm btn-primary" href="https://hamlethr.netlify.app/signin">Login</a>
            </li>
            <li class="nav-item mx-1">
                <a class="btn shadow  btn-sm border-primary text-primary" href="https://hamlethr.netlify.app/signup">Signup</a>
            </li>
        </ul>
            
  </div>
    </div>
</nav> 



<div class="row  m-0 ">
  <div class="col-md-6 pt-5">
  
          <div class="row justify-content-center">
            <div class="col-sm-10">
                <div class="card bg-white border-0 ">
                 
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center  mb-4">
                            <h1 class="text-primary">Sign in</h1>
                            <hr class="m-1 p-0">
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative shadow mb-4 border"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83 text-primary"
                                        v-model="model.email">
                            </base-input>
                            <base-input class="input-group-alternative shadow border"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open text-primary"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                              
                                  <div v-if="loader" class="text-center pt-5" id="overlay">
                                    <i style="z-index: 2;"  class="fas my-3 fa-spinner fa-5x text-white fa-pulse"></i> <br>
                                            <h1 class="text-white">Loading <span class="text-danger">.</span><span class="text-info">.</span><span class="text-warning">.</span></h1>
                                  </div>

                                <base-button  type="primary" @click="login()" class="my-4 w-100 shadow p-2">Login</base-button>


                            </div>
                        </form>
                         <div class="col-12">
                        <a href="#" class="text-primary"><small>Forgot password?</small></a>
                    </div>
                    
                    </div>
                </div>
                
            </div>
            <div class="col-12 text-center shadow border  p-3 py-5 shadow" style="background: whitesmoke;">
              <a href="https://hamlethr.netlify.app" class="text-muted"><span class="text-primary d-block"><b>Hamlet</b></span> Copyright © 2020 Hamlet. All Rights Reserved</a>
            </div>
        </div>
  </div>
  <div class="col-md-6 d-none d-md-block bg-image w-100">
    <div class="overlay ">
       <h1 class="welcomeTxt text-center py-3 mt-5"><i class="fa fa-user" aria-hidden="true"></i> Welcome Back! 
       </h1>
       
    </div>
  </div>
</div> 
<FlashMessage :position="'right bottom'"></FlashMessage>

       </div>
</template>
<script> 
// import Swal from 'sweetalert2'
  export default { 
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        },
        loader:false
      }
    },
    computed: {
   
    }, 
    mounted() {  

    },

    methods: {
      status(){
      if(!navigator.onLine){
        this.loader=false 
        this.flashMessage.show({
        status: 'warning', 
        html: '<span class="p-2 " style="border-left:5px solid grey">Failed to access server,No internet Connection!</span>', 
        time: 1800,
    });
 } 
    },
        login()
        {  
           this.loader=true 
            this.status() 
           this.$http.post(`${this.$baseApi}/login`, this.model).then((response)=> {
            this.loader=false
            //    manipulate secured token

             localStorage.setItem(this.$token, response.data.token);   
            this.$router.push("/dashboard")
           }).catch((error)=>{
            this.loader=false
                  if(error.response.status===401){
                      this.flashMessage.show({
                        status: 'error', 
                         html: '<span class="p-2 " style="border-left:5px solid grey">Incorrect Credentials(Password or Email)</span>', 
                        time: 1800,
                    });
                          
                  }else{
                    this.loader=false
                        this.flashMessage.show({
                          status: 'warning', 
                          html: '<span class="p-2 " style="border-left:5px solid grey">Oh, you broke my heart! Shame on you!</span>', 
                          time: 1800,
                      }); 
               }
           

           }) 
        }
    },
  }
</script>

<style lang="scss" scoped>
  body{
   background-image: url(../assets/images/bg4.jpg) !important;
   background-size:cover
  }

</style>
