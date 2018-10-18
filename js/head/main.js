import App from './components/app.vue'
Vue.component('head-app', App);

var init = function(payload){
    const content = new Vue({
	//router: payload.router,
	template: "<head-app :payload='payload'></head-app>",
	data: {
	    payload: payload
	},
	created(){
	    console.log("head-main invoked");
	}
	
    });    
    return {view: content}; 
}

export {init}
