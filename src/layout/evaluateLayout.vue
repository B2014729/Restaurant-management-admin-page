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
                    <EvaluesManagerPage v-if="evaluate"></EvaluesManagerPage>
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
import EvaluesManagerPage from '@/pages/evaluateManagerPage.vue';


export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        EvaluesManagerPage
    },


    setup() {
        let evaluate = ref(false);

        return { evaluate, };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'evalues-page':
                    this.evaluate = true;
                    // this.create = this.edit = false;
                    break;

                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'evalues-page':
                this.evaluate = true;
                break;
            // case 'create-supplier-page':
            //     this.create = true;
            //     break;
            // case 'update-supplier-page':
            //     this.edit = true;
            //     break;
            default:
                break;
        }
    },
}
</script>
