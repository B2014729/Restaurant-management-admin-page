<template>
    <div class="container-fluid">
        <div class="row mt-2">
            <div class="col-md-2 col-12">
                <div class="sidernav p-2  ps-4">
                    <Logo></Logo>
                    <hr>
                    <NavComponent></NavComponent>
                </div>
            </div>
            <div class="col-md-10 col-12">
                <HeaderComponent></HeaderComponent>
                <hr>
                <div style="min-height: 638px ;background-color: #e8e8e8cb;">
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
<style scoped>
.sidernav {
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
}

.sidernav::-webkit-scrollbar {
    width: 5px;
    background-color: #151515;
}

.sidernav::-webkit-scrollbar-track {
    background-color: rgb(237, 237, 237);
}

.sidernav::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
