import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      // 佛大育成

      {
        path: "/",
        name: "AccountIndex",
        component: () => import("@/views/AccountManagement"),
        children:[
          {
            path:"/",
            name:"SettingAccount",
            component: () => import("@/views/AccountManagement/SettingAccount"),
            meta: { title: "帳號管理/個人設定" },
          },
          {
            path:"matched",
            name:"MatchList",
            component: () => import("@/views/AccountManagement/MatchList"),
            meta: { title: "帳號管理/查詢曾經媒合遊程和專才" },
          },
          {
            path:"detail",
            name:"PageDetail",
            component: () => import("@/views/AccountManagement/PageDetail"),
            meta: { title: "帳號管理/查詢曾經媒合遊程詳細資訊" },
          },

          
        ],
        meta: { title: "帳號管理" },
      },
      {
        path: "/talents",
        name: "TalentsIndex",
        component: () => import("@/views/TalentsManagement"),
        meta: { title: "人才管理" },
      },
      {
        path: "/service",
        name: "ServiceIndex",
        component: () => import("@/views/ServiceManagement"),
        meta: { title: "服務類型管理" },
      },
      {
        path: "/guidance",
        name: "GuidanceIndex",
        component: () => import("@/views/GuidanceManagement"),
        meta: { title: "專業輔導管理" },
      },
      {
        path: "/bill",
        name: "BillIndex",
        component: () => import("@/views/BillManagement"),
        children:[
          {
            path:"/",
            name:"ViewIndex",
            component: () => import("@/views/BillManagement/ViewIndex"),
            meta: { title: "帳務管理/總攬" },
          },
          {
            path:"/all",
            name:"ShowList",
            component: () => import("@/views/BillManagement/ShowList"),
            meta: { title: "帳務管理/查看金額資訊" },
          },
          
        ],
        meta: { title: "帳務管理" },
      },
      {
        path: "/tour",
        name: "TourIndex",
        component: () => import("@/views/TourManagement"),
        children:[
          {
            path:"new-tour",
            name:"NewTour",
            component: () => import("@/views/TourManagement/NewTour"),
            meta: { title: "遊程管理/新增遊程" },
          },
          {
            path:"tour-status",
            name:"TourStatus",
            component: () => import("@/views/TourManagement/TourStatus"),
            meta: { title: "遊程管理/遊程審核狀況" },
          },
          {
            path:"tour-draft",
            name:"TourDraft",
            component: () => import("@/views/TourManagement/TourDraft"),
            meta: { title: "遊程管理/草稿" },
          },
          {
            path:"pending-review",
            name:"PendingReview",
            component: () => import("@/views/TourManagement/PendingReview"),
            meta: { title: "遊程管理/待審核遊程" },
          },
          {
            path: 'tour-detail',
            // path: '/tour-detail/:id?',
            name:"TourDetail",
            component: () => import("@/views/TourManagement/TourDetail"),
            meta: { title: "遊程管理/遊程詳情" },
          },
          {
            path: '/tour-review',
            name:"TourReview",
            component: () => import("@/views/TourManagement/TourReview"),
            meta: { title: "遊程管理/遊程審核" },
          },
          
        ],
        meta: { title: "遊程管理" },
      },
      // 以下為創價
      {
        path: "/TestEditor",
        component: () => import("@/views/TestEditor.vue"),
      },
      {
        path: "/TestZipCode",
        component: () => import("@/views/TestZipCode.vue"),
      },
      {
        path: "/Member",
        name: "Member",
        component: () => import("@/views/Member.vue"),
      },
      { path: "/TestApi", component: () => import("@/views/TestApi.vue") },
      {
        path: "/Member-search",
        component: () => import("@/views/Member-search.vue"),
      },
      {
        path: "/activity",
        name: "ActivityManagement",
        component: () =>
          import("@/views/ActivityManagement/ActivityRuleCreate.vue"),
      },
      {
        path: "/TestInlineEditTable",
        name: "TestInlineEditTable",
        component: () => import("@/views/TestInlineEditTable.vue"),
      },
      {
        path: "/inCard",
        name: "InCard",
        component: () => import("@/views/MemberManagement/inCard.vue"),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component:()=> import('@/views/Auth/Login')

  },
  {
    path: '/signup',
    name: 'SignUp',
    component:()=> import('@/views/Auth/SignUp')

  },
  {
    path: '/forgetpasswrd',
    name: 'ForgetPwd',
    component:()=> import('@/views/Auth/ForgetPwd')

  },
  // { TestInlineEditTable
  //   path: '/activity',
  //   name: 'ActivityManagement',
  //   component: () => import('@/layouts/MainLayout.vue'),
  //   children:[
  //     {path: '/rule_create',name: 'RuleCreate', component: () => import('@/views/ActivityManagement/ActivityRuleCreate.vue')},
  //   ]
  // }
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.BASE_URL,
  routes,
});

// 全局前置守衛  // BAD
router.beforeEach((to, from, next) => {
  // 獲取 token
  let token = window.localStorage.getItem('token')
  // 
  let user = window.localStorage.getItem('user')
  
  if (token) {
    /**
     * 已登入
     * */
    // 防止重複登入
    if (to.path === '/login') {
      return next({ name: from.name ? from.name : 'Home' })
    }

    // 目前無權限驗證
    // // 其他驗證...
    // if (to.name !== 'error_404') {
    //   // 超級管理員跳過驗證
    //   if (user ) {
    //     user = JSON.parse(user)
    //     if(user.super === 1) return next()
    //   }
    //   // 驗證
    //   let rules = window.sessionStorage.getItem('rules')
    //   rules = rules ? JSON.parse(rules) : []

    //   let index = rules.findIndex((item) => {
    //     return item.rule_id > 0 && item.desc === to.name //找到表示有權限
    //   })

    //   if (index === -1) {
    //     this.$message.error('你無此權限')
    //     return next({ name: from.name ? from.name : 'error_404' }) // 跳到固定頁面-404
    //   }
    // }

    next()
  } else {
    /**
     * 未登入
     * */

    // 跳過登入頁驗證
    if (to.path === '/login'||to.path==='/signup'||to.path==='/forgetpasswrd') {
      return next()
    }
    next({ path: '/login' })
  }
  
})

export default router;
