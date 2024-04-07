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
                    <listStaffPage v-if="list"></listStaffPage>
                    <calendrierStaffPage v-if="calendrier"></calendrierStaffPage>
                    <salaryStaffPage v-if="salary"></salaryStaffPage>
                    <createStaffPage v-if="create"></createStaffPage>
                    <editStaffPage v-if="edit" :id="id"></editStaffPage>
                    <arrangeWorkStaffPage v-if="arrange"></arrangeWorkStaffPage>
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

import listStaffPage from '@/pages/staffManager/listStaffPage.vue';
import salaryStaffPage from '@/pages/staffManager/salaryStaffPage.vue';
import createStaffPage from '@/pages/staffManager/createStaffPage.vue';
import editStaffPage from '@/pages/staffManager/editStaffPage.vue';
import calendrierStaffPage from '@/pages/staffManager/calendrierStaffPage.vue';
import arrangeWorkStaffPage from '@/pages/staffManager/arrangeWorkStaffPage.vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        listStaffPage, createStaffPage, editStaffPage, salaryStaffPage, calendrierStaffPage, arrangeWorkStaffPage
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
        let salary = ref(false);
        let calendrier = ref(false);
        let arrange = ref(false);

        return { list, create, edit, salary, calendrier, arrange };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'list-staff-page':
                    this.list = true;
                    this.create = this.edit = this.salary = this.calendrier = this.arrange = false;
                    break;
                case 'salary-page':
                    this.salary = true;
                    this.create = this.edit = this.list = this.calendrier = this.arrange = false;
                    break;
                case 'calendrier-page':
                    this.calendrier = true;
                    this.create = this.edit = this.salary = this.list = this.arrange = false;
                    break;
                case 'create-staff-page':
                    this.create = true;
                    this.calendrier = this.edit = this.salary = this.list = this.arrange = false;
                    break;
                case 'update-staff-page':
                    this.edit = true;
                    this.create = this.calendrier = this.salary = this.list = this.arrange = false;
                    break;
                case 'arrange-work-staff-page':
                    this.arrange = true;
                    this.create = this.edit = this.salary = this.list = this.calendrier = false;
                    break;
                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'list-staff-page':
                this.list = true;
                break;
            case 'salary-page':
                this.salary = true;
                break;
            case 'calendrier-page':
                this.calendrier = true;
                break;
            case 'create-staff-page':
                this.create = true;
                break;
            case 'update-staff-page':
                this.edit = true;
                break;
            case 'arrange-work-staff-page':
                this.arrange = true;
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