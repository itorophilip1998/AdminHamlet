<template>
       <div >
<!-- navbar -->

<nav class="navbar  navbar-expand-md navbar-light shadow border p-2 w-100">
  <div class="container-fluid">
    <a class="navbar-brand " href="#"> <img src="img/brand/hamlet.png" style="width: 40px;"> <b>Hamlet<span class="text-primary">Admin</span></b></a>
  
  <div class="navbar-collapse d-md-block d-none" id="collapsibleNavId"> 
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item mx-1">
                <a class="btn shadow btn-sm btn-primary" href="/login">Login</a>
            </li>
            <li class="nav-item mx-1">
                <a class="btn shadow  btn-sm border-primary text-primary" href="https://hamlethr.netlify.app/signup">Signup</a>
            </li>
        </ul>
            
  </div>

  <!-- mobile view -->
   <button v-if="!sidebar"  @click="sidebar=!sidebar" style="cursor:pointer !important;font-size:22px !important;"    class="btn fas fa-bars border-0 d-md-none shadow-none p-1 px-2" > 
  </button> 
  
    </div>
</nav> 

<!-- sidebar panel -->
<div v-if="sidebar" class=" d-md-none d-block"  @click="sidebar=!sidebar"  id="overlay" style="z-index: 2 !important;"></div>
  <div v-if="sidebar" class="sidebar d-md-none d-block"> 

  <div class="mt-4">
    <a  class=" p-2 " href="#"> <img src="img/brand/hamlet.png" style="width: 40px;"> <b>Hamlet<span class="text-primary">Admin</span></b></a>
    <span @click="sidebar=!sidebar" class="fa-x float-right  pr-2"  style="cursor:pointer;font-size: 20px;" title="close"><i class="fas fa-times    "></i></span>
  </div>
 
  <hr class="m-0 p-0 mt-3">
          <ul class="navbar-nav mt-3">
            <li class="nav-item mx-1 d-block">
                <router-link class="btn shadow btn-sm w-100 btn-primary" to="/login">Login</router-link>
            </li>
            <li class="nav-item mx-1 d-block mt-2">
                <a class="btn shadow w-100 btn-sm border-primary text-primary" href="https://hamlethr.netlify.app/signup">Signup</a>
            </li>
            <li class="nav-item text-center mx-1 d-block mt-5">
            <hr>

             <small> <a href="https://hamlethr.netlify.app" class="text-muted"><span class="text-primary d-block"><b>Hamlet</b></span></a> Copyright © 2020 Hamlet. All Rights Reserved</small>
                
            </li>
        </ul>
     
  </div>


<div class="row  m-0 app">
  <div class="col-md-6 pt-5">
  
          <div class="row justify-content-center">
            <div class="col-sm-10 ">
                <div class="card bg-white border-0 ">
                 
                    <div class="card-body px-lg-5 px-0 py-lg-5">
                        <div class="text-center  mb-4">
                            <h1 class="text-primary d-none d-md-block">Sign in</h1>
                            <h1 class="text-primary d-block d-md-none">Welcome Back!</h1>
                            <hr class="m-1 p-0">
                        </div>
                        <!-- Unautorized -->
                        <div v-if="Error401" class="alert alert-danger alert-dismissible fade show" role="alert">
                          <button type="button" class="close" @click="Error401=!Error401" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                          </button>
                          <strong >Error!</strong> Incorrect Credentials
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative text shadow mb-4 border"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83 text-primary"
                                        v-model="model.email"
                                        type="email"
                                         >
                            </base-input>
                            
                            <base-input class="input-group-alternative text shadow border"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open text-primary"
                                        v-model="model.password" id="password">
                            </base-input>
                            <a v-if="!check" @click="checkIn()" class="fa fa-eye text-primary checks"></a>
                            <a v-if="check" @click="checkOut()" class="fa fa-eye-slash text-danger checks"></a>
                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            
                            <div class="text-center"> 
                              <!-- loader -->
                                  <div v-if="loader" class="text-center pt-5" id="overlay">
                                    <i style="z-index: 2;"  class="fas my-3 fa-spinner fa-5x text-white fa-pulse"></i> <br>
                                            <h1 class="text-white">Loading <span class="text-danger">.</span><span class="text-info">.</span><span class="text-warning">.</span></h1>
                                  </div>

                                <base-button v-if="model.email !='' && model.password !=''"  type="primary" @click="login()" class="my-4 w-100 shadow p-2" >Login</base-button>
                             <button v-if="model.email =='' || model.password ==''"  type="primary"  class="my-4 btn btn-primary w-100 shadow p-2 disabled"  disabled="true" style="cursor:not-allowed;opacity:60% !important">Login</button>

                            </div>
                        </form>
                         <div class="col-12">
                        <a href="#" class="text-primary"><small>Forgot password?</small></a>
                    </div>
                    
                    </div>
                </div>
                
            </div>
            <div class="col-12  text-center shadow border  p-3 py-5 shadow" style="background: whitesmoke;">
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
<FlashMessage :position="'right top'"></FlashMessage>  
<script   type="application/javascript" src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script   type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script  type="application/javascript"  src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

       </div>
</template>
<script>   

  export default { 
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        },
        loader:false,
        check:false,
        Error401:false,
         sidebar:false
      }
    },
    components: {
   
    }, 
    mounted() {  
      
    },
    computed: {
      
    },

    methods: {
      checkIn(){ 
         var x = document.getElementById("password"); 
          x.type = "text"; 
        this.check=!this.check  
       
      },
      checkOut(){ 
         var x = document.getElementById("password"); 
          x.type = "password"; 
         this.check=!this.check  
     

      },
      status(){
      if(!navigator.onLine){
        this.loader=false 
        this.flashMessage.show({
        status: 'warning', 
        html: '<span class="p-2" style="border-left:5px solid grey">Failed to access server,No internet Connection!</span>', 
        time: 2000,
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
                      this.Error401=true      
                  }else{
                    this.loader=false
                        this.flashMessage.show({
                          status: 'warning', 
                          html: '<span class="p-2 " style="border-left:5px solid grey">Something went wrong, please try again later!</span>', 
                          time: 2000,
                      }); 
               }
             
           })  
         
            
        }
    },
  }
</script>


<style lang="scss" scoped>
  
  .app{ 
   background-image: url(../assets/images/bg4.jpg) !important;
   /* background-size:cover */
   
  }
  .checks
  {
    cursor: pointer;
    position:relative;
    left:90%;
    top:-55px; 
    /* z-index: 1 !important; */
  }
  .fa-bars:hover, .fa-x:hover{
    color:royalblue;
  }
  .sidebar
  {
    background: rgb(219, 218, 218);
    position: absolute;
    width: 250px;
    height: 100vh;
    z-index: 3;
    position: fixed left;
    top: 0px; 
    animation-name: myanimation;
    animation-duration: 0.4s !important;
    animation-fill-mode:backwards ;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    

  }
  @keyframes myanimation{

0%{
    left: -200px;
 }
100%{
    left: 0px;
    }

}
  .fa-eye,.fa-eye-slash{
    z-index: 1;

  }
  .text{
    z-index: 0 !important;

  }
</style>
