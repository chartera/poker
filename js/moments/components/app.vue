<template>
  <div>
    <component :is="selected"></component>    
  </div>
</template>

<script>
import Layout from './layout.vue'
Vue.component('moments', Layout);
export default {
    props: ["payload"],
    data: function(){
	return {
	    selected: Layout
	};
    },
    methods: {
	
    },
    computed: {

    },
    created(){
	console.log("moments-app created");
    }
}
</script>
