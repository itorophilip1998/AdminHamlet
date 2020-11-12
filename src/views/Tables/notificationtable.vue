<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''" >
    <div class="card-header border-0 pb-0 " height="100vh"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="">
        <div class="col-lg-6 ">
          <h3 class="mb-3 pt-4 " :class="type === 'dark' ? 'text-white': ''">
            SEND NOTIFICATIONS TO ALL USERS
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
  <button type="submit" class="btn btn-primary mb-5">Send</button>
</form>
      </div>
    </div>

  
    

  

  </div>
</template>
<script>
  export default {
    components:{
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
        }
        
       }
    },
    mounted() {
      
    },
    methods:{
        postMessage(){  
        this.$http.post("https://hamlet.payfill.co/api/admin/notify/users",this.message,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {   
               this.$message({
                message: "You've posted a notification!",
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
