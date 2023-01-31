const NotFound = { template: '<div>nie ma takiego numeru</div>' }

const routes = [
    { path: '/', redirect: '/lista'},
    { path: '/lista', 
      component: NetflixLista, 
      name: "lista"
    },
    { path: '/nowy', name: 'nowy', component: NetflixForm },
    { path: '*', component: NotFound}
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,    
    data: {
      netflix: "abc"
    },
    methods: {
      send: function() {
        console.log("submit form");
      }
  }
  }).$mount('#app')
