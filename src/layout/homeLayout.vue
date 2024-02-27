<template>
    <div class="container-fluid">
        <div class="row mt-2">
            <div class="col-md-2 col-12">
                <Logo></Logo>
                <hr>
                <NavComponent></NavComponent>
            </div>
            <div class="col-md-10 col-12">
                <HeaderComponent></HeaderComponent>
                <hr>
                <div style="min-height: 640px ;background-color: #e8e8e8cb;">
                    <homePage v-if="home"></homePage>
                    <profitPage v-if="profit"></profitPage>
                    <revenuePage v-if="revenue"></revenuePage>
                    <consumerPage v-if="consumer"></consumerPage>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '@/components/logoComponent.vue';
import HeaderComponent from '@/components/headerComponent.vue';
import NavComponent from '@/components/navComponent.vue';

import homePage from '@/pages/homePage/homePage.vue';
import revenuePage from '@/pages/homePage/revenuePage.vue';
import profitPage from '@/pages/homePage/profitPage.vue';
import consumerPage from '@/pages/homePage/consumerPage.vue';

import { ref } from 'vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        homePage, revenuePage, profitPage, consumerPage,
    },
    setup() {
        let home = ref(false);
        let consumer = ref(false);
        let revenue = ref(false);
        let profit = ref(false);

        return { home, consumer, revenue, profit };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'home-page':
                    this.home = true;
                    this.revenue = false;
                    this.profit = false;
                    this.consumer = false;
                    break;
                case 'profit-page':
                    this.profit = true;
                    this.home = false;
                    this.revenue = false;
                    this.consumer = false;
                    break;
                case 'revenue-page':
                    this.revenue = true;
                    this.home = false;
                    this.profit = false;
                    this.consumer = false;
                    break;
                case 'consumer-page':
                    this.consumer = true;
                    this.home = false;
                    this.profit = false;
                    this.revenue = false;
                    break;
                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'home-page':
                this.home = true;
                break;
            case 'profit-page':
                this.profit = true;
                break;
            case 'revenue-page':
                this.revenue = true;
                break;
            case 'consumer-page':
                this.consumer = true;
                break;
            default:
                break;
        }
        console.log(this.$route.name);
    },
}

</script>