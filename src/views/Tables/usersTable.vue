<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0 " :class="type === 'dark' ? 'text-white': ''">
          <input type="text" v-model="search" placeholder="search by All the fields" class="form-control shadow pr-5">
          <i class="fas fa-search   text-muted "></i>
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all </base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">  
      <base-table  class="table table-hover  align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="filteredAll">
        <template slot="columns">
          <th>Users</th>
          <th>Email</th>
          <th>Number of Employees</th>
          <th>companies</th>
          <th>Registered</th>
          <th>Actions</th>
        </template>
        <template   slot-scope="{row}"> 
          <th @click="link(row.email)" style="cursor: pointer;" scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img v-if="row.profile" alt="Image placeholder" :src="row.profile.profile_pic">
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.username}}</span>
              </div>
            </div>
          </th>
          <th  @click="link(row.email)" style="cursor: pointer;">
            {{row.email}}
          </th>
          <th @click="link(row.email)" style="cursor: pointer;">
            <badge class="badge-dot mr-4" > 
              <span class="status">{{(row.employees.length >= 0) ? "No employee" : row.employees.length}}</span>
            </badge>
          </th>
          <th @click="link(row.email)" style="cursor: pointer;">
            <div class="text-center avatar-group">
              <a v-if="row.company && row.company.company_logo" href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img  alt="Image placeholder" :src="row.company.company_logo">
              </a> <br>
                   <span class=""> {{(row.company) ? row.company.company_name: "No company Registered"}}  </span>

            </div>
            
          </th>

          <th @click="link(row.email)" style="cursor: pointer;">
            <div class=" align-items-center">
              <span class="completion mr-2">{{registeredOn(row.created_at)}}</span> <br>
              <small class="">{{registeredTime(row.created_at)}}</small>
              <div> 
              </div>
            </div>
          </th>

          <th class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <router-link class="dropdown-item text-primary" :to="`/user/${row.email}`">View User <i class="fa fa-eye float-right" aria-hidden="true"></i></router-link>
                <a class="dropdown-item text-danger" href="#">Barn User <i class="fas float-right fa-hand-paper"></i></a>
                <a class="dropdown-item text-info" href="#">Chat with User <i class="fa fa-comments float-right" aria-hidden="true"></i></a> 
            
              </template>
            </base-dropdown>
          </th>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''"> 
      <!-- <base-pagination total="4"></base-pagination> -->

      <pagination :data="paginate" @pagination-change-page="getuser"></pagination>

    </div>

  </div>
</template>
<script>
import moment from 'moment'
import pagination from 'laravel-vue-pagination'
  export default {
    components:{
      pagination
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
        users:[],
        search:'',
        paginate:[]
       }
    },
    mounted() {
        this.getuser();  
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
     
    link(email)
    {
       this.$router.push(`/user/${email}`)
    }, 
        registeredOn(time)
       {
         return moment(time, "YYYYMMDD").fromNow(); 
        //  moment(time).format("DD/MM/YYYY")
       },
       
        registeredTime(time)
       { 
       return  moment(time).format("YYYY-MM-DD") 
       },
       
        getuser(page = 1)
        {
         this.$http.get(`${this.$baseApi}/user?page=`+page,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.users=response.data.user.data 
               this.paginate=response.data.user
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
