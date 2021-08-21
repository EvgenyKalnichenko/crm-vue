<template>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <loader v-if="loading"/>
        <div class="row" v-else>
            <CategoryCreate @created="addNewCategory"/>
            <CategoryEdit
                    v-if="categories.length"
                :categories='categories'
                :key="categories.length + updateCount"
                @updated="updateCategories"
            />
            <p v-else class="center">Категорий пока нет</p>
        </div>
    </section>
</template>

<script>
    import CategoryEdit from "../components/CategoryEdit";
    import CategoryCreate from "../components/CategoryCreate";
    import {mapActions} from "vuex";
    import Loader from "../components/app/Loader";

    export default {
        name: "categories",
        data(){
            return{
                categories:[],
                loading: true,
                updateCount: 0
            }
        },
        methods:{
            ...mapActions(['fetchCategory']),
            addNewCategory(category){
                this.categories.push(category)
                // console.log(this.categories);
            },
            updateCategories(category){
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title;
                this.categories[idx].limit = category.limit;
                this.updateCount++
            }
        },
        async mounted(){
            this.categories = await this.fetchCategory();
            this.loading =  false;
            // console.log(this.categories);
        },
        components:{
            Loader,
            CategoryEdit,
            CategoryCreate
        }
    }
</script>

<style scoped>

</style>