<template>
    <div id="app">
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
    import EmptyLayout from "./layouts/EmptyLayout";
    import MainLayout from "./layouts/MainLayout";

    export default {
        name: 'App',
        computed: {
            layout() {
                // console.log(this.$route.meta)
                return (this.$route.meta.layout || 'empty')+'-layout'
            }
        },
        components: {
            MainLayout,
            EmptyLayout
        }
    }
</script>

<style>
    @import "~materialize-css/dist/css/materialize.min.css";
    @import "assets/index.css";
</style>
