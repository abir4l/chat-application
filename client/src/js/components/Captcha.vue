<template>
     <VueRecaptcha :sitekey="this.sitekey" :loadRecaptchaScript="true" @verify="validate"/>
 </template>
 <script>
import VueRecaptcha from 'vue-recaptcha'
import Validation from '../services/CaptchaService'
import config from '../config.js';
export default {
    components: {VueRecaptcha},
    data () {
        return {
            sitekey: config.captchaSiteKey()
        }
    },
    methods: {
        validate (response) {
            Validation.validate({Response: response}).then(result => {
            this.$emit('validate', result)
            }).catch(error => console.log(error))
        }
    }
}
</script>