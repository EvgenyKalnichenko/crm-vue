<template>
    <ul class="sidenav app-sidenav" :class="{open: modelValue}">
        <router-link  v-for="link in links" :key="link.url"
                :to="link.url"
                custom
                v-slot="{ href, navigate, isActive,}">
            <li :class="[isActive && 'active']">
                <a :href="href" @click="navigate">{{ link.title }}</a>
            </li>
        </router-link>
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