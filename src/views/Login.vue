<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        v-model.trim="email"
                        :class="{invalid: (this.v$.email.$dirty && this.v$.email.$error) }"
                   >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="this.v$.email.$dirty && this.v$.email.$error">
                    Некоректно введен Email
                </small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        v-model.trim="password"
                        :class="{invalid: (this.v$.password.$dirty && this.v$.password.$invalid) }"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-if="this.v$.password.$dirty && this.v$.password.$error">
                    Пароль не должен быть меньше 6 символов
                </small>
            </div>
        </div>
<!--        <pre>{{this.v$.password}}</pre>-->
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Нет аккаунта?
                <router-link
                    to="/register"
                >
                    Зарегистрироваться
                </router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import { email, required, minLength } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'

    export default {
        name: "Login",
        data(){
            return{
                password: '',
                email: '',
            }
        },
        setup: () => ({ v$: useVuelidate() }),
        validations: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
        methods:{
            submitHandler(){
                if(this.v$.$invalid){
                    this.v$.$touch()
                    return;
                }
                this.$router.push('/');
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>