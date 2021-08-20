<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('navbarToggle')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{date}}</span>
            </div>
            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                            class="dropdown-trigger black-text"
                            href="#"
                            data-target="dropdown"
                            @click.prevent=""
                    >
                        USER NAME
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <li>
                            <router-link
                                    class="black-text"
                                    to="/Profile"
                            >
                                <i class="material-icons">account_circle</i>Профиль
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a href="#" class="black-text" @click.prevent="exit">
                                <i class="material-icons">assignment_return</i>Выйти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
<!--data-target="dropdown"-->
<script>
    import M from 'materialize-css'
    import {mapActions} from "vuex";
    import dateFilter from "../../utils/dateFilter";

    export default {
        name: "Navbar",
        data(){
          return{
              date: dateFilter(new Date(), 'datetime'),
              interval: null,
              dropdown: null
          }
        },
        methods:{
            ...mapActions('auth', ['logout']),
            exit(){
                this.logout();
                this.$router.push('/login?message=logout')
            },
        },
        mounted() {
            this.dropdown = M.Dropdown.init(document.querySelector('.dropdown-trigger'),{
                constrainWidth: true
            })
            this.interval = setInterval(()=> {
                this.date = dateFilter(new Date(), 'datetime');
            },1000)
        },
        unmounted() {
            console.log('unmounted')
            clearInterval(this.interval);
            if(this.dropdown && this.dropdown.destroy){
                this.dropdown.destroy()
            }
        }
    }
</script>

<style scoped>

</style>