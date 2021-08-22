<template>
    <Loader v-if="loading"/>
    <div v-else-if="record">
        <div class="breadcrumb-wrap">
            <router-link to="/history" class="breadcrumb">История</router-link>
            <a @click.prevent="" href="#" class="breadcrumb">
                {{record.type === 'income' ? 'Доход' : 'Расход'}}
            </a>
        </div>
        <div class="row">
            <div class="col s12 m6">
                <div class="card"
                     :class="{
                         'red': record.type === 'outcome',
                         'green': record.type === 'income',
                     }"
                >
                    <div class="card-content white-text">
                        <p>Описание: {{record.description}}</p>
                        <p>Сумма: {{currencyFilter(record.amount)}}</p>
                        <p>Категория: {{record.categoryName}}</p>
                        <small>{{dateFilter(record.date, 'datetime')}}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p v-else>Данная запись не найдена</p>
</template>

<script>
    import {mapActions} from "vuex";
    import Loader from "../components/app/Loader";
    import {currencyFilter} from "../utils/currency";
    import dateFilter from "../utils/dateFilter";

    export default {
        name: "Detail-record",
        components: {Loader},
        data(){
          return{
              record: null,
              loading: true
          }
        },
        methods:{
            ...mapActions('record',['fetchRecordById']),
            ...mapActions(['fetchCategoryById']),
            currencyFilter,
            dateFilter
        },
        async mounted(){
            const id = this.$route.params.id;
            const record = await this.fetchRecordById(id);
            console.log(record,  record.id);
            const category = await this.fetchCategoryById(record.categoryId)
            this.record = {
                ...record,
                categoryName: category.title
            }

            this.loading = false;
        }
    }
</script>

<style scoped>

</style>