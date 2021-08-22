<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>
        <Loader v-if="loading"/>
        <p v-else-if="!categories.length">Категорий пока нет.
            <router-link to="/categories">Добавить новую категорию</router-link>
        </p>
        <form v-else class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <select v-model="category">
                    <option
                            v-for="c in categories"
                            :key="c.id"
                            :value="c.id"
                    >{{c.title}}
                    </option>
                </select>
                <label>Выберите категорию</label>
            </div>
            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>Доход</span>
                </label>
            </p>
            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"
                    />
                    <span>Расход</span>
                </label>
            </p>
            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                        :class="{invalid: this.v$.amount.$dirty && this.v$.amount.$invalid}"
                >
                <label for="amount">Сумма</label>
                <span
                        v-if="this.v$.amount.$dirty && this.v$.amount.$invalid"
                        class="helper-text invalid">
                        Минимальное значение 1
                </span>
            </div>
            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model="description"
                        :class="{invalid: this.v$.description.$dirty && this.v$.description.$invalid}"
                >
                <label for="description">Описание</label>
                <span
                        v-if="this.v$.description.$dirty && this.v$.description.$invalid"
                        class="helper-text invalid">
                        Введите описание
                </span>
            </div>
            <!--            <pre>{{this.v$.description}}</pre>-->
            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import M from "materialize-css";
    import Loader from "../components/app/Loader";
    import {required, minValue} from '@vuelidate/validators'
    import {useVuelidate} from "@vuelidate/core";

    export default {
        name: "Record",
        components: {Loader},
        data() {
            return {
                loading: true,
                categories: [],
                category: null,
                select: null,
                type: 'income',
                amount: 1,
                description: ''
            }
        },
        setup: () => ({v$: useVuelidate()}),
        methods: {
            ...mapActions(['fetchCategory']),
            ...mapActions(['createRecord']),
            ...mapActions('info', ['updateInfo']),
            async submitHandler() {
                if (this.v$.$invalid) {
                    this.v$.$touch();
                    return;
                }
                console.log(this.info)
                if (this.canCreateRecord) {
                    try{
                        await this.createRecord({
                            categoryId: this.category,
                            amount: this.amount,
                            description: this.description,
                            type: this.type,
                            date: new Date().toJSON()
                        });

                        const bill = this.type ==='income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount

                        await this.updateInfo(bill)

                        this.$message('Запись успешно создана');
                        this.v$.$reset();
                        this.amount = 1;
                        this.description = '';
                    }catch (e) {
                        console.log(e)
                    }
                } else {
                    this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
                }
            }
        },
        computed: {
            ...mapGetters('info', ['info']),
            canCreateRecord() {
                if (this.type === 'income') {
                    return true
                }
                console.log(this.bill >= this.amount)
                return this.info.bill >= this.amount
            },
        },
        validations: {
            description: {required},
            amount: {minValue: minValue(1)}
        },
        async mounted() {

            this.categories = await this.fetchCategory();
            this.loading = false;

            if (this.categories.length) {
                this.category = this.categories[0].id
            }
            setTimeout(() => {
                this.select = M.FormSelect.init(document.querySelector('select'));
                M.updateTextFields();
            }, 0)
        },
        unmounted() {
            if (this.select && this.select.destroy) {
                this.select.destroy();
            }
        },
    }
</script>

<style scoped>

</style>