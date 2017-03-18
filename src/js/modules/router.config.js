

/*const routerConfig = {
    "listWebsite": {
        id: "listWebsite",
        title: "项目列表",
        url: "src/templates/configManage/listWebsite.html",
    },
    "addWebsite": {
        id: "addWebsite",
        title: "项目添加",
        url: "src/templates/configManage/addWebsite.html",
    },
    "editorWebsite": {
        id: "editorWebsite",
        title: "项目编辑",
        url: "src/templates/configManage/addWebsite.html",
    },
    "addConfig": {
        id: "addConfig",
        title: "添加配置",
        url: "src/templates/configManage/addConfig.html",
    },
    "editorConfig": {
        id: "editorConfig",
        title: "编辑配置",
        url: "src/templates/configManage/addConfig.html",
    },
    "listConfig": {
        id: "listConfig",
        title: "配置列表",
        url: "src/templates/configManage/listConfig.html",
    },
    "listSideMenu": {
        id: "listSideMenu",
        title: "后台菜单列表",
        url: "src/templates/sysManage/sideMenuList.html",
    },
    "adminList": {
        id: "adminList",
        title: "管理员列表",
        url: "src/templates/sysManage/adminList.html",
    },
    "departmentAdd": {
        id: "departmentAdd",
        title: "部门添加",
        url: "src/templates/sysManage/departmentAdd.html",
    },
    "departmentEditor": {
        id: "departmentEditor",
        title: "部门编辑",
        url: "src/templates/sysManage/departmentAdd.html",
    },
    "departmentList": {
        id: "departmentList",
        title: "部门列表",
        url: "src/templates/sysManage/departmentList.html",
    },
    "sideMenuAdd": {
        id: "sideMenuAdd",
        title: "菜单添加",
        url: "src/templates/sysManage/sideMenuAdd.html",
    },
    "sideMenuList": {
        id: "sideMenuList",
        title: "菜单列表",
        url: "src/templates/sysManage/sideMenuList.html",
    },
    "editorSideMenu": {
        id: "editorSideMenu",
        title: "菜单编辑",
        url: "src/templates/sysManage/sideMenuAdd.html",
    },
    "adminAdd": {
        id: "adminAdd",
        title: "管理员添加",
        url: "src/templates/sysManage/adminAdd.html",
    },
    "adminEditor": {
        id: "adminEditor",
        title: "管理员编辑",
        url: "src/templates/sysManage/adminAdd.html",
    },
    "addModel": {
        id: "addModel",
        title: "群集模式添加",
        url: "src/templates/configManage/addModel.html",
    },
    "editorModel": {
        id: "editorModel",
        title: "模式编辑",
        url: "src/templates/configManage/addModel.html",
    },
    "listModel": {
        id: "listModel",
        title: "群集模式列表",
        url: "src/templates/configManage/listModel.html",
    },
    "addApplication": {
        id: "addApplication",
        title: "应用场景添加",
        url: "src/templates/configManage/addApplication.html",
    },
    "editorApplication": {
        id: "editorApplication",
        title: "应用场景编辑",
        url: "src/templates/configManage/addApplication.html",
    },
    "listApplication": {
        id: "listApplication",
        title: "应用列表",
        url: "src/templates/configManage/listApplication.html",
    },
    "addServices": {
        id: "addServices",
        title: "服务添加",
        url: "src/templates/configManage/addServices.html",
    },
    "editorServices": {
        id: "editorServices",
        title: "编辑服务",
        url: "src/templates/configManage/addServices.html",
    },
    "listServices":{
        id: "listServices",
        title: "服务列表",
        url: "src/templates/configManage/listServices.html",
    }
}*/


const routerConfig = () => {
    if(window.localStorage){
        return JSON.parse(window.localStorage["menu-list"] || "{}");
    }else{
        return {};
    }
}

export { routerConfig }
