<template>
  <div>
    <component :is="selected"></component>
  </div>
</template>

<script>
  import Layout from './layout.vue'
//  Vue.component('shell-layout', Layout);
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
	console.log("content-app created")
    }
}
</script>
