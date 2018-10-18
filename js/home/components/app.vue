<template>
  <div>
    <component :is="selected"></component>
  </div>
</template>

<script>
import Layout from './layout.vue'
Vue.component('home', Layout);
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
	console.log("home-app created");
    }
}
</script>
