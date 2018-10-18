import App from './components/app.vue'
Vue.component('moments-app', App);
var init = function(payload){
    const content = new Vue({
	//router: payload.router,
	template: "<moments-app :payload='payload'></moments-app>",
	data: {
	    payload: payload
	},
	created(){
	    console.log("moments-main invoked");
	}
	
    });    
    return {view: content}; 
}

export {init}
