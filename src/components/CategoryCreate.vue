<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>
            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: this.v$.title.$dirty && this.v$.title.$invalid}"
                    >
                    <label for="name">Название</label>
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
<!--                <pre>{{this.v$.limit}}</pre>-->
                <button class="btn waves-effect waves-light" type="submit">
                    Создать
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import { required, minValue } from '@vuelidate/validators'
    import {useVuelidate} from "@vuelidate/core";
    import M from 'materialize-css'
    import {mapActions} from "vuex";

    export default {
        name: "CategoryCreate",
        data(){
            return{
                title:'',
                limit: 100
            }
        },
        setup: () => ({ v$: useVuelidate() }),
        validations:{
            title: {required},
            limit: {minValue: minValue(100)}
        },
        methods:{
            ...mapActions(['createCategory']),
            async submitHandler(){
                if(this.v$.$invalid){
                    this.v$.$touch();
                    return
                }
                try {
                    const category = await this.createCategory({
                        title: this.title,
                        limit: this.limit
                    })

                    this.$emit('created', category)
                    this.v$.$reset();
                    this.title = '';
                    this.limit = 100;
                    this.$message(`Добавлена категория: ${category.title}`);
                }catch (e) {
                    console.log(e)
                }

            }
        },
        mounted() {
            M.updateTextFields()
        }
    }
</script>

<style scoped>

</style>