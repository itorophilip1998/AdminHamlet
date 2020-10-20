<template>
    <div>
        <base-header type="gradient-primary" class="pb-5 pt-5 pt-md-8 bg"> 
            <!-- Card stats -->
            <div v-if="loader" class="text-center pt-9" id="overlay"> 
                <div class="loading">
                    <i style="z-index: 2;"  class="fas my-3  fa-spinner fa-5x text-white fa-pulse"></i>
                </div>
                                   
            </div>
            <div class="grid mb-5">
                <router-link to="activeusers"><div class="one">
                    <div class="grid2">
                        <div>
                            <h2>Active Users</h2>
                            <h4>{{(length2) ?  length2 : "0" }}</h4>
                        </div>
                        <div class="circle-name-1">
                            <i class="fa fa-user-friends"></i>
                        </div>
                        
                    </div>
                    
                </div></router-link>
                <router-link to="bannedUsers"><div class="one">
                <div class="grid2">
                        <div>
                            <h2>Banned Users</h2>
                            <h4>{{(length3) ?  length3 : "0" }}</h4>
                        </div>
                        <div class="circle-name-2">
                            <i class="fa fa-user-times" ></i>
                        </div>
                    </div>
                </div></router-link>
                <router-link to="users"><div class="one">
                    <div class="grid2">
                        <div>
                            <h2>Total Users</h2>
                            <h4>{{(length4) ?  length4 : "0" }}</h4>
                        </div>
                        <div class="circle-name-3">
                            <i class="fa fa-users"></i>
                        </div>
                        
                    </div>
                </div></router-link>
                <router-link to="companies"><div class="one">
                    <div class="grid2">
                        <div>
                            <h2>Companies</h2>
                            <h4>{{(length) ?  length : "0" }}</h4>
                        </div>
                        <div class="circle-name-1">
                            <i class="fa fa-building"></i>
                        </div>
                        
                    </div>
                    
                </div></router-link>
                <router-link to="contactus"><div class="one">
                <div class="grid2">
                        <div>
                            <h2>Messages</h2>
                            <h4>{{(length1) ?  length1 : "0" }}</h4>
                        </div>
                        <div class="circle-name-4">
                            <i class="fa fa-envelope-open-text" ></i>
                        </div>
                    </div>
                </div></router-link>
                <router-link to="chats"><div class="one">
                    <div class="grid2">
                        <div>
                            <h2>Chats</h2>
                            <h4>{{(this.chats.length) ?  this.chats.length : "0" }}</h4>
                        </div>
                        <div class="circle-name-3">
                            <i class="fa fa-comments"></i>
                        </div>
                        
                    </div>
                </div></router-link>
            </div>
             
            <!-- <div class="row">

                <div class="col-xl-4 col-lg-6">
                    <stats-card title="Active Users"
                                type="gradient-red"
                                icon="fa fa-users"
                                class="pt-5"
                    > 
                        <template slot="footer">
                            <span class="heading"><h2>{{(this.activeUsers.length) ?  this.activeUsers.length : "0" }}</h2> </span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-4 col-lg-6">
                    <stats-card title="Banned Users "
                                type="gradient-orange"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0 pt-5 pb-5"
                    >

                        <template slot="footer">
                            <span class="heading">{{(this.bannedUsers.length) ?  this.bannedUsers.length : "0" }}</span>
                        </template>
                    </stats-card>
                </div>  
                <div class="col-xl-4 col-lg-6">
                    <stats-card title="Total Users"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0 pt-5 pb-5"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>  -->
          <!-- </base-header>
        <base-header type="gradient-primary" class="  pb-5  pt-md-1">  -->
        
            <!-- Card stats -->
            <!-- <div class="row">
                <div class="col-xl-4 col-lg-6">
                    <stats-card title="Premuim Users"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="fa fa-users"
                                class="mb-4 mb-xl-0"
                    > 
                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
              
                <div class="col-xl-4 col-lg-6">
                    <stats-card title="Free Mode Users"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-4 col-lg-6">
                    <stats-card title="Banned Companies"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div> -->
        <!-- </base-header>
        <base-header type="gradient-primary" class="pb-1 pb-4 pt-md-1">  -->
        
        <!-- Card stats
        <div class="row">
            <div class="col-xl-4 col-lg-6">
                <stats-card title="Companies with less than 100 Employees"
                            type="gradient-red"
                            sub-title="350,897"
                            icon="fa fa-users"
                            class="mb-4 mb-xl-0"
                > 
                    <template slot="footer">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </div>
          
            <div class="col-xl-4 col-lg-6">
                <stats-card title="Companies with more than 100 Employees"
                            type="gradient-green"
                            sub-title="924"
                            icon="ni ni-money-coins"
                            class="mb-4 mb-xl-0"
                >

                    <template slot="footer">
                        <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>

            </div>
            <div class="col-xl-4 col-lg-6">
                <stats-card title="Total Number of Companies"
                            type="gradient-info"
                            sub-title="49,65%"
                            icon="ni ni-chart-bar-32"
                            class="mb-4 mb-xl-0"
                >

                    <template slot="footer">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </div>
        </div> -->
    </base-header>

        <!--Charts-->
        <!-- <div class="container-fluid mt--7"> -->
            <!-- <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Sales value</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">Month</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">Week</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </div>
                        </div>

                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div>
            </div> -->
            <!-- End charts-->

            <!--Tables-->
            <!-- <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
            </div> -->
            <!--End tables-->
        <!-- </div> -->

    </div>
</template>
<script>
import axios from 'axios'
export default {
    components: {
      // LineChart,
      // BarChart,
      // PageVisitsTable,
      // SocialTrafficTable,
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          // extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        },
        length:"",
        length1:"",
        length2:"",
        length3:"",
        length4:"",
        chats:{},
        loader:true,
        messages:{},
        company: {},
        activeUsers: {},
        bannedUsers: {},
        users:{},
      };
    },
     mounted() {
      this.initBigChart(0);
      this.getActive();
      this.getBan();
      this.getuser();
      this.getCompanies();
      this.getMessages();
      this.getChats()
    },
    methods: {
        getMessages() {
      axios.get("https://hamlet.payfill.co/api/admin/contact", {headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}})
        .then((response) => {
          this.messages=response.data.contact.data
          this.length1=response.data.contact.total
          console.log(this.messages);
          });
    },
    getChats() {
      axios.get("https://hamlet.payfill.co/api/chat/view/5", {headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}})
        .then((response) => {
          this.chats=response.data
          console.log(this.chats);
          
          });
    },
        getCompanies()
        {
         this.$http.get(`${this.$baseApi}/company`,{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.company=response.data.company.data 
               this.length=response.data.company.total
               console.log(this.company)
         }) 
        },
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      getActive() {
      axios.get("https://hamlet.payfill.co/api/admin/active/users", {headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}})
        .then((res) => {
          console.log(res.data.active_users);
          this.activeUsers = res.data.active_users.data;
          this.length2 = res.data.active_users.total;
          this.loader=false;
        });
    },
    getBan() {
      axios.get("https://hamlet.payfill.co/api/admin/ban/users", {headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}})
        .then((res) => {
          console.log(res.data.banned_users);
          this.bannedUsers = res.data.banned_users.data;
          this.length3 = res.data.banned_users.total
        });
    },
    getuser()
        {
         this.$http.get("https://hamlet.payfill.co/api/admin/allUsers",{headers:{'Authorization':`Bearer ${localStorage.getItem(this.$token)}`}}).then((response)=> {
               this.users=response.data.user.data;
               this.length4 = response.data.user.total
               console.log(this.users)
         }) 
        }
    },
    
  }
</script>
<style>
    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap:2rem
    }
    .one{
        background:white;
        border-radius:5px;
        padding: 30px 20px;
        box-shadow: 4px 2px 7px rgba(0, 0, 0, 0.25);
        transition: transform .2s !important;
    }
    .one:hover{
        transform: scale(1.1) !important;
    }
    .grid2{
        display:grid;
        grid-template-columns:3fr 1fr;
        grid-gap: 1rem;
    }
    .circle-name-1 {
    padding: 1rem;
    background-color: #64a2ff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #ffffff;
    }
    .circle-name-2 {
    padding: 1rem;
    background-color:red;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #ffffff;
    }
    .circle-name-3 {
    padding: 1rem;
    background:orange;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #ffffff;
    }
    .circle-name-4 {
    padding: 1rem;
    background:green;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #ffffff;
    }
    .bg{
        height:85vh;
    }




    @media(max-width:768px){
        .grid{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap:3rem
    }
        .grid2{
        display:grid;
        grid-template-columns:3fr 1fr;
        grid-gap: 1rem;
    }
        .bg{
            height:auto;
        }
    }


    @media (min-width:769px) and (max-width:1200px){
        .grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap:3rem
    }
        .grid2{
        display:grid;
        grid-template-columns:3fr 1fr;
        grid-gap: 1rem;
    }
        .bg{
            height:auto;
        }

    }



    
</style>
