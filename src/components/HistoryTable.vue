<template>
    <section>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Категория</th>
                <th>Тип</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(record, idx) of records" :key="record.id">
                <td>{{idx + 1}}</td>
                <td>{{currencyFilter(record.amount)}}</td>
                <td>{{dateFilter(record.date, 'datetime')}}</td>
                <td>{{record.categoryName}}</td>
                <td>
                    <span class="white-text badge"
                          :class="[record.typeClass]"
                    >{{record.typeText}}</span>
                </td>
                <td>
                    <button
                            class="btn-small btn"
                            @click="this.$router.push(`/detail-record/${record.id}`)"
                            v-tooltip="'Посмотреть запись'"
                    >
                        <i class="material-icons">open_in_new</i>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    import {currencyFilter} from "../utils/currency";
    import dateFilter from "../utils/dateFilter";

    export default {
        name: "HistoryTable",
        props:{
            records:{
                required: true,
                type: Array
            }
        },
        methods:{
            currencyFilter,
            dateFilter
        }
    }
</script>

<style scoped>

</style>