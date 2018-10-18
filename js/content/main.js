import App from './components/app.vue'
Vue.component('content-app', App);

var init = function(payload){
    const content = new Vue({
	//router: payload.router,
	template: "<content-app :payload='payload'></content-app>",
	data: {
	    payload: payload
	},

	created(){
	    console.log("content-main invoked");
	}
	
    });    
    return {view: content}; 
}

export {init}
