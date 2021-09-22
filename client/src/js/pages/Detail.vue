<script>
    import service from '../services/DetailService.js';
    import nav from '../components/Navigation.vue'
    import store from '../store/store.js'; // needed to use this way because the only way to access store inside beforeRouteEnter is to import store

    export default {
        components: {'navigation':nav},
        data: function () {
            return {
                pageTitle: " Detail ",
                name: '',
                email: '',
                username:''
            };
        },
        mounted: async function () {
            let data;
            let details = service.getDetails();
            try {
                data = await details;
            } catch (e) {
                console.log(e.message);
                return;
            }
            this.name = data.data.name;
            this.email = data.data.email;
            this.username = data.data.username;

        },
        methods: {

            goBack: function () {
                this.$router.push('/')
            }

        }

    }
</script>
<style>

</style>
<template>
    <div class="contents mt-5">

        <div class="container">
            <div class="">
                    <div class="row">
                <div class="col-md-6 center-alignment">
                    <navigation></navigation>
                </div>
            </div>
            <div class="row mt-5">
                <div class="detail-wrapper col-md-5">
                    <div class="detail-contents">
                        <div class="user-profile-pic">
                                    <span>{{name.charAt(0).toUpperCase()}}</span>
                            </div>
                            
                            <div>
                                <div>
                                    <span class="mr-4 display-inline-block width-80 text-color-grey">Name</span>
                                    <span>{{name}}</span>
                                </div>
                                <div class="mt-2">
                                    <span class="mr-4 display-inline-block width-80 text-color-grey">Email</span>
                                    <span>{{email}}</span>
                                </div>
                                <div class="mt-2">
                                    <span class="mr-4 display-inline-block width-80 text-color-grey">Username</span>
                                    <span>{{username}}</span>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-primary-custom btn-block">Change Password</button>
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
            


        </div>
    </div>
</template>
