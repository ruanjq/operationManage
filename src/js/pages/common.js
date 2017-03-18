import {ViewManage,MenuManage} from '../modules/viewMenu.js';
import { dateFormat} from '../modules/util.js';
import { UserManage } from '../modules/userManage.js';



$(document).ready(function() {

	(function(){
		let Sys = {};
	    let ua = navigator.userAgent.toLowerCase();
	    let s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
	    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	    if (Sys.ie){
	    	layer.alert('抱歉,该管理系统暂不支持IE 浏览器或低版本浏览器,请使用较新版的Chrome或火狐浏览器打开', {
				icon: 5,
			})
	        return;
	    };
	})();

	
	let userManage = new UserManage();


	let menuManage = new MenuManage();

	userManage.loginCheck().then(res => {

		$(".js_user_name").html(`你好: ${res.data.admin_info.username}【${res.data.admin_info.real_name}】`);

		
		menuManage.renderMenu(res.data.menu);
		
		let viewManage = viewManage = new ViewManage();
		viewManage.bindRouter( currentMenu =>{
	    	let temp = { menuData: menuManage.menuData, currentMenu: currentMenu };
	    	menuManage.autoToggleSideMenu(temp);
	    });

	    menuManage.init();

		viewManage.init().then(res => {
		});

	});

    

	$(".js_login_out").on('click',function(){
		userManage.logout();
	});

	$(".js_go_top").on('click',function(){
		$('.js_view_content').animate({scrollTop: '0px'}, 350);
	});


	
});




	







