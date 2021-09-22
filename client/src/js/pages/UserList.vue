<script>
  import UserService from '../services/UserService.js';
  import ChatService from '../services/ChatService.js';
  import nav from '../components/Navigation.vue';
  export default {
    components:{'navigation':nav},
   data: () => {
    return {
      userList : []
    }
  },
  methods: {

      goToHomePage:function(){
          this.$router.push("/");
      },
      getUserList:async function(){
        let response = await UserService.getUserlist();
        let username = this.$store.getters.getUserState.username;
        this.userList = response.data.filter(d => d["email"] && d["username"] !== username);
      },
      chatWithUser:function(username){

        // ChatService.chatHandshake(username,localStorage.getItem("username"));
        this.$store.dispatch("setUpChat",{username});

        this.$router.push('/user/chat/'+username);
      

      }

  },
  mounted:function(){
      this.getUserList();
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
              <!-- <p>{{user.name}} <small>{{user.email}}</small>
              
            </p> -->
                
              

        </div>
      </div>
    </div>	
  </div>	

</template>