<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>
            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select v-model="current">
                        <option
                                v-for="c of categories"
                                :key="c.id"
                                :value="c.id"
                        >{{c.title}}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>
                <div class="input-field">
                    <input
                            id="namered"
                            type="text"
                            v-model="title"
                            :class="{invalid: this.v$.title.$dirty && this.v$.title.$invalid}"
                    >
                    <label for="namered">Название</label>
                    <span
                            v-if="this.v$.title.$dirty && this.v$.title.$invalid"
                            class="helper-text invalid"
                    >
                        Введите название
                    </span>
                </div>
                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model="limit"
                            :class="{invalid: this.v$.limit.$dirty && this.v$.limit.$invalid}"
                    >
                    <label for="limit">Лимит</label>
                    <span   v-if="this.v$.limit.$dirty && this.v$.limit.$invalid"
                            class="helper-text invalid"
                    >
                        Минимальная величина {{this.v$.limit.minValue.$params.min}}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>

                <button class="btn waves-light btn--delay" type="submit">
                    Удалить
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import M from 'materialize-css'
    import { required, minValue } from '@vuelidate/validators'
    import {useVuelidate} from "@vuelidate/core";
    import {mapActions} from "vuex";

    export default {
        name: "CategoryEdit",
        props:{
            categories:{
                type: Array,
                required: true,
            }
        },
        data(){
          return {
              select: null,
              title:'',
              limit: 100,
              current: null,

          }
        },
        setup: () => ({ v$: useVuelidate() }),
        validations:{
            title: {required},
            limit: {minValue: minValue(100)}
        },
        methods:{
            ...mapActions(['updateCategory']),
           async submitHandler(){
                if(this.v$.invalid){
                    this.v$.$touch();
                    return
                }

               try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.updateCategory(categoryData);
                    this.$message(`Категория ${this.title} успешно изменена`);
                    this.$emit('updated', categoryData);
               }catch (e) {
                   console.log(e)
               }
            }
        },
        created() {
            const {id, title, limit} = this.categories[0];
            this.current = id;
            this.title = title;
            this.limit = limit;
        },
        mounted() {
            this.select = M.FormSelect.init( document.querySelector('select'));
            M.updateTextFields();
        },
        unmounted() {
            if(this.select && this.select.destroy){
                this.select.destroy();
            }
        },
        watch:{
            current(value){
                console.log(value)
                const {title, limit} = this.categories.find(c => c.id === value)
                this.title = title;
                this.limit = limit;
            }
        }
    }
</script>

<style scoped>
    .btn.btn--delay{
        background: #f44336;
        margin-left: 10px;
    }
</style>