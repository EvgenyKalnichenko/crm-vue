<template>
    <div class="grey darken-1 empty-layout">
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import messages from "../utils/messages";

    export default {
        name: "EmptyLayout",
        computed:{
            ...mapGetters(['error']),
        },
        watch:{
            error(fbError){
                console.log('fbError',fbError);
                this.$error(messages[fbError.code] || 'Что то пошло не так')
            }
        }
    }
</script>

<style scoped>

</style>