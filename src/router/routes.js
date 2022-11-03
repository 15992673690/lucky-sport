export const gameRoutes = [
    {
        path:"/football/:id",
        name: 'football',
        meta: {
            showHeader: true
        },
        component:()=> import('../views/football/index.vue')
    }
];

export const globalRoutes = [
    {
        path:"/",
        meta: {
            showHeader: false,
        },
        component:()=> import('../views/home/index.vue')
    }, {
        
    }, {
        path:"/my-bet",
        name: 'my-bet',
        meta: {
            showHeader: true,
            title: '我的投注'
        },
        component:()=> import('../views/my-bet/index.vue')
    }, {
        path:"/bet-detail/:id",
        name: 'bet-detail',
        meta: {
            showHeader: true,
            title: '投注详情'
        },
        component:()=> import('../views/bet-detail/index.vue')
    }, {
        path:"/search",
        name: 'search',
        meta: {
            showHeader: false,
        },
        component:()=> import('../views/search/index.vue')
    }
]

export const routes = [
    ...gameRoutes,
    ...globalRoutes
];

