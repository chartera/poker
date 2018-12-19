<template>

  <div :class="{'visible': visible, 'no_visible': !visible}">
    <div class="container">
      <div class="row">
	<div class="twelve columns">
	  <div v-for="item in sortedItems" class="three column">
	    <div style="text-align: center;">
	      <img @click='getInfo(item)'
		src="/templates/poker/img/default-user.png"
		   style="height: 9em; width: 80%"/>
	    </div>
	  </div>
	</div>
      </div>
    </div>
  </div>
  
</template>

<script>

const shell = require('js/shell/shell.js');

export default{
     props: ["payload"],
     
     data: function(){
	 return{
	     visible: true,
	     y: "",
	     sortedItems: [
		 {email: "test1"},
		 {email: "test1"},
		 {email: "test1"},
		 {email: "test1"},
		 {email: "test1"},
		 {email: "test1"},
		 {email: "test1"},
		 {email: "test1"}
		 
	     ]
	 }
     },
     
    methods: {

	normalizeContent(){
	    console.log("normalizeContent");
	    this.visible = !this.visible;
	    if(this.visible) {		
		setTimeout(() => {
		    console.log("Do scroll", this.y);
		    window.scrollTo(0, this.y);
		},10)
	    }
	},

	 getInfo(item){
	     console.log("getInfo", item);
	     this.y = window.scrollY;
	     this.normalizeContent();
	     shell.network.getBus().$emit('showModal', {origin: "Moments"});
	 }
	 
     },
     
     computed: {

     }, 
     
     created: function(){
	 shell.network.getBus().$on('normalizeMoments', this.normalizeContent);
     }
 }
</script>

