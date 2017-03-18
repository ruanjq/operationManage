/** 
 *
 *  系统管理菜单相关代码
 * 
 */
import {ViewManage} from '../modules/viewMenu.js';
import { Services } from '../modules/services.js';
import { Dialog } from '../modules/dialog.js';
import { laytplRender, selectOptionRender, objectifyForm, radioRender, inputRender,validatorForm,arrayFormatObj,checkboxList} from '../modules/util.js';





const sysManage = {

    services : new Services(),
    viewManage : new ViewManage(),
    csrf :"",




    // methods
    // 
    renderMenuData() {
        let index = Dialog.loading();
        this.services.menuServi().menuList().then(res => {
            Dialog.close(index);
            laytplRender('#menuListTpl', '#sideMenuListTableTbody', res.data);

        }, error => {
            Dialog.close(index);
            Dialog.msg({ content: '数据加载失败,请重试!' });
        });
    },
    renderAdminData() {
        let index = Dialog.loading();
        this.services.adminServi().adminList().then(res => {
            Dialog.close(index);
            laytplRender('#adminTpl', '#adminTbody', res.data);

        }, error => {
            Dialog.close(index);
            Dialog.msg({ content: '数据加载失败,请重试!' });
        });
    },
    renderDepartmentData() {
        let index = Dialog.loading();
        this.services.departmentServi().departmentList().then(res => {
            Dialog.close(index);
            laytplRender('#departmentTpl', '#departmentTbody', res.data);

        }, error => {
            Dialog.close(index);
            Dialog.msg({ content: '数据加载失败,请重试!' });
        });
    },
    renderEditorMenu(param,callback){
        let index = Dialog.loading();
        this.services.menuServi().menuAddCsrf(param).then(res => {
            Dialog.close(index);
            this.csrf = res.data.csrf;
            selectOptionRender("#menu_mod",res.data.mod_list,'code','name',res.data.menu_info.menu_mod);
            selectOptionRender("#parent_id",res.data.sel_list,'id','menu_name',res.data.menu_info.parent_id);
            inputRender("#menu_name",res.data.menu_info.menu_name);
            inputRender("#menu_ctl",res.data.menu_info.menu_ctl);
            inputRender("#menu_act",res.data.menu_info.menu_act);
            inputRender("#template_url",res.data.menu_info.template_url);
            inputRender("#order_num",res.data.menu_info.order_num);
            res.data.menu_info.is_state == true ? $("#is_state_1").prop('checked', true) : $("#is_state_0").prop('checked', true);
            if(typeof callback === "function") callback(res);
        }, error => {
            Dialog.close(index);
            Dialog.msg({ content: '数据加载失败,请重试!' });
        });
    },
    renderEditorDepartment(param,callback){
        this.services.departmentServi().departmentCsrf(param).then( res => {
            this.csrf = res.data.csrf;
            let tempObj = arrayFormatObj(res.data.sel_list,'id');
            // 没辙了。。
            window.checkedPower = res.data.info.powers.split(",");
            selectOptionRender("#parent_id",res.data.sel_list,'id','de_name',res.data.info.parent_id);
            laytplRender("#powerTpl","#powers_list",res.data.sel_list[res.data.info.parent_id].powers_list);
            inputRender("#departmentName",res.data.info.de_name);


            $("#parent_id").on('change',function(){
                
                let curr_val = $(this).val();
                // console.log(curr_val,tempObj[curr_val]);
                $("#powers_list").html('');
                laytplRender("#powerTpl","#powers_list",tempObj[curr_val].powers_list);
                $("#js_department_form").validator('update');
            });
            $("#powers_list").on('click','#power_item_child_all',function(){
                $('input:checkbox').not(this).prop('checked', this.checked);
            });
            if(typeof callback === "function") callback();
        });
    },

    renderAddAdmin(callback){
        this.services.adminServi().adminCsrf().then(res => {
            this.csrf = res.data.csrf;
            selectOptionRender("#department",res.data.department_list,'id','de_name');
            if(typeof callback === "function") callback();
        })
    },
    renderEditorAdmin(param,callback){
        this.services.adminServi().adminCsrf(param).then(res => {
            this.csrf = res.data.csrf;
            selectOptionRender("#department",res.data.department_list,'id','de_name',res.data.info.department_id);
            inputRender("#username",res.data.info.username);
            inputRender("#realname",res.data.info.real_name);
            res.data.info.is_owner == true ? $("#is_owner_1").prop('checked', true) : $("#is_owner_0").prop('checked', true);
            if(typeof callback === "function") callback();
        })
    },
    renderAddDepartment(callback){
        this.services.departmentServi().departmentCsrf().then( res => {
            this.csrf = res.data.csrf;
            window.checkedPower = [""];
            selectOptionRender("#parent_id",res.data.sel_list,'id','de_name',res.data.sel_list[0].id);
            laytplRender("#powerTpl","#powers_list",res.data.sel_list[0].powers_list);
            let tempObj = arrayFormatObj(res.data.sel_list,'id');

            $("#parent_id").on('change',function(){
                
                let curr_val = $(this).val();
                console.log(curr_val,tempObj[curr_val]);
                $("#powers_list").html('');
                laytplRender("#powerTpl","#powers_list",tempObj[curr_val].powers_list);
                $("#js_department_form").validator('update');
            });
            $("#powers_list").on('click','#power_item_child_all',function(){
                $('input:checkbox').not(this).prop('checked', this.checked);
            });
            if(typeof callback === "function") callback();
        });
    },
    getAddMenuFormData() {
        this.services.menuServi().menuAddCsrf().then(res => {
            this.csrf = res.data.csrf;
            selectOptionRender("#menu_mod", res.data.mod_list, "code", "name");
            selectOptionRender("#parent_id", res.data.sel_list, "id", "menu_name");
        })
    },

    submitMenuData(form,data){
        Object.assign(data,objectifyForm(form.serializeArray()),{csrf:this.csrf});
        form.find("button[type=submit]").button('reset');
        let index = Dialog.loading({ content: "正在保存..." });
    	this.services.menuServi().menuAdd(data).then( res => {
            Dialog.msg("菜单保存成功");
            // 添加菜单，重新刷新页面，及时更新右边菜单数据
            setTimeout(function(){
                Dialog.close(index);
                sysManage.viewManage.go("sideMenuList").then( res => {
                    window.location.reload();
                });
            },1500)
        }).catch( err => {
            Dialog.close(index);
            form.find("button[type=submit]").button('reset');
        });
    },
    submitAdminData(form,data){
        let temp = {};
        Object.assign(temp,objectifyForm(form.serializeArray()),{csrf:this.csrf},data);
        let index = Dialog.loading({ content: "正在保存..." });
        this.services.adminServi().adminAdd(temp).then( res => {
            Dialog.msg("部门信息保存成功");
            Dialog.close(index);
            sysManage.viewManage.go("adminList");
        }).catch(err => {
            Dialog.close(index);
        })
    },
    submitDepartmentData(form,data){
        let powersList = checkboxList("#powers_list");
        if(powersList.length == 0){
            Dialog.msg("请选择权限");
            return;
        }
        let postData = {check_all:0};
        if(powersList.indexOf("all") >= 0){
            postData["check_all"] = 1;
            powersList.remove('all');
        }
        let temp = {};
        postData["powers"] = powersList;
        Object.assign(temp,objectifyForm(form.serializeArray()),postData,{csrf:this.csrf},data);
        form.find("button[type=submit]").button('reset');
        let index = Dialog.loading({ content: "正在保存..." });
        this.services.departmentServi().departmentAdd(temp).then( res => {
            Dialog.msg("部门信息保存成功");
            Dialog.close(index);
            sysManage.viewManage.go("departmentList");
        }).catch( err => {
            Dialog.close(index);
            form.find("button[type=submit]").button('reset');
        });
    }

}



$(() => {

    let currentView = sysManage.viewManage.currentView();
    if (currentView.match(/sideMenuList/ig)) {
        sysManage.renderMenuData();

        $("#sideMenuListTableTbody").on('click','.js_editor_menu_btn',function(){
            let ids = $(this).data("ids");
            sysManage.viewManage.go('editorSideMenu',{
                menuId:ids[1]
            })
        });

    } else if(currentView.match(/departmentList/ig)){
        sysManage.renderDepartmentData();

        $("#departmentTbody").on('click','.js_editor_department',function(){
            let id = $(this).data("id");

            sysManage.viewManage.go('departmentEditor',{departmentId:id});

        });
        
    } else if (currentView.match(/sideMenuAdd/ig)) {

    	// 获取下拉框数据
        sysManage.getAddMenuFormData();

        // 验证表单通提交数据
        validatorForm('#js_add_menu_form',form => {
        	let postData = {csrf:sysManage.csrf}
        	Object.assign(postData,objectifyForm(form.serializeArray()));
        	sysManage.submitMenuData(form,postData)
        });
    } else if (currentView.match(/editorSideMenu/ig)){
        let id = sysManage.viewManage.routerParam("menuId");
        sysManage.renderEditorMenu({id:id},res => {
            validatorForm("#js_add_menu_form", form => {
                let postData = {id:id}
                sysManage.submitMenuData(form,postData)
            })
        });
    } else if(currentView.match(/departmentEditor/ig)){
        let id = sysManage.viewManage.routerParam("departmentId");
        sysManage.renderEditorDepartment({id:id},res => {
            validatorForm('#js_department_form', form => {
                sysManage.submitDepartmentData(form,{id:id});
            })
        });
    } else if (currentView.match(/departmentAdd/ig)){
        sysManage.renderAddDepartment( res => {
            
            validatorForm('#js_department_form', form => {
                
                sysManage.submitDepartmentData(form);
            });
        });
    } else if(currentView.match(/adminList/ig)){
        sysManage.renderAdminData();
        $("#adminTbody").on('click','.js_editor_admin',function(){
            let adminId = $(this).data("id");
            sysManage.viewManage.go('adminEditor',{adminId:adminId});
        });
    } else if(currentView.match(/adminAdd/ig)){
        sysManage.renderAddAdmin(res => {
            validatorForm('#js_admin_form', form => {
                
                sysManage.submitAdminData(form);
            });
        });
    } else if(currentView.match(/adminEditor/ig)){
        let id = sysManage.viewManage.routerParam("adminId");
        sysManage.renderEditorAdmin({id:id},res => {
            validatorForm('#js_admin_form', form => {
                
                sysManage.submitAdminData(form,{id:id});
            });
        });
    }

})
