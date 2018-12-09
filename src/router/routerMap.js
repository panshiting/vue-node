export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home'),
        name: 'Home',
        meta: {
          title: '首页'
        }
      },
      {
        path: '/list',
        component: () => import('@/views/tableList'),
        name: 'TableList',
        meta: {
          title: '列表'
        }
      },
      {
        path: '/list/add',
        component: () => import('@/views/tableList/TableAdd'),
        name: 'TableAdd',
        meta: {
          title: '新增'
        }
      },
      {
        path: '/list/edit/:id',
        component: () => import('@/views/tableList/TableAdd'),
        name: 'TableAdd',
        meta: {
          title: '编辑'
        }
      },
      {
        path: '/test1',
        component: () => import('@/views/test/test1'),
        name: 'Test1',
        meta: {
          title: '测试一'
        }
      },
      {
        path: '/test2',
        component: () => import('@/views/test/test2'),
        name: 'Test2',
        meta: {
          title: '测试二'
        }
      }
    ]
  }
]
