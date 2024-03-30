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
                    <ListGoodsPage v-if="list"></ListGoodsPage>
                    <CreateGoodsPage v-if="create"></CreateGoodsPage>
                    <EditGoodsPage :id="id" v-if="edit"></EditGoodsPage>
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
import ListGoodsPage from '@/pages/goodsManager/listGoodsPage.vue';
import CreateGoodsPage from '@/pages/goodsManager/createGoodsPage.vue';
import EditGoodsPage from '@/pages/goodsManager/editGoodsPage.vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        ListGoodsPage,
        CreateGoodsPage,
        EditGoodsPage
    },

    props: {
        id: {
            type: String,
        }
    },

    setup() {
        let list = ref(false);
        let create = ref(false);
        let edit = ref(false);

        return { list, create, edit };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'goods-page':
                    this.list = true;
                    this.create = false;
                    this.edit = false;
                    break;
                case 'create-goods-page':
                    this.create = true;
                    this.list = false;
                    this.edit = false;
                    break;
                case 'update-goods-page':
                    this.create = false;
                    this.list = false;
                    this.edit = true;
                    break;
                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'goods-page':
                this.list = true;
                break;
            case 'create-goods-page':
                this.create = true;
                break;
            case 'update-goods-page':
                this.edit = true;
                break;
            default:
                break;
        }
    },
}
</script>
