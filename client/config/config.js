export default {
  outputPath: "../dist",
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true
      }
    ]
  ],
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  // cssLoaderOptions: {
  //   modules: true,
  // },
  routes: [
    {
      path: "/user",
      component: "../layouts/UserLayout",
      name: "user",
      routes: [
        {
          path: "login",
          component: "./Login"
        },
        {
          path: "signup",
          component: "./Signup"
        }
      ]
    },
    {
      path: "/",
      component: "../layouts/BasicLayout",
      routes: [
        {
          path: "/",
          name: "index",
          component: "./Index"
        },
        {
          path: "activity/:activityId/comments",
          name: "commemts",
          component: "./Index"
        }
      ]
    }
  ],
  proxy: {
    "/api": {
      target: "http://localhost:1234", //
      changeOrigin: true,
      crossDomain: true
    }
  }
};
