<template>
    <div>
          <base-header type="gradient-primary" class="pt-4 pb-5  pt-md-8">  
            
          </base-header>
        <div class="container-fluid mt--7  " >
            <div class="row ">
                    <div class="col-md-9 col-sm-10 shadow rounded-lg p-0 m-auto bg-white">
                        
                            <h2 class="shadow  p-2">All Users <i class="fas fa-users "></i> <small class="float-right">{{ `${users.length} users` }}</small></h2>
                                   <ul class=" desktopScroll p-2"> 
                                     <input v-model="search" type="text" class="form-control py-0 mb-2" placeholder="Search for a user">

                                     <li   class="pt-2 px-2  pl-3 py-2 desktopLink" v-for="(user, index) in filteredAll" @click="getChat(user)" :key="index">
                                      <img v-if="user.profile" class="rounded-circle border " style="width: 50px;height: 50px;" 
                                      :src="user.profile.profile_pic" alt="">
                                    <h3 class="text-dark pl-2 d-inline">{{ user.username }}
                                    </h3>
                                      <small class="fa fa-circle float-right text-success"> </small> 
                                     </li> 
                                   </ul>
                          </div>
            </div>
        </div>

    </div>
</template>
<script>
  // import ProjectsTable from './Tables/ProjectsTable'
  export default {
    name: 'chat',
    components: {
      // ProjectsTable
    },
    data() {
      return {
        email:this.$route.params.email,
           users:[],
           user:{},
           chat:{
             user_id:'',
             friends_id:'50',
             message:'',
             photo:'',
           },
           chats:{},
           search:''

      }
    },
    mounted() {
       this.getUser() 
    },
     computed: {
      filteredAll()
      {  
        return this.users
      //   .filter((post) => {
      //   return (
      //     post.username
      //       .toLowerCase()
      //       .match(
      //         this.search.toLowerCase() || this.search.toUpperCase()
      //       ) ||
      //     post.email
      //       .toLowerCase()
      //       .match(
      //         this.search.toLowerCase() || this.search.toUpperCase()
      //       )
      //       ||
      //     post.company.company_name
      //       .toLowerCase()
      //       .match(
      //         this.search.toLowerCase() || this.search.toUpperCase()
      //       ) 
           
      //   );
      // });
      }
    },
    methods: {
      getUser(){
        this.$http.get(`${this.$baseApi}/chatUsers`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.users=response.data.user 
         }) 
      }, 
      postChat(){  
        this.$http.post(`${this.$rootApi}/chat`,this.chat,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.users=response.data.user   
         }) 
         this.showChat()
      }, 
      getChat(users) {  
        this.$router.push(`/chat/${users.email}`)   
      },
    }
  };
</script>
<style lang="scss" scoped >
  li{
    list-style: none;
  }
  .desktopScroll{
   overflow-y: scroll !important;
   height: 70vh;

   padding: 4px;
  }
  .MobileScroll{
   overflow-x: scroll !important;
   width: 100%;
   padding: 4px;
   z-index: 2px !important;
  }
  .desktopLink{
    cursor: pointer;
  }
  .desktopLink:hover{
    background:lightgrey;
    border-radius: 5px;
  }
  .chat{
      height: 60vh;
      overflow-y: scroll; 
  } 
 
</style>
