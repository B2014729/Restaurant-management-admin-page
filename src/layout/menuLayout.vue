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
