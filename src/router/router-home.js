/**
 * @createDate: 2019/12/11
 * @author: wen_dell
 * @email: wendell.chen@chinaentropy.com
 * **/

export default [
    {
        path: '/',
        redirect:{
            name: 'editor'
        }
    },
    {
        path: '/editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/editor/Editor.vue')
    },
    {
        path: '/data',
        name: 'data',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/data/Data.vue')
    },
    {
        path: '/release',
        name: 'release',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/release/Release.vue')
    }
]
