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
                    <PersonalInfoPage v-if="personalInfor"></PersonalInfoPage>
                    <NotifycationPage v-if="notification"></NotifycationPage>
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

import PersonalInfoPage from '@/pages/personalPage/personalInfoPage.vue';
import NotifycationPage from '@/pages/personalPage/notifycationPage.vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        PersonalInfoPage,
        NotifycationPage
    },

    setup() {
        let personalInfor = ref(false);
        let notification = ref(false);

        return { personalInfor, notification };
    },

    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            switch (this.$route.name) {
                case 'personal-page':
                    this.personalInfor = true;
                    this.notification = false;
                    break;
                case 'notifycation-page':
                    this.notification = true;
                    this.personalInfor = false;
                    break;
                default:
                    break;
            }
        }
    },

    created() {
        switch (this.$route.name) {
            case 'personal-page':
                this.personalInfor = true;
                break;
            case 'notifycation-page':
                this.notification = true;
                break;
            default:
                break;
        }
    },
}
</script>
