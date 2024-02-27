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
                    <ListDishPage v-if="list"></ListDishPage>
                    <UpdateMenuPage v-if="updatemenu"></UpdateMenuPage>
                    <EditDishPage v-if="edit" :id="id"></EditDishPage>
                    <CreateDishPage v-if="create"></CreateDishPage>
                    <MenuPage v-if="menu"></MenuPage>
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
import ListDishPage from '@/pages/menuManager/listDishPage.vue';
import UpdateMenuPage from '@/pages/menuManager/updateMenuPage.vue';
import EditDishPage from '@/pages/menuManager/editDishPage.vue';
import CreateDishPage from '@/pages/menuManager/createDishPage.vue';
import MenuPage from '@/pages/menuManager/menuPage.vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        ListDishPage,
        UpdateMenuPage,
        EditDishPage,
        CreateDishPage,
        MenuPage
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
        let menu = ref(false);
        let updatemenu = ref(false);

        return { list, create, edit, menu, updatemenu };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'menu-page':
                    this.menu = true;
                    this.create = this.edit = this.list = this.updatemenu = false;
                    break;
                case 'update-menu-page':
                    this.updatemenu = true;
                    this.create = this.edit = this.menu = this.list = false;
                    break;
                case 'list-dish-page':
                    this.list = true;
                    this.create = this.edit = this.menu = this.updatemenu = false;
                    break;
                case 'create-dish-page':
                    this.create = true;
                    this.updatemenu = this.edit = this.menu = this.list = false;
                    break;
                case 'update-dish-page':
                    this.edit = true;
                    this.create = this.updatemenu = this.menu = this.list = false;
                    break;
                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'list-dish-page':
                this.list = true;
                break;
            case 'menu-page':
                this.menu = true;
                break;
            case 'update-menu-page':
                this.updatemenu = true;
                break;
            case 'create-dish-page':
                this.create = true;
                break;
            case 'update-dish-page':
                this.edit = true;
                break;
            default:
                break;
        }
    },
}
</script>

