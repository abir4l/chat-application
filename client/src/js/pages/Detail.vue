<script>
    import service from '../services/DetailService.js';
    import store from '../store/store.js'; // needed to use this way because the only way to access store inside beforeRouteEnter is to import store

    export default {
        components: {},
        data: function () {
            return {
                pageTitle: " Detail ",
                name: '',
                email: '',
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
    <div class="contents">

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>{{ pageTitle }}</h1>
                    <button v-on:click='goBack()'>Back</button>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-6">
                    <p>{{name}}
                        <small>{{email}}</small>
                    </p>

                </div>
            </div>


        </div>
    </div>
</template>
