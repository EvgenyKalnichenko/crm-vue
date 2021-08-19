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
            <div class="input-field">
                <input
                        id="name"
                        type="text"
                        class="validate"
                        v-model.trim="name"
                        :class="{invalid: (this.v$.name.$dirty && this.v$.password.$invalid) }"
                >
                <label for="name">Ваше имя</label>
                <small class="helper-text invalid" v-if="this.v$.name.$dirty && this.v$.name.$error">
                    Введите имя
                </small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="agree"/>
                    <span>С правилами согласен</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Зарегистрироваться
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <p class="center">
                Уже есть аккаунт?
                <router-link to="/login">Войти!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {useVuelidate} from "@vuelidate/core";
    import {email, minLength, required} from "@vuelidate/validators";

    export default {
        name: "Register",
        data(){
            return{
                password: '',
                email: '',
                name: '',
                agree: false
            }
        },
        setup: () => ({ v$: useVuelidate() }),
        validations: {
            email: {required, email,},
            password: {required, minLength: minLength(6)},
            name: {required},
            agree: {checked: v => v}
        },
        methods:{
            submitHandler(){
                if(this.v$.$invalid){
                    this.v$.$touch()
                    return;
                }

                const formData = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }

                console.log(formData)

                this.$router.push('/');
            }
        },
    }
</script>

<style scoped>

</style>