<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>

            <button class="btn waves-effect waves-light btn-small"
                @click="refresh"
            >
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <Loader v-if="loading"/>
        <div class="row" v-else>
            <HomeBill
                :rates="this.$store.currency.rates"
            />
            <HomeCurrency
                :rates="this.$store.currency.rates"
                :date="this.$store.currency.date"
            />
        </div>
    </div>
</template>

<script>
    import HomeBill from "../components/HomeBill";
    import HomeCurrency from "../components/HomeCurrency";
    import Loader from "../components/app/Loader";
    import {mapActions} from "vuex";

    export default {
        name: "Home",
        data(){
            return{
                loading: true,
            }
        },
        methods:{
            ...mapActions(['fetchCurrency']),
            async refresh(){
                this.loading = true;
                this.$store.currency = await this.fetchCurrency();
                this.loading = false;
            }
        },
        async mounted() {
            if(!this.$store.currency){
                this.$store.currency = await this.fetchCurrency();
                // console.log(this.$store.currency);
            }
            this.loading = false
        },
        components:{
            Loader,
            HomeBill,
            HomeCurrency
        }
    }
</script>

<style scoped>

</style>