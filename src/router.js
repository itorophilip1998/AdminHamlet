import Vue from 'vue'
import Router from 'vue-router'


import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router) 

const router =new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue'),
          meta: { 
            requiresAuth: true
          }

        },
        {
          path: '/chats',
          name: 'chats',
          component: () => import(/* webpackChunkName: "demo" */ './views/chats.vue'),
          meta: { 
            requiresAuth: true
          }

        },
        {
          path: '/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "demo" */ './views/users.vue'),
          meta: { 
            requiresAuth: true
          }

        },
        {
          path: '/user/:email',
          name: 'user',
          component: () => import(/* webpackChunkName: "demo" */ './views/user.vue'),
          meta: { 
            requiresAuth: true
          }

        },
        {
          path: '/companies',
          name: 'companies',
          component: () => import(/* webpackChunkName: "demo" */ './views/companies.vue'),
          meta: { 
            requiresAuth: true
          }

        },
        {
          path: '/feedback',
          name: 'feedback',
          component: () => import(/* webpackChunkName: "demo" */ './views/feedback.vue'),
          meta: { 
            requiresAuth: true
          }

        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue'),
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue'),
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue'),
          meta: { 
            requiresAuth: true
          },
        }
      ]
    },     
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        
      ]
    }
  ]
})
 
// middleware
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaGFtbGV0LnBheWZpbGwuY29cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MDAyNzk2NjIsImV4cCI6MTYwMTQ4OTI2MiwibmJmIjoxNjAwMjc5NjYyLCJqdGkiOiJ5a2JtZE9WVjdqemtHMkdWIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.xPepE9px4JUzCgFIUknij5Qs0zyt-tr85lORHiVC2BI")) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
 
})
export default router;