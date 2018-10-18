<template>

<div class="content_container">

  <!-- navigation -->
  
  <div :class='{"navigation_on": navigation, "navigation_off": !navigation}'>
    <div class="container">
      <div class="row">
	<nav class="navel" v-on:click.prevent
	     v-for="item in categories">
	  <a href="#"  @click='getContent(item)'
	     :class="{ active_link: active === item.id}">{{item.text}}</a>
	  
	</nav>
      </div>
    </div>
  </div>  

  <!-- body  -->
  
  <div>
    
    <home :class='{"home_on": content === "home", "home_off": content !== "home"}'></home>
    <moments :class='{"moments_on": content === "moments", "moments_off": content !== "moments"}'>
    </moments>
    
  </div>

  <!-- modal -->

  <div :class="{'modal_on': modal, 'modal_off': !modal}"> 
    <button @click='closeModal'>Close modal</button>
  </div>

</div>

    
</template>

<script>

const shell = require('js/shell/shell.js');

export default{
    props: ["payload"],
     
    data: function(){
	return{

	    active: "home",

	    categories: [
		{text: "home", id: "home"},
		{text: "moments", id: "moments"},
		{text: "login", id: "login"}
	    ],
	    
	    navigation: false,
	    modal_origin: "",
 	    modal: false,
	    content: "home",
	    
	}
    },
    
    methods: {

	
	getContent: function(item) {
	    console.log("Get content", item);
	    this.active = item.id;
	    this.content = item.id;
	    
	},


	switchNavigation(flag){
	    this.navigation = !this.navigation;
	},
 	
	showContent(content){
	    this.content = content.id;
	    
	},

	showModal(ctx){
	    this.modal = true;
	    this.modal_origin = ctx.origin;
	},

	closeModal(){
	    this.modal = false;
	    shell.network.getBus().$emit(`normalize${this.modal_origin}`);
	}
	
    },
     
    computed: {
	
    }, 
    
    created: function(){
	shell.network.getBus().$on('showContent', this.showContent);
	shell.network.getBus().$on('showModal', this.showModal);
	shell.network.getBus().$on('switchNavigation', this.switchNavigation);
    }
}
</script>

