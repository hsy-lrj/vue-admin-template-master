import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'


export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]
    },
    // 讲师管理模块
    {
        path: '/teacher',
        component: Layout,
        redirect: '/example/table',
        name: '讲师管理',
        meta: { title: '讲师管理', icon: 'example' },
        children: [{
                path: 'list',
                name: '讲师列表',
                component: () =>
                    import ('@/views/edu/teacher/list'),
                meta: { title: '讲师列表', icon: 'table' }
            },
            {
                path: 'save',
                name: '添加讲师',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '添加讲师', icon: 'tree' }
            },
            {
                path: 'edit/:id',
                name: '编辑讲师',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '编辑讲师', noCache: true },
                hidden: true
            }
        ]
    },
    //课程分类模块
    {
        path: '/subject',
        component: Layout,
        redirect: '/subject/list',
        name: '讲师管理',
        meta: { title: '课程分类管理', icon: 'example' },
        children: [{
                path: 'list',
                name: '课程分类课程',
                component: () =>
                    import ('@/views/edu/subject/list'),
                meta: { title: '课程分类课程', icon: 'table' }
            },
            {
                path: 'save',
                name: '添加课程分类',
                component: () =>
                    import ('@/views/edu/subject/save'),
                meta: { title: '添加课程分类', icon: 'tree' }
            }
        ]
    },
    // 课程管理
    {
        path: '/course',
        component: Layout,
        redirect: '/edu/course/list',
        name: 'Course',
        meta: { title: '课程管理', icon: 'form' },
        children: [{
                path: 'list',
                name: 'EduCourseList',
                component: () =>
                    import ('@/views/edu/course/list'),
                meta: { title: '课程列表' }
            },
            {
                path: 'info',
                name: 'EduCourseInfo',
                component: () =>
                    import ('@/views/edu/course/info'),
                meta: { title: '发布课程' }
            },
            {
                path: 'info/:id',
                name: 'EduCourseInfoEdit',
                component: () =>
                    import ('@/views/edu/course/info'),
                meta: { title: '编辑课程基本信息', noCache: true },
                hidden: true //表示路由隐藏
            },
            {
                path: 'chapter/:id',
                name: 'EduCourseChapterEdit',
                component: () =>
                    import ('@/views/edu/course/chapter'),
                meta: { title: '编辑课程大纲', noCache: true },
                hidden: true
            },
            {
                path: 'publish/:id',
                name: 'EduCoursePublishEdit',
                component: () =>
                    import ('@/views/edu/course/publish'),
                meta: { title: '发布课程', noCache: true },
                hidden: true
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})