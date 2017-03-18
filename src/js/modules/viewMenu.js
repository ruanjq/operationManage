/**
 * @desc 菜单，，，视图view 管理类
 */
import { routerConfig } from './router.config.js';
import { laytplRender,objHaskey,getUrlQueryString} from './util.js';
import { Dialog } from './dialog.js';
class MenuManage {

    constructor() {
        this.menuData = [];
    }

    sideMenuToggleBind() {
        // 侧边菜单切换手风琴效果
        $(".js_menu_wrap").on('click', '.js_menu_item', function(event) {
            if ($(event.target).hasClass("sub-menu-name")) return;
            $(this).addClass('open-menu').siblings().removeClass("open-menu");
            $(this).siblings().find(".menu-name .toggle-icon").removeClass("glyphicon-menu-down");
            $(this).find(".menu-name .toggle-icon").toggleClass("glyphicon-menu-down");
            // event.stopPropagation();    //  阻止事件冒泡
        });

        $(".js_menu_wrap").on('click', '.js_menu_item .menu-name', function() {
            $(".js_menu_item .menu-name").next().stop().slideUp("fast");
            $(this).next().stop().toggle("fast");
        });


        $(".js_menu_wrap").on('click', ".js_sub_menu_wrap .sub-menu-item", function() {
            $(".js_sub_menu_wrap .sub-menu-item").removeClass("active");
            $(this).addClass('active').siblings().removeClass("active");
        });
    }


    // 导航菜单切换绑定
    navMenuToggleBind() {
        let self = this;
        $(".js_nav_menu_toggle").on('click', function() {
            self.toggle();
        });
    }

    // 窗口宽度改变自动切换
    autoToggle() {

        let [rtime, timeout, delta] = ['', false, 200];
        $(window).resize(function() {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });

        function resizeend() {
            if (new Date() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                if ($(window).width() <= 1200) {
                    $(".js_nav_menu_toggle").removeClass("leave-toggle").addClass("enter-toggle");
                    $("#side_menu").animate({ width: '0px', minWidth: '0' }, 150);
                    $("#side_menu").removeClass("leave-toggle").addClass("enter-toggle");
                } else {
                    $(".js_nav_menu_toggle").removeClass("enter-toggle").addClass("leave-toggle");
                    $("#side_menu").animate({ width: '220px', minWidth: '220px' }, 150);
                    $("#side_menu").removeClass("enter-toggle").addClass("leave-toggle");
                }
            }
        }
    }


    toggle() {
        if ($("#side_menu").hasClass("enter-toggle")) {
            $(".js_nav_menu_toggle").removeClass("enter-toggle").addClass("leave-toggle");
            $("#side_menu").animate({ width: '220px', minWidth: '220px' }, 300);
            $("#side_menu").removeClass("enter-toggle").addClass("leave-toggle");
        } else {
            $(".js_nav_menu_toggle").removeClass("leave-toggle").addClass("enter-toggle");
            $("#side_menu").animate({ width: '0px', minWidth: '0' }, 300);
            $("#side_menu").removeClass("leave-toggle").addClass("enter-toggle");
        }
    }

    // 自动展开当前菜单页面
    autoToggleSideMenu(data) {
        let [isBreak, i,j] = [false];
        data.menuData.some((elem1, index1) => {
            elem1._child.some((elem2, index2) => {
                if (data.currentMenu === elem2.menu_act) {
                    isBreak = true;
                    i = index1;
                    return true;
                }
            });
            if (isBreak) {
            	$(".js_menu_item").removeClass("open-menu");
            	$(".js_menu_item").eq(i).siblings().find(".js_sub_menu_wrap").hide();
                $(".js_menu_item").eq(i).addClass('open-menu').find(".js_sub_menu_wrap").show();
                $(".js_menu_item").eq(i).find(".toggle-icon").addClass("glyphicon-menu-down");
                $(".js_menu_item").eq(i).siblings().find(".toggle-icon").removeClass("glyphicon-menu-down");
              
                return true;
            }
        });
    }

    renderMenu(data) {
        let temp = { menuData: data, currentMenu: new ViewManage().getCacheView() },
            self = this;
        this.menuData = data;
        this.cacheMenu(data); 
        laytplRender('#sideMenuTpl', '#js_menu_wrap', temp, html => {
            self.autoToggleSideMenu(temp);
        });
    }

    cacheMenu(data){
        if(window.localStorage){
            localStorage['menu-list'] = JSON.stringify(dataFormat(data));
        }

        // 格式化菜单数据
        function dataFormat(data){
            if(!(data instanceof Array)) return;
            let result = {};
            data.forEach((item,i) => {
                item['_child'].forEach((new_item,j) => {
                    result[new_item.menu_act] = new_item;
                });
            });
            return result;
        }
    }

    init(){
    	this.sideMenuToggleBind();
        this.navMenuToggleBind();
        this.autoToggle();
    }
}




// 视图管理类
class ViewManage {
    constructor() {
        this.clearView();
        this.initView = 'listConfig';
        this.routerConfig = routerConfig();
    }


    loadTemplate(viewName,param) {
        viewName = viewName || this.getCacheView() || this.initView;
        // console.log(viewName);
        return new Promise((resolve, reject) => {
            if (this.routerConfig[viewName]) {
                let [url, self] = [this.routerConfig[viewName].template_url, this];
                $(".js_view_content").load(url, res => {
                    // 成功加载视图模板涉及到的业务
                    
                    self.changeUrl(viewName,param);

                    // 1: 设置缓存
                    self.setCacheView(viewName);

                    // 2：加载动画效果
                    self.viewAnimate();
                    resolve(res);
                });
            } else {
                Dialog.msg({
                    content: '模板页面未找到，请检查重新配置!',
                    icon: 5
                });
            }
        });


    }
    bindRouter(callBack) {
        let self = this;
        $(document).on('click', '.js_view_link', function() {
            // 是否为同一个模板
            if ($(this).data("view") == self.getCacheView()) {
                return;
            }
            if ($(this).data("view")) {
                self.go($(this).data("view"));
                if(typeof callBack === "function") callBack($(this).data("view"));
            }
        });
    }
    // 链接参数
    go(viewName,param = {}) {
        // 改变链接
        return this.loadTemplate(viewName,param);
    }

    init(viewName,param = false){
        return this.loadTemplate(viewName,param);
    }

    // 修改链接
    changeUrl(viewName,obj) {
        let queryString = "";
        let qmAfterStr = ""
        let hasQm = location.hash.indexOf("?");
        if(hasQm > 0){
            qmAfterStr = location.hash.substr(location.hash.indexOf("?"));
        }
        if(obj === false){
            
        }
        else if(obj && objHaskey(obj)){
            if(hasQm > 0){
                queryString = "&" + $.param(obj);
            } else{
                queryString = "?" + $.param(obj);
            }
            // this.setRouterParamCache(obj);
            window.location.href = `#${viewName}${qmAfterStr}${queryString}`;
        } else {
            window.location.href = `#${viewName}`;
        }
        
    }
    // localStroage 存储当前view
    setCacheView(viewName) {
        if (window.localStorage) {
            localStorage["active-view"] = viewName;
        }
    }

    // 
    setRouterParamCache(data){
        if (window.localStorage && typeof data === "object") {
            localStorage["param-data"] = JSON.stringify(data);
        }
    }

    routerParam(key){
        let temp = getUrlQueryString();
        if(key){
            return temp[key];
        }else{
            return temp;
        }
    }

    clearView() {
        if ((window.location.pathname == '/index.html' || window.location.pathname == '/') && window.location.hash == "") {
            localStorage.removeItem("active-view");
        }
    }

    getCacheView() {
        if (window.localStorage) {
            return localStorage["active-view"] || this.initView;
        } else {
            return this.initView;
        }
    }

    currentView(){
        return this.getCacheView();
    }

    /**
     * [ 加载模板页面设置动画效果，模板文件顶级根标签使用section 标签才生效 ]
     * @return {[type]} [description]
     */
    viewAnimate() {
        let tartElem = $(".js_view_content > section");
        if (tartElem.length != 0) {
            tartElem.addClass("view-animated");
        }
    }
}

export {
	ViewManage,MenuManage
}