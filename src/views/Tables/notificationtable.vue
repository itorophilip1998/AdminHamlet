<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''" >
    <div class="card-header border-0 pb-0 " height="100vh"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="">
        <div class="col-lg-6 ">
          <h3 class="mb-3 pt-4 " :class="type === 'dark' ? 'text-white': ''">
            SEND NOTIFICATIONS TO USERS
          </h3>
        </div>
        <form @submit.prevent="postMessage">
  <div class="form-group ">
    <label for="exampleFormControlTextarea1">Title</label>
    <input class="form-control input1" required v-model="message.title" id="exampleFormControlTextarea1" >
  </div>
  
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Message</label>
    <textarea class="form-control input1" required  id="exampleFormControlTextarea1" v-model="message.body" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-primary mb-5">Send</button><button type="button" @click="viewStuff()" class="btn btn-primary mb-5" v-if="!viewNotifications">View</button><button type="button" @click="hideStuff()" class="btn btn-primary mb-5" v-if="viewNotifications">Hide</button>
</form>
      </div>
    </div>
    <div class="table-responsive table-bordered pb-9" v-if="viewNotifications">  

<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Message</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(notification, index) in notifications"
    :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{notification.title}}</td>
      <td><truncate clamp="....."  action-class="text-primary font-weight-bold" :length="20" less="....." :text="notification.body"></truncate></td>
      <td><base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template> 
                <a class="dropdown-item text-danger" @click="deleteMessage(notification.id)">Delete<i class="fas float-right fa-trash-alt"></i></a>  
            
              </template>
            </base-dropdown></td>
      
    </tr>
    
  </tbody>
</table>                   
    </div>
  
  </div>
    

  

  
</template>
<script>
  import truncate from 'vue-truncate-collapsed';
  export default {
    components:{
        truncate
    },
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        message:{
            title:'',
            body:'',
        },
        notifications:{},
        viewNotifications:false
        
       }
    },
    mounted() {
      this.getNotifications()
    },
    methods:{
        viewStuff(){
            this.viewNotifications = true;
        },
        hideStuff(){
            this.viewNotifications = false;
        },
        postMessage(){  
        this.$http.post("https://hamlet.payfill.co/api/admin/notify/users",this.message,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {   
               this.$message({
                message: "You've posted a notification!",
                type: "success"
        });console.log(response)
         }) 
      }, 
      getNotifications()
        {
         this.$http.get("https://hamlet.payfill.co/api/update/notify",{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.notifications=response.data.notice
               console.log(this.notifications) 
         }) 
        },
        deleteMessage(id){  
        this.$http.delete("https://hamlet.payfill.co/api/admin/deleteNotice/"+ id,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {   
               this.getNotifications()
               this.$message({
                message: "You've deleted a notification!",
                type: "success"
        });console.log(response)
         }) 
      }, 
        
    }
    
   
  }
</script>
<style lang="scss" scoped>
  
  form{
    margin-left:1rem
  }


  @media(min-width:567px){
      .input1{
          width:50%
      }
  }
</style>
