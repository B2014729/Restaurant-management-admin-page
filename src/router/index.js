import { createRouter, createWebHistory } from "vue-router";

const routes = [

    //Route home page--------------------------------------------
    {
        path: '/',
        name: 'home-page',
        component: () => import('@/pages/homePage/homePage.vue'),
    },
    {
        path: '/doanh-thu',
        name: 'revenue-page',
        component: () => import('@/pages/homePage/revenuePage.vue'),
    },
    {
        path: '/loi-nhuan',
        name: 'profit-page',
        component: () => import('@/pages/homePage/profitPage.vue'),
    },
    {
        path: '/cong-no',
        name: 'indebt-page',
        component: () => import('@/pages/homePage/inDebtPage.vue'),
    },
    {
        path: '/khach-hang',
        name: 'consumer-page',
        component: () => import('@/pages/homePage/consumerPage.vue'),
    },

    //Bill manager page--------------------------------------------
    {
        path: '/hoa-don',
        name: 'bill-manager-page',
        component: () => import('@/pages/billManagerPage.vue'),
    },

    //Staff manager page--------------------------------------------
    {
        path: '/danh-sach-nhan-vien',
        name: 'list-staff-page',
        component: () => import('@/pages/staffManager/listStaffPage.vue'),
    },
    {
        path: '/thong-tin-luong',
        name: 'salary-page',
        component: () => import('@/pages/staffManager/salaryStaffPage.vue'),
    },
    {
        path: '/lich-lam-viec',
        name: 'calendrier-page',
        component: () => import('@/pages/staffManager/calendrierStaffPage.vue'),
    },
    {
        path: '/them-nhan-vien',
        name: 'create-staff-page',
        component: () => import('@/pages/staffManager/createStaffPage.vue'),
    },
    {
        path: '/cap-nhat-nhan-vien/:id',
        name: 'update-staff-page',
        component: () => import('@/pages/staffManager/editStaffPage.vue'),
        props: true
    },

    //Supplier manager page--------------------------------------------
    {
        path: '/nha-cung-cap',
        name: 'supplier-page',
        component: () => import('@/pages/supplierManager/listSupplierPage.vue'),
    },
    {
        path: '/nha-cung-cap/:id',
        name: 'update-supplier-page',
        component: () => import('@/pages/supplierManager/editSupplierPage.vue'),
    },

    //Payment manager page--------------------------------------------
    {
        path: '/phieu-chi',
        name: 'payment-page',
        component: () => import('@/pages/paymentManager/listPaymentPage.vue'),
    },
    {
        path: '/lap-phieu-chi',
        name: 'create-payment-page',
        component: () => import('@/pages/paymentManager/createPaymentPage.vue'),
    },

    //Menu manager page--------------------------------------------
    {
        path: '/danh-sach-mon',
        name: 'list-dish-page',
        component: () => import('@/pages/menuManager/listDishPage.vue'),
    },
    {
        path: '/them-mon',
        name: 'create-dish-page',
        component: () => import('@/pages/menuManager/createDishPage.vue'),
    },
    {
        path: '/cap-nhat-mon/:id',
        name: 'update-dish-page',
        component: () => import('@/pages/menuManager/editDishPage.vue'),
        props: true
    },
    {
        path: '/menu',
        name: 'menu-page',
        component: () => import('@/pages/menuManager/menuPage.vue'),
    },
    //{
    //     path: '/thong-tin-don-hang/:idOrder',
    //     name: 'order-detail',
    //     component: () => import('@/pages/orderPage.vue'),
    //     props: true,
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});

export default router;