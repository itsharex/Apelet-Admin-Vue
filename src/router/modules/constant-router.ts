const Layout = () => import('@/layouts/index.vue');
/**
 * name:'routerName'          	设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
        hidden: true              	当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)

        alwaysShow: true          	当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
        只有一个时，会将那个子路由当做根路由显示在侧边栏，
        若你想不管路由下面的 children 声明的个数都显示你的根路由，
        你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
        一直显示根路由(默认 false)

        title: 'title'            	设置该路由在侧边栏和面包屑中展示的名字

        icon: 'svg-name'          	设置该路由的图标

        keepAlive: true             	如果设置为true，则不会被 <keep-alive> 缓存(默认 false)

        isLink: false         		如果设置为true，则为外部链接

		linkSrc: ''					外链地址 (https:// 或 http://)

        isFixed: true               如果设置为true，则会一直固定在tag项中(默认 false)

		isFrame: false				是否内嵌iframe

        iframeSrc: ''          		需要内嵌的iframe链接地址

        activeMenu: '/dashboard'  	显示高亮的路由路径

        roles: []  					页面级别权限设置

        perms: []               	按钮级别权限设置
 }
 **/

export const constantRoutes: Array<SubMenuRouteRecordRaw> = [
	{
		path: '/',
		redirect: '/index',
		name: 'Index',
		component: Layout,
		children: [
			{
				path: '/index',
				name: 'HomePage',
				component: () => import('@/views/home/index.vue'),
				meta: {
					icon: 'HomeFilled',
					hidden: false,
					title: 'menus.homepage',
					isCache: true,
					isFixed: true,
				},
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			hidden: true,
			title: 'login.login',
		},
	},
];

export const errorRoutes: Array<SubMenuRouteRecordRaw> = [
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue'),
		meta: {
			hidden: true,
			title: '404',
		},
	},
];
