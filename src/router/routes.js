
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/main', component: () => import('pages/IndexPage.vue') },
      { path: '/messagesend', component: () => import('pages/messageSend.vue') },
      { path: '/messagedel', component: () => import('pages/messageDel.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
