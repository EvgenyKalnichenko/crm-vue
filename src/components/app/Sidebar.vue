<template>
    <ul class="sidenav app-sidenav" :class="{open: modelValue}">
        <li v-for="link in links" :key="link.url">
            <router-link
                    active-class="active"
                    :to="link.url">
                {{link.title}}
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Sidebar",
        props: {
            modelValue: {
                type: Boolean,
                detail: true
            }
        },
        data() {
            return {
                links: [
                    {title: 'Счет', url: '/'},
                    {title: 'История', url: '/history'},
                    {title: 'Планирование', url: '/planning'},
                    {title: 'Новая запись', url: '/record'},
                    {title: 'Категории', url: '/categories'}
                ]
            }
        }
    }
</script>

<style scoped>
.sidenav a.active {
    background: aliceblue;
}
</style>