<template>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <div class="row">
            <CategoryCreate @created="addNewCategory"/>
            <CategoryEdit/>
        </div>
    </section>
</template>

<script>
    import CategoryEdit from "../components/CategoryEdit";
    import CategoryCreate from "../components/CategoryCreate";
    export default {
        name: "categories",
        data(){
            return{
                categories:[]
            }
        },
        methods:{
            addNewCategory(category){
                console.log('addNewCategory')
                this.categories.push(category)
                console.log(this.categories);
            }
        },
        components:{
            CategoryEdit,
            CategoryCreate
        }
    }
</script>

<style scoped>

</style>