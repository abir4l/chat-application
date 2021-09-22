<script>
  export default {
    components: {  },
    props: [],
    computed: {
   
    },
    filters: {
     
    },
    mounted: function () {
    },

    methods: {
        logout:function(){
             this.$store.dispatch("logout");
             this.$router.push('/');
        }
  },
  
  data: function () {
    return {
      
    };
  },

};
</script>

<template>
    <ul class="navigation-list">
        <li>
            <router-link to="/" class="text-color-red nav-urls">home</router-link>
        </li>
        <li>
            <router-link to="/detail" class="text-color-red nav-urls">details</router-link>
        </li>
        <li>
            <router-link to="/user/list" class="text-color-red nav-urls">users</router-link>
        </li>
        <li @click="logout()">
            <span class="nav-urls text-color-red cursor-pointer">Logout</span>
        </li> 
    </ul>
</template>

<style scoped lang="css">
  
</style>
