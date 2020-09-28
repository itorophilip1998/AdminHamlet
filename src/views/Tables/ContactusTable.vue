<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0  pb-0 "
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col-lg-5 col-sm-6 ">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
             <input type="text" v-model="search" placeholder="search by All the fields" class="form-control shadow pr-5">
          <i class="fas fa-search   text-muted "></i>
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">{{ length }} Messages</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="filteredAll">
        <template slot="columns"> 
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Date</th>
          <th>Actions</th>
        </template>

        <template slot-scope="{row}">
          
          <th scope="row">
            <div class="media align-items-center"> 
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.firstname}}</span>
              </div>
            </div>
          </th>
          <th scope="row">
            <div class="media align-items-center"> 
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.lastname}}</span>
              </div>
            </div>
          </th>
          <th scope="row">
            <div class="media align-items-center"> 
              <div class="media-body">
                <span class=" mb-0 text-sm" style="opacity:0.7"><i>{{row.email}}</i></span>
              </div>
            </div>
          </th>
          
          <th > 
             <truncate clamp="..."  action-class="text-primary" :length="40" less="..." :text="row.message"></truncate> 
          </th>
            <th scope="row">
            <div class="media align-items-center"> 
              <div class="media-body">
                <span class="name mb-0 text-sm"><span class="completion mr-2">{{registeredOn(row.created_at)}}</span> <br>
              <small class="">{{registeredTime(row.created_at)}}</small></span>
              </div>
            </div>
          </th>
          

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item fa fa-eye text-primary" data-toggle="modal" data-target="#view"> View</a>
                <a class="dropdown-item fa fa-comment text-success" @click="emailData=row.email" data-toggle="modal" data-target="#feedback"> Send FeedBack</a>
                <a class="dropdown-item fas fa-trash-alt text-danger" href="#"> Delete</a>
                
              </template>
            </base-dropdown>
          </td>
          <!-- modal for View -->  
          <div class="modal fade " id="view" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog mt-5" role="document">
              <div class="modal-content ">
                <div class="modal-header">
                  <h5 class="modal-title">{{row.firstname}} {{row.lastname}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-1">
                   <truncate clamp="...show more"  style="border:2px dotted lightgrey;padding:20px;color:#000" action-class="text-primary" :length="100" less="hide some" :text="row.message"></truncate> 

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button> 
                </div>
              </div>
            </div>
          </div>
          <!-- modal for feedback -->  
          <div class="modal fade" id="feedback" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content ">
                <div class="modal-header">
                  <h5 class="modal-title">{{row.firstname}} {{row.lastname}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-1 px-3">
                   <div class="form-group">
                     <label class="text-dark ">Reply To:</label>
                     <input type="text"
                       class="form-control text-dark" readonly  aria-describedby="helpId" v-model='emailData'> 
                   </div>
                       <div class="form-group">
                         <label class="text-dark my-textarea">Message</label>
                         <textarea id="my-textarea" class="form-control text-dark" name="" rows="5"></textarea>
                       </div>
                </div>
                <div class="modal-footer mt-0 pt-0 ">
                  <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Send</button> 
                </div>
              </div>
            </div>
          </div>

        </template>

      </base-table>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <!-- <base-pagination total="30"></base-pagination> -->
      <pagination :data="paginate" @pagination-change-page="getAllContacts"></pagination>

    </div>
    </div>


  </div>
</template>
<script> 
import pagination from 'laravel-vue-pagination' 
import truncate from 'vue-truncate-collapsed'; 
import moment from 'moment' 
  export default {
    components:{
        truncate,
        pagination

    },
    name: 'contactus-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
     created() {
        this.getAllContacts();
      
    },
    data() {
      return {
              contact:[],
              paginate:{},
              search:'',
              length:'',
              emailData:''
             }
    
    },
   computed: {
      filteredAll()
      {  
        return this.contact
        .filter((post) => {
        return (
          post.firstname.toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) ||
          post.email.toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            )
            ||
          post.lastname.toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) 
           
        );
      });
      }
    
   },
      methods: { 
     
    link(email)
    {
       this.$router.push(`/user/${email}`)
    }, 
        registeredOn(time)
       {
         return moment(time).fromNow(); 
        //  moment(time).format("DD/MM/YYYY")
       },
       
        registeredTime(time)
       { 
       return  moment(time).format("YYYY-MM-DD") 
       },
       
        getAllContacts(page = 1)
        {
         this.$http.get(`${this.$baseApi}/contact?page=`+page,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.contact=response.data.contact.data 
               this.paginate=response.data.contact
               this.length=response.data.contact.total
         }) 
        }
    },
     
  }
  
</script>
<style lang="scss" scoped>
 .fa-search
  {
    position: relative;
    top: -30px;
    right: -90%;
  }
</style>
