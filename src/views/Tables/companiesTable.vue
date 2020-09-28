<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0 pb-0 "
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col-lg-4 col-6">
          <h3 class="mb-0 " :class="type === 'dark' ? 'text-white': ''">
          <input type="text" v-model="search" placeholder="search by All the fields" class="form-control shadow pr-5">
          <i class="fas fa-search   text-muted "></i>
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">{{ length }} Companies</base-button>
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
          <th>Companies</th>
          <th>Email</th>
          <!-- <th>Phone</th> -->
          <th>Address</th>
          <!-- <th>Zip Code</th>
          <th>State</th> 
          <th>Website</th>  -->
          <th>Manager</th> 
          <th>Employees</th> 
          <th>Departments</th> 
          <th>Registered</th> 
          <!-- <th>Actions</th> -->
        </template>
        <template   slot-scope="{row}"> 
          <th @click="link(row.company_email)" style="cursor: pointer;" scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img v-if="row.company_logo" class="w-100 h-100"   :src="row.company_logo">
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.company_email}}</span>
              </div>
            </div>
          </th>
          <th  @click="link(row.company_email)" style="cursor: pointer;">
            {{row.company_email}}
          </th>
          <!-- <th  @click="link(row.company_email)" style="cursor: pointer;">
            {{row.company_phone}}
          </th>  -->
            <th  @dblclick="link(row.company_email)" style="cursor: pointer;">
            <badge class="badge-dot mr-4" >  
             <truncate clamp="....."  action-class="text-primary font-weight-bold" :length="20" less="....." :text="row.company_address"></truncate> 

            </badge>
          </th>
            <!-- <th  @dblclick="link(row.company_email)" style="cursor: pointer;">
            <badge class="badge-dot mr-4" >  
             <truncate clamp="....."  action-class="text-primary font-weight-bold" :length="20" less="....." :text="row.zip_code"></truncate> 

            </badge>
          </th>
           <th  @click="link(row.company_email)" style="cursor: pointer;">
            {{row.state}}
          </th> 
           <th  @click="link(row.company_email)" style="cursor: pointer;">
            {{row.company_website}}
          </th>  -->
           <th @click="link(row.company_name)" style="cursor: pointer;">
            <div class="text-center avatar-group">
              <a v-if="row.user.profile && row.user.profile.profile_pic" href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img   class="w-100 h-100" :src="row.user.profile.profile_pic">
              </a> <br>
                   <span class=""> {{ row.user.username}}  </span>

            </div>
            
          </th>

          <th class="text-center" @click="link(row.company_email)" style="cursor: pointer;">
            <badge class="badge-dot mr-4" > 
              <span class="status">{{(row.employees.length) ?  row.employees.length : "No employee" }}</span>
            </badge>
          </th>
          <th class="text-center" @click="link(row.company_email)" style="cursor: pointer;">
            <badge class="badge-dot mr-4" > 
              <span class="status">{{(row.company_departments.length) ?  row.company_departments.length : "No Department" }}</span>
            </badge>
          </th> 
          <th @click="link(row.company_email  )" style="cursor: pointer;">
            <div class=" align-items-center">
              <span class="completion mr-2">{{registeredOn(row.created_at)}}</span> <br>
              <small class="">{{registeredTime(row.created_at)}}</small>
              <div> 
              </div>
            </div>
          </th>

          <th class="text-right d-none">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <router-link class="dropdown-item text-primary" :to="`/user/${row.email}`">View User <i class="fa fa-eye float-right" aria-hidden="true"></i></router-link> 
                <a class="dropdown-item text-danger" v-if="!row.banned_at" @click="banUser(row)">Ban User<i class="fas float-right fa-hand-paper"></i></a>
                <a class="dropdown-item text-danger" v-if="row.banned_at" @click="unbanUser(row.id)">Unban User<i class="fas float-right fa-hand-holding-heart"></i></a> 
                <a class="dropdown-item text-info" href="#">Chat with User <i class="fa fa-comments float-right" aria-hidden="true"></i></a> 
            
              </template>
            </base-dropdown>
          </th>

        </template>
 
      </base-table>
       <div class="card-footer d-flex justify-content-start "
         :class="type === 'dark' ? 'bg-transparent': ''">  
      <pagination :data="paginate" @pagination-change-page="getCompanies"></pagination>

    </div>
    </div>

  

  </div>
</template>
<script>
import moment from 'moment'
import pagination from 'laravel-vue-pagination'
import truncate from 'vue-truncate-collapsed'; 

  export default {
    components:{
      pagination,
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
        company:[],
        search:'',
        length:'',
        paginate:[]
       }
    },
    mounted() {
        this.getCompanies();  
    },
    computed: {
      filteredAll()
      {  
        return this.company
        .filter((post) => {
        return (
          post.company_name
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) ||
          post.company_email
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            )
            ||
          post.no_of_employees
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) 
            ||
          post.user.username
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) 
            ||
          post.company_address
            .toLowerCase()
            .match(
              this.search.toLowerCase() || this.search.toUpperCase()
            ) 
            ||
          post.state
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
       this.$router.push(`/company/${email}`)
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
       
        getCompanies(page = 1)
        {
         this.$http.get(`${this.$baseApi}/company?page=`+page,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.company=response.data.company.data 
               this.paginate=response.data.company
               this.length=response.data.company.total
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
