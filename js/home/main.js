import App from './components/app.vue'
Vue.component('home-app', App);

var init = function(payload){
    const content = new Vue({
	//router: payload.router,
	template: "<home-app :payload='payload'></home-app>",
	data: {
	    payload: payload
	},
	created(){
	    console.log("home-main invoked");
	}
	
    });    
    return {view: content}; 
}

export {init}
