<script>
  import UserService from '../services/UserService.js';
  import ChatService from '../services/ChatService.js';
  export default {
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

  <div class="contents">
    <div class="container">
      <div class="row">
        <div class="col-md-6">

            <div  v-for="user in userList" :key="user._id">
              <p>{{user.name}} <small>{{user.email}}</small>
              <button v-on:click="chatWithUser(user.username)">Chat</button>
            </p>
                
            </div>
              

        </div>
      </div>
      <div class="row">
          <div class="col-md-6">
            <button class="btn btn-primary" type="button" v-on:click="goToHomePage()">Home</button>
          </div>
        </div>	
    </div>	
  </div>	

</template>