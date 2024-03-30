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
                    <revenuePage v-if="revenue"></revenuePage>
                    <profitPage v-if="profit"></profitPage>
                    <depotPage v-if="depot"></depotPage>
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
import depotPage from '@/pages/homePage/depotPage.vue';
import consumerPage from '@/pages/homePage/consumerPage.vue';

import { ref } from 'vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        homePage, revenuePage, profitPage, consumerPage, depotPage,
    },
    setup() {
        let home = ref(false);
        let consumer = ref(false);
        let revenue = ref(false);
        let profit = ref(false);
        let depot = ref(false);

        return { home, consumer, revenue, profit, depot };
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
                    this.depot = false;
                    break;
                case 'profit-page':
                    this.profit = true;
                    this.home = false;
                    this.revenue = false;
                    this.consumer = false;
                    this.depot = false;
                    break;
                case 'depot-page':
                    this.revenue = false;
                    this.home = false;
                    this.profit = false;
                    this.consumer = false;
                    this.depot = true;
                    break;
                case 'revenue-page':
                    this.revenue = true;
                    this.home = false;
                    this.profit = false;
                    this.consumer = false;
                    this.depot = false;
                    break;
                case 'consumer-page':
                    this.consumer = true;
                    this.home = false;
                    this.profit = false;
                    this.revenue = false;
                    this.depot = false;
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
            case 'revenue-page':
                this.revenue = true;
                break;
            case 'profit-page':
                this.profit = true;
                break;
            case 'depot-page':
                this.depot = true;
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