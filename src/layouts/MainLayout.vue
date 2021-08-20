<template>
    <Navbar @navbarToggle="isOpen = !isOpen"/>
    <Sidebar v-model="isOpen"/>
    <div class="app-main-layout">
        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                <router-view></router-view>
            </div>
        </main>
        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/app/Navbar";
    import Sidebar from "../components/app/Sidebar";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "MainLayout",
        data(){
          return{
              isOpen: true
          }
        },
        methods:{
            ...mapActions('info', ['fetchInfo']),
        },
        async mounted() {
            // console.log(this.info)
            if(this.info){
                await this.fetchInfo()
            }
        },
        components:{
            Navbar,
            Sidebar
        },
        computed:{
            ...mapGetters('info', ['info']),
        }
    }
</script>

<style scoped>

</style>