<template>
  <div>
    <component :is="selected"></component>
  </div>
</template>

<script>
  import Layout from './layout.vue'
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
	console.log("head-app created")
    }
}
</script>
