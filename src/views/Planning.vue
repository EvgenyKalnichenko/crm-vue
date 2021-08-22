<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{currencyFilter(this.info.bill)}}</h4>
        </div>
        <loader v-if="loading"/>
        <p v-else-if="!categories.length" class="center">
            Категорий пока нет
            <router-link to="categories">Добавить новую категорию</router-link>
        </p>
        <section v-else>
            <div v-for="cat of this.categories" :key="cat.id">
                <p>
                    <strong>{{cat.title}}:</strong>
                    {{currencyFilter(cat.spend)}} из {{currencyFilter(cat.limit)}}
                </p>
                <div class="progress" v-tooltip="cat.tooltip">
                    <div
                            class="determinate"
                            :class="[cat.progressColor]"
                            :style="{width: cat.progressPercent+'%'}"
                    >{{cat.progressPercent}}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Loader from "../components/app/Loader";
    import {currencyFilter} from "../utils/currency";

    export default {
        name: "Planning",
        components: {Loader},
        data() {
            return {
                loading: true,
                categories: []
            }
        },
        methods: {
            ...mapActions(['fetchCategory']),
            ...mapActions('record', ['fetchRecords']),
            currencyFilter
        },
        computed: {
            ...mapGetters('info', ['info']),
        },
        async mounted() {
            const records = await this.fetchRecords();
            const categories = await this.fetchCategory();

            this.categories = categories.map(category => {
                const spend = records
                    .filter(r => r.categoryId === category.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)
                const percent = 100 * spend / category.limit;
                const progressPercent = percent > 100 ? 100 : percent;
                const progressColor = percent < 50
                    ? 'green'
                    : percent < 100 ? 'yellow' : 'red';
                const tooltipValue = category.limit - spend;
                const tooltip = `${tooltipValue < 0 ? 'Превышение на': 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;

                return{
                    ...category,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltip
                }
            })
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>