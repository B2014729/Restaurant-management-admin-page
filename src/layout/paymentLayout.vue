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
                    <ListPaymentPage v-if="list"></ListPaymentPage>
                    <CreatePaymentPage v-if="create"></CreatePaymentPage>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import Logo from '@/components/logoComponent.vue';
import HeaderComponent from '@/components/headerComponent.vue';
import NavComponent from '@/components/navComponent.vue';
import ListPaymentPage from '@/pages/paymentManager/listPaymentPage.vue';
import CreatePaymentPage from '@/pages/paymentManager/createPaymentPage.vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        ListPaymentPage,
        CreatePaymentPage
    },

    setup() {
        let list = ref(false);
        let create = ref(false);

        return { list, create };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'payment-page':
                    this.list = true;
                    this.create = false;
                    break;
                case 'create-payment-page':
                    this.create = true;
                    this.list = false;
                    break;
                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'payment-page':
                this.list = true;
                break;
            case 'create-payment-page':
                this.create = true;
                break;
            default:
                break;
        }
    },
}
</script>
