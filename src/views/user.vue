<template>
    <div>
           <base-header type="gradient-primary" class="pb-4 pb-8 pt-5 pt-md-8">  
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-md-10 m-auto mt-   mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image" style="margin-top:-1.5rem"> <a href="#"> <img :src="this.profile.profile.profile_pic" class="rounded-circle"> </a> </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <router-link to="/chats"><base-button size="sm" type="info" class="mr-4">Connect</base-button></router-link>
                                <router-link to="/chats"><base-button size="sm" type="default" class="float-right">Message</base-button></router-link>
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-2">
                                        <div>
                                            <span class="heading">{{(this.profile.employees.length) ?  this.profile.employees.length : "0" }}</span>
                                            <span class="description">Employees</span>
                                        </div>
                                        
                                        <div>
                                            <span class="heading">{{(this.profile.company.company_departments.length) ?  this.profile.company.company_departments.length : "0" }}</span>
                                            <span class="description">Departments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    {{this.profile.profile.first_name}} {{this.profile.profile.last_name}}
                                </h3>
                                <div class="h5 font-weight-300">
                                    <i class="ni location_pin mr-2"></i>{{this.profile.profile.address}}
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>{{this.profile.profile.phone}}
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>{{this.profile.email}}
                                </div>
                                <div>
                                    <i class="ni education_hat mr-2"></i>{{this.profile.company.company_name}}
                                </div>
                                <hr class="my-4" />
                                
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'user-profile',
    data() {
      return {
          params:this.$route.params.email,
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        },
        profile:{}
      }
    },
    created() {
        this.getProfile();
        console.log(this.params)
    },
    methods: {
        getProfile()
        {
         this.$http.get(`${this.$baseApi}/user/${this.params}`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.profile=response.data.user 
         }) 
        }
    },
  };
</script>
<style></style>