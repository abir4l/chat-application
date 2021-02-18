<script>
  
  import nav from '../components/Navigation.vue';
  import {mapGetters,mapActions} from 'vuex';
  export default {
    components:{'navigation':nav},
   data: () => {
    return {
      // userList : []
    }
  },
  methods: {
    ...mapActions([
        'loadUserList'
    ]),
      goToHomePage:function(){
          this.$router.push("/");
      },
      chatWithUser:function(username){

        this.$store.dispatch("setUpChat",{username});
        this.$router.push('/user/chat/'+username);
      

      }

  },
  computed:{
    ...mapGetters(
    {
        userList: 'getUserList',
    }),
  },
  mounted:function(){
      // this.getUserList();
      this.loadUserList();

  }
}
</script>


<template>

  <div class="contents mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 center-alignment">
              <navigation></navigation>
        </div>
      </div>
      <div class="row mt-5">
        <div class="users-wrapper col-md-6">

            
              
              <div class="detail-contents mt-3" v-for="user in userList" :key="user._id">
                <div class="display-flex">
                  <div class="user-profile-pic user-profile-pic-sm">
                    <span>{{user.name.charAt(0).toUpperCase()}}</span>

                  </div>
                    <p class=" ml-3 text-color-grey">{{user.name}}</p>

                </div>
              <div class="">
                  <button class="btn btn-primary-custom" v-on:click="chatWithUser(user.username)">Chat</button>
              </div>
            </div>
             
                
              

        </div>
      </div>
    </div>	
  </div>	

</template>