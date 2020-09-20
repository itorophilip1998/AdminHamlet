<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all </base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="users">
        <template slot="columns">
          <th>Users</th>
          <th>Email</th>
          <th>Number of Employees</th>
          <th>companies</th>
          <th>Status</th>
          <th>Actions</th>
        </template>
        <template slot-scope="{row}"> 
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.profile.profile_pic">
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.username}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.email}}
          </td>
          <td>
            <badge class="badge-dot mr-4" >
               
              <span class="status">{{(row.employees.length >= 0) ? "No employee" : row.employees.length}}</span>
            </badge>
          </td>
          <td>
            <div class="text-center avatar-group">
              <a v-if="row.company && row.company.company_logo" href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img  alt="Image placeholder" :src="row.company.company_logo">
              </a> <br>
                   <span class=""> {{(row.company) ? row.company.company_name: "No company Registed"}}  </span>

            </div>
            
          </td>

          <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{row.completion}}%</span>
              <div>
                <base-progress :type="row.statusType"
                               :show-percentage="false"
                               class="pt-0"
                               :value="row.completion"/>
              </div>
            </div>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item text-primary" href="#">View User <i class="fa fa-eye float-right" aria-hidden="true"></i></a>
                <a class="dropdown-item text-danger" href="#">Barn User <i class="fas float-right fa-hand-paper    "></i></a>
                <a class="dropdown-item text-info" href="#">Chat with User <i class="fa fa-comments float-right" aria-hidden="true"></i></a> 
            
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        users:{},
       }
    },
    created() {
        this.getuser();
    },
    methods: {
        getuser()
        {
         this.$http.get(`${this.$baseApi}/user`,{headers:{'Authorization':`Bearer ${this.$token}`}}).then((response)=> {
               this.users=response.data.user
         })

        }
    },
  }
</script>
<style>
</style>
