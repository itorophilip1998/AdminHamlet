<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border ">
                 
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" @click="login()" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    
                </div>
            </div>
        </div>
</template>
<script>
import Swal from 'sweetalert2'
  export default { 
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
        login()
        {  
           this.$http.post(`${this.$baseApi}/login`, this.model).then((response)=> {
            //    manipulate secured token
               localStorage.setItem(this.$token, response.data.token);  
                 Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Login Successfully!',
                showConfirmButton: false,
                timer: 1500,
                width: 400, 
                }) 
                this.$router.push("/dashboard")
           }).catch((error)=>{
                    
                  if(error.response.status===401){
                       Swal.fire({
                      position: 'top-end',
                      icon: 'warning',
                      text: 'Incorrect credentials',
                      showConfirmButton: false,
                      timer: 1500,
                      width: 400, 
                      }) 
                  }else{
                      Swal.fire({
                      position: 'top-end',
                      icon: 'warning',
                      text: 'Can`t Login now try again later',
                      showConfirmButton: false,
                      timer: 1500,
                      width: 400, 
                }) 
                  }
           })
        }
    },
  }
</script>
<style>
</style>
