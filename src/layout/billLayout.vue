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
                    <billManagerPage> </billManagerPage>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Logo from '@/components/logoComponent.vue';
import HeaderComponent from '@/components/headerComponent.vue';
import NavComponent from '@/components/navComponent.vue';
import billManagerPage from '@/pages/billManagerPage.vue';

export default {
    components: {
        Logo, HeaderComponent, NavComponent,
        billManagerPage,
    }
}
</script>
