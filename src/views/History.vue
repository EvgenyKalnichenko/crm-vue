<template>
    <div class="page-title">
        <h3>История записей</h3>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!records.length">Записей пока нет <router-link to="/record">добавьте новую запись</router-link></p>
    <template v-else>
        <div class="history-chart">
            <canvas></canvas>
        </div>
        <HistoryTable  :records='records'/>
    </template>
</template>

<script>
    import HistoryTable from "../components/HistoryTable";
    import {mapActions} from "vuex";
    import Loader from "../components/app/Loader";

    export default {
        name: "History",
        data(){
          return{
              loading: true,
              records:[],
              categories:[]
          }
        },
        methods:{
            ...mapActions(['fetchCategory']),
            ...mapActions('record', ['fetchRecords']),
        },
        async mounted() {
            // this.records = await this.fetchRecords();

            const records = await this.fetchRecords();
            this.categories = await this.fetchCategory();

            this.records = records.map(record => {
                return{
                    ...record,
                    categoryName: this.categories.find(c => c.id === record.categoryId).title,
                    typeClass: record.type === 'income' ? 'green' : 'red',
                    typeText: record.type === 'income' ? 'Доход' : 'Расход',
                }
            })

            this.loading = false;
        },
        components: {Loader, HistoryTable}
    }
</script>

<style scoped>

</style>