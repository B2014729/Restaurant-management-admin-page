import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: '/',
        name: 'login-page',
        component: () => import('@/pages/loginPage.vue'),
    },

    //Personal manager page--------------------------------------------
    {
        path: '/ca-nhan',
        name: 'personal-page',
        component: () => import('@/layout/personalLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                console.log(123);
                next('/');
            }
            next();
        }
    },

    {
        path: '/thong-bao',
        name: 'notifycation-page',
        component: () => import('@/layout/personalLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                console.log(123);
                next('/');
            }
            next();
        }
    },

    //Route home page--------------------------------------------
    {
        path: '/trang-chu',
        name: 'home-page',
        component: () => import('@/layout/homeLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/doanh-thu',
        name: 'revenue-page',
        component: () => import('@/layout/homeLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/loi-nhuan',
        name: 'profit-page',
        component: () => import('@/layout/homeLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/cong-no',
        name: 'indebt-page',
        component: () => import('@/layout/homeLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/khach-hang',
        name: 'consumer-page',
        component: () => import('@/layout/homeLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    //Bill manager page--------------------------------------------
    {
        path: '/hoa-don',
        name: 'bill-manager-page',
        component: () => import('@/layout/billLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    //Staff manager page--------------------------------------------
    {
        path: '/danh-sach-nhan-vien',
        name: 'list-staff-page',
        component: () => import('@/layout/staffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/thong-tin-luong',
        name: 'salary-page',
        component: () => import('@/layout/staffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/lich-lam-viec',
        name: 'calendrier-page',
        component: () => import('@/layout/staffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/them-nhan-vien',
        name: 'create-staff-page',
        component: () => import('@/layout/staffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/cap-nhat-nhan-vien/:id',
        name: 'update-staff-page',
        component: () => import('@/layout/staffLayout.vue'),
        props: true,
        // beforeEnter: (to, from, next) => {
        //     if (!store.state.user || (store.state.user.quyentruycap != 5)) {
        //       
        //         next('/');
        //     }
        //     next();
        // },
    },
    {
        path: '/xep-lich-lam-viec',
        name: 'arrange-work-staff-page',
        component: () => import('@/layout/staffLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    //Supplier manager page--------------------------------------------
    {
        path: '/nha-cung-cap',
        name: 'supplier-page',
        component: () => import('@/layout/supplierLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/them-nha-cung-cap',
        name: 'create-supplier-page',
        component: () => import('@/layout/supplierLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/nha-cung-cap/:id',
        name: 'update-supplier-page',
        component: () => import('@/layout/supplierLayout.vue'),
        props: true,
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        },
    },

    //Payment manager page--------------------------------------------
    {
        path: '/phieu-chi',
        name: 'payment-page',
        component: () => import('@/layout/paymentLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/lap-phieu-chi',
        name: 'create-payment-page',
        component: () => import('@/layout/paymentLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    //Menu manager page--------------------------------------------
    {
        path: '/danh-sach-mon',
        name: 'list-dish-page',
        component: () => import('@/layout/menuLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/them-mon',
        name: 'create-dish-page',
        component: () => import('@/layout/menuLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/cap-nhat-mon/:id',
        name: 'update-dish-page',
        props: true,
        component: () => import('@/layout/menuLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        },
    },
    {
        path: '/menu',
        name: 'menu-page',
        component: () => import('@/layout/menuLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/chinh-sua-menu',
        name: 'update-menu-page',
        component: () => import('@/layout/menuLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    //Evalues manager page--------------------------------------------
    {
        path: '/danh-gia',
        name: 'evalues-page',
        component: () => import('@/layout/evaluateLayout.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    //Other route
    {
        path: '/ung-dung',
        name: 'application',
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },

    {
        path: '/quan-li-thong-tin',
        name: 'information-manager',
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
    },
    {
        path: '/cai-dat',
        name: 'setting',
        beforeEnter: (to, from, next) => {
            if (!store.state.user || (store.state.user.quyentruycap != 5)) {
                next('/');
            }
            next();
        }
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