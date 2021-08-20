<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте</span>

                <p v-for="cur of currencies"
                   :key="cur"
                   :id="cur"
                   class="currency-line">
                    <span>
                        {{currencyFilter(getCurrency(cur), cur)}}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HomeBill",
        props:['rates'],
        data(){
          return{
              currencies: ['RUB', 'USD', 'EUR']
          }
        },
        methods:{
            getCurrency(currency){
                return Math.floor(this.base * this.rates[currency])
            },
            currencyFilter(val, currency="RUB"){
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency
                }).format(val)
            }
        },
        computed:{
            ...mapGetters('info', ['info']),
            base(){
                return this.info.bill / (this.rates['RUB'] / this.rates['EUR'] )
            },
        },
    }
</script>

<style scoped>

</style>