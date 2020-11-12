<template>
    <div>
          <base-header type="gradient-primary" class="pt-4 pb-5  pt-md-8">  
            
          </base-header>
        <div class="container-fluid mt--7">
            <div class="row ">
                <div class="col-12 panel pt-0 bg-white rounded-lg ">
                        <div class="row p-0"> 
                          <div class="col-md-8 px-0"> 
    <div class="col-12 border shadow p-2 mt-2 d-flex d-md-none">
     
    <ul class=" d-flex p-0 m-0 pl-1 MobileScroll "> 
      <li   class=" px-1 py-0 MobileLink" v-for="(user, index) in users" @click="getChat(user)" :key="index">
       <img v-if="user.profile" class="rounded-circle border " style="width: 40px;height: 40px;" 
       :src="user.profile.profile_pic" alt=""> 
      </li>
    
    </ul>
    </div>
    <div v-if="!user.profile" class="text-center p-5">
            <div class="alert alert-primary" role="alert">
                Tab any user and start conversation
            </div>
    </div>
    <div class="col-12 shadow p-2 " v-if="user.profile"> 

            <img v-if="user.profile" class=" rounded-circle border" style="width: 50px;height: 50px;" 
            :src="user.profile.profile_pic" alt="">
    <span v-if="user.profile" class="text-dark pl-2">{{ user.profile.first_name  }} {{ user.profile.last_name }}</span>
    <small v-if="chats" class="text-muted pl-2 float-right">( {{( chats.length > 1) ? chats.length+' Messages': (chats.length > 0) ? chats.length+' Message' : "No Message" }} ) </small>
          </div>
<!-- Messages template -->
<div v-if="!chats.length == 0" id="chat" class="chat  row  px-sm-3 px-md-4 p-0" >   
    <div class="me col-md-12 pr-0 p-0" v-for="(chat, index) in chats" :key="index" >
      <div   :class="`${(profile.id==chat.user_id) ? 'float-right bg-primary text-white' : 'float-left  text-justify  bg-secondary border' }  mt-2 p-2 seechat    text-justify  shadow`">
               
           <truncate  collapsed-text-class="collapsed truncate" action-class="customClass font-weight-bold " clamp="...Show more" :length="300" less="...Hide some"
           :text="chat.message">
           </truncate>                
       <small   style="font-size: 10px;" :class="` d-block ${(profile.id==chat.user_id) ? 'time': 'text-muted' }`">{{ time(chat.created_at) }}</small>

     
      </div> 
 
    </div> 
</div>  
<div class="noChat pt-5  text-center"  v-if="chats.length == 0">
 <img class="w-25" src="https://cdn1.iconfinder.com/data/icons/message-7/32/tn55_speech_bubble_forbidden_no_inappropriate_talk_chat_conversation0A-512.png" alt="">
 <h3>No Conversation<span v-if="user.profile"> With <b>{{ user.profile.first_name  }} {{ user.profile.last_name }}</b></span></h3>
</div>
<!-- Chats Input -->
<div class="form-group shadow border-top pt-2 p-1" v-if="user.profile">  
  <input type="text"  @keydown.enter="postChat()" v-model="chat.message" class="form-control pl-3  pr-md-4 col-xl-11 m-auto col-sm-11 col-md-11" name="" id="" aria-describedby="emailHelpId" placeholder="Type here"> 
 <i v-if="this.chat.message" @click="postChat()" class="fas fa-paper-plane text-primary" style="position: relative;top:-30px;left:92%;cursor: pointer;"></i> 
</div>
                          </div>
                          <div class="col-md-4 border-left p-0 d-none d-md-block">
                          
                            <h2 class="shadow  p-2">All Users <i class="fas fa-users "></i> <small class="float-right">{{ `${users.length} users` }}</small></h2>
                                   <ul class=" desktopScroll"> 
                                     <input v-model="search" type="text" class="form-control py-0 mb-2" placeholder="Search for a user">
                                     <li   class="pt-2 px-2 py-2 desktopLink" v-for="(user, index) in filteredAll" @click="getChat(user)" :key="index">
                                      <img v-if="user.profile" class="rounded-circle border " style="width: 35px;height: 35px;" 
                                      :src="user.profile.profile_pic" alt="">
                                    <small class="text-dark pl-2">{{ user.username }}</small>
                                     </li>
                                   
                                   </ul>
                          </div>
                        </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  // import ProjectsTable from './Tables/ProjectsTable'
import truncate from 'vue-truncate-collapsed'; 

import moment from 'moment' 

  export default {
    name: 'chat',
    components: {
      truncate
    },
    data() {
      return {
        email:this.$route.params.email,
           users:[],
           user:{},
           chat:{
             user_id:'',
             friends_id:'',
             message:'',
             photo:'',
           },
           chats:{},
           profile:{},
           search:''
      }
    },
    mounted() {
       this.getUser()
       this.showChat()
       this.getProfile() 
       this.getChatUser() 
    },
    computed: {
      filteredAll()
      {  
        return this.users
        .filter((post) => {
        return (
          post.username
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) ||
          post.email
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            )
            ||
          post.company.company_name
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) 
           
        );
      });
      }
    },
    methods: {
  time(time){
   return  moment(time).fromNow()
  },
      getUser(){
        this.$http.get(`${this.$baseApi}/chatUsers`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.users=response.data.user   
         }) 
      }, 
      postChat(){  
         this.showChat() 
        this.$http.post(`${this.$rootApi}/chat`,this.chat,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.users=response.data.user   
         })  
         this.getUser()
         this.showChat() 
         this.chat.message=""
      }, 
        getChatUser() {   
        this.$http.get(`${this.$baseApi}/user/${this.email}`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.user=response.data.user 
               this.chat.friends_id=response.data.user.id  
               this.showChat()

         }) 
      },
      getChat(users) { 
        this.user=users;
        this.chat.friends_id=users.id 
        this.$router.push(`/chat/${users.email}`)  
        this.$http.get(`${this.$baseApi}/user/${users.email}`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.user=response.data.user 
               this.chat.friends_id=response.data.user.id  
         }) 
         this.showChat()
      },
      showChat()
      {
        this.$http.get(`${this.$rootApi}/chat/view/${this.user.id}`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.chats=response.data    
         }) 
      },
      getProfile()
        {
         this.$http.get(`${this.$baseApi}/profile`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.profile=response.data.admin 
               this.chat.user_id=response.data.admin.id
         })

        }
    },
  };
</script>
<style lang="scss" scoped >
   
  li{
    list-style: none;
    cursor: pointer !important;
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
   z-index: 2px;
  }
  
  .desktopLink{
    cursor: pointer;
  }
  .desktopLink:hover{
    background:lightgrey;
    border-radius: 25px;
  }
  .chat,.noChat{
      height: 60vh;
      overflow-y: scroll; 
      overflow-x: none;  

  } 
  .chat{ 
    margin-right: 0px !important;
  }
  .time{
      color:rgb(88, 86, 86)
  }
 .seechat{
    border-radius: 15px;
    max-width: 90%;
    overflow-x: none; 
    max-width:90%;
                position: relative;
                display:inline-block;
 }

 
/* //  Custorm css */
.desktopScroll:hover::-webkit-scrollbar
{   
    display: block;
    width: 8px !important;
}
.chat:hover::-webkit-scrollbar
{   
   display: block;
    width: 8px !important;
}
::-webkit-scrollbar-track
{
    background: whitesmoke;
}
 
::-webkit-scrollbar-thumb
{
 background: #5e72e4;
  border-radius: 5px; 
} 

</style>
