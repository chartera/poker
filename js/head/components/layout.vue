<template>

<div class="head_icon">
  
  <div 
    style="position: relative; left: 10px; top: 15px; margin-bottom: 20px;">
    <div @click='switchHead'
	 :class='{"hamburger--arrow": !nav, "hamburger--arrow is-active": nav}'>
      <div class="hamburger-box">
	<div class="hamburger-inner"></div>
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
	    nav: false
	}
    },
    
    methods: {

	switchHead(){
	    shell.network.getBus().$emit('switchNavigation');
	    this.nav = !this.nav;
	}	 
    },
    
    computed: {
	
    }, 
     
    created: function(){
	
    }
}
</script>

