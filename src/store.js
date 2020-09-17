import Vue from 'vue' 
import axios from 'axios' 
Vue.prototype.$http = axios
import Vuex from 'vuex' 
Vue.use(Vuex)


const store = new Vuex.Store({
// state
state:
{
   Admin:{}
},

// mutation
mutations:
{
  
},


// Action
actions:
{
    
}
})
export  default  store;
