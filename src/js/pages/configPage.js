import { Services } from '../modules/services.js';
import { Dialog } from '../modules/dialog.js';
import { ViewManage } from '../modules/viewMenu.js';
import { laytplRender, selectOptionRender, objectifyForm, radioRender, inputRender } from '../modules/util.js';

const configManage = {

    services: new Services(),
    viewManage: new ViewManage(),
    csrf: '',
    renderAddConfig(param, callback) {
        this.services.configServi().configAddCsrf(param).then(res => {
            this.csrf = res.data.csrf;
            selectOptionRender("#website_list", res.data.website_list, "code", "name");
            radioRender("#service_list_wrap", res.data.service_list, "code", "name", "service_name");
            radioRender("#application_list_wrap", res.data.application_list, "code", "name", "application_name");
            radioRender("#mode_list_wrap", res.data.mode_list, "code", "name", "mode");
            if (typeof callback === "function") callback();
        });
    },
    renderEditorConfig(param, callback) {
        this.services.configServi().configAddCsrf(param).then(res => {
            this.csrf = res.data.csrf;
            selectOptionRender("#website_list", res.data.website_list, "code", "name", res.data.info.website_code);
            radioRender("#service_list_wrap", res.data.service_list, "code", "name", "service_name", res.data.info.service_name);
            radioRender("#application_list_wrap", res.data.application_list, "code", "name", "application_name", res.data.info.application_name);
            radioRender("#mode_list_wrap", res.data.mode_list, "code", "name", "mode", res.data.info.mode);
            inputRender("#url", res.data.info.url);
            res.data.info.all_ip.forEach((item, i) => {
                let isCheck = item == res.data.info.current_ip ? true : false;

                this.addIpOption(item, isCheck);
            });
            if (typeof callback === "function") callback();
        });
    },
    renderEditorServices(param,callback){
    	this.services.configServi().servceAddCsrf(param).then(res => {
    		this.csrf = res.data.csrf;
    		inputRender("#servicesName", res.data.info.name);
    		if (typeof callback === "function") callback();
    	})
    },
    renderEditorModel(param,callback){
    	this.services.configServi().modelAddCsrf(param).then(res => {
    		this.csrf = res.data.csrf;
    		inputRender("#modelName", res.data.info.name);
    		if (typeof callback === "function") callback();
    	})
    },
    renderEditorApplication(param,callback){
    	this.services.configServi().applicationAddCsrf(param).then(res => {
    		this.csrf = res.data.csrf;
    		inputRender("#appName", res.data.info.name);
    		if (typeof callback === "function") callback();
    	})
    },
    renderEditorWebsite(param,callback){
    	this.services.websiteServi().websiteAddCsrf(param).then(res => {
    		this.csrf = res.data.csrf;
    		inputRender("#name", res.data.info.name);
    		inputRender("#code", res.data.info.code);
    		inputRender("#logo", res.data.info.logo);
    		if (typeof callback === "function") callback();
    	})
    },
    getAddServicesCsrf: function(callback) {
        this.services.configServi().servceAddCsrf().then(res => {
            this.csrf = res.data.csrf;
            if (typeof callback === "function") callback(res);
        });
    },
    getAddModeCsrf: function(callback) {
        this.services.configServi().modelAddCsrf().then(res => {
            this.csrf = res.data.csrf;
            if (typeof callback === "function") callback(res);
        });
    },
    getAddApplicationCsrf: function(callback) {
        this.services.configServi().applicationAddCsrf().then(res => {
            this.csrf = res.data.csrf;
            if (typeof callback === "function") callback(res);
        });
    },
    getAddWebsiteCsrf: function(callback) {
        this.services.websiteServi().websiteAddCsrf().then(res => {
            this.csrf = res.data.csrf;
            if (typeof callback === "function") callback(res);
        });
    },
    validatorForm(formSelector, callback) {
        $(formSelector).validator('update').on('submit', function(e) {
            if (e.isDefaultPrevented()) {
                console.log(0);
                // handle the invalid form...
            } else {
                e.preventDefault();
                if (typeof callback === "function") callback($(this));
                // everything looks good!
            }
        })
    },

    addIpOption(value, isCheck = false) {
        let radioName = "current_ip";
        let i = new Date().getTime();
        if (isCheck === true) {
            $("#all_ip_wrap").append(
                `<label class="radio-inline js_${radioName}_${i}" for="${radioName}_${i}">
	            	<input type="radio" checked="checked" name="${radioName}" id="${radioName}_${i}" value="${value}" required=""> ${value}
	            	<a href="javascript:void(0);" class="text text-danger text-underline option-editor-btn js_del_ip" data-id="${i}">删除</a>
	            </label>`);
        } else {
            $("#all_ip_wrap").append(
                `<label class="radio-inline js_${radioName}_${i}" for="${radioName}_${i}">
	            	<input type="radio" name="${radioName}" id="${radioName}_${i}" value="${value}" required=""> ${value}
	            	<a href="javascript:void(0);" class="text text-danger text-underline option-editor-btn js_del_ip" data-id="${i}">删除</a>
	            </label>`);
        }
        $('#js_add_config_form').validator('update');
    },

    submitAddConfig(form, data) {
        form.find("button[type=submit]").button('loading');
        this.services.configServi().configAdd(data).then(res => {
            form.find("button[type=submit]").button('reset');
            Dialog.msg("配置信息保存成功");
            this.viewManage.go("listConfig");
        }).catch(err => {
            form.find("button[type=submit]").button('reset');
        });
    },
    submitAddService(data) {
        this.services.configServi().serviceAdd(data).then(res => {
            Dialog.msg("服务保存成功");
            this.viewManage.go("listServices");
        })
    },
    submitAddModel(data) {
        this.services.configServi().modelAdd(data).then(res => {
            Dialog.msg("模式保存成功");
            this.viewManage.go("listModel");
        })
    },
    submitAddWebsite(data) {
        this.services.websiteServi().websiteAdd(data).then(res => {
            Dialog.msg("項目保存成功");
            this.viewManage.go("listWebsite");
        })
    },
    submitAddApplication(data) {
        this.services.configServi().applicationAdd(data).then(res => {
            Dialog.msg("应用场景保存成功");
            this.viewManage.go("listApplication");
        })
    },

    renderConfigList() {
        let index = Dialog.loading({ content: "正在加载..." });
        this.services.menuServi().configList().then(res => {
            Dialog.close(index);
            laytplRender("#configListTable", "#configListTbody", res.data);
        });
    },

    renderMasterOperateList() {
        let index = Dialog.loading({ content: "正在加载..." });
        this.services.menuServi().masterOperateList().then(res => {
            Dialog.close(index);
            laytplRender("#masterOperateListTable", "#masterOperateListTbody", res.data);
        });
    },

    renderViewChangeMasterResult(param) {
        let index = Dialog.loading({ content: "正在加载..." });
        this.services.configServi().changeMasterResult(param).then(res => {
            Dialog.close(index);
            laytplRender("#viewMasterOperateTable", "#viewMasterOperateTbody", res.data);
            if(res.data.refresh){

                setTimeout( () => {
                    configManage.renderViewChangeMasterResult(param);
                },5000);
            }

        });
    },

    renderMasterList() {
        let index = Dialog.loading({ content: "正在加载..." });
        this.services.menuServi().masterList().then(res => {
            Dialog.close(index);
            laytplRender("#masterListTable", "#masterListTbody", res.data);
        });
    },
    renderWebsiteList() {
        let index = Dialog.loading({ content: "正在加载..." });
        this.services.websiteServi().websiteList().then(res => {
            Dialog.close(index);
            laytplRender("#webSiteTpl", "#js_website_wrap", res.data);
        });
    },
    renderServiceList:function(){
    	let index = Dialog.loading({ content: "正在加载..." });
    	this.services.configServi().serviceList().then(res => {
    		Dialog.close(index);
    		laytplRender("#servicesListTpl","#servicesListTbody",res.data);
    	}).catch( err => {
    		Dialog.closeAll();
    	});
    },

    renderModelList:function(){
    	let index = Dialog.loading({ content: "正在加载..." });
    	this.services.configServi().modelList().then(res => {
    		Dialog.close(index);
    		laytplRender("#modelListTpl","#modelListTbody",res.data);
    	}).catch( err => {
    		Dialog.closeAll();
    	});
    },

    renderAppList:function(){
    	let index = Dialog.loading({ content: "正在加载..." });
    	this.services.configServi().applicationList().then(res => {
    		Dialog.close(index);
    		laytplRender("#applicationListTpl","#addApplicationListTbody",res.data);
    	}).catch( err => {
    		Dialog.closeAll();
    	});
    },
    submitBindIp(param){
    	let index = Dialog.loading({ content: "正在绑定..." });
    	this.services.configServi().ipBind(param).then( res => {
    		Dialog.close(index);
    		Dialog.msg(res.msg);
    		setTimeout( () => {
    			window.location.reload();
    		},1500)
		}).catch( err => {
			Dialog.close(index);
		});
    },
    renderEditMysqlMaster(param,callback){
        this.services.configServi().masterAddCsrf(param).then(res => {
            this.csrf = res.data.csrf;
            inputRender("#code", res.data.info.code);
            inputRender("#master_ip", res.data.info.master_ip);
            if (typeof callback === "function") callback();
        });
    },

    submitAddMaster(form, data) {
        form.find("button[type=submit]").button('loading');
        this.services.configServi().masterAdd(data).then(res => {
            form.find("button[type=submit]").button('reset');
            Dialog.msg("主库信息保存成功");
            this.viewManage.go("listMaster");
        }).catch(err => {
            form.find("button[type=submit]").button('reset');
        });
    },

    submitChangeMaster(param){
        let index = Dialog.loading({ content: "正在切换..." });
        this.services.configServi().changeMaster(param).then( res => {
            Dialog.close(index);
            if(res.success == 1){
                Dialog.msg('正在切换，稍等一会查看结果');
                setTimeout( () => {
                    this.viewManage.go("viewChangeMasterResult",{ operateId: res.data.id });
                },3000);
            }else{
                Dialog.msg(res.msg);
            }
        }).catch( err => {
                Dialog.close(index);
        });
    }
}

$(() => {

	let currentView = configManage.viewManage.currentView();
    // 添加配置页面
    if (currentView.match(/addConfig/ig)) {
        configManage.renderAddConfig({}, () => {
            configManage.validatorForm('#js_add_config_form', form => {

                let postData = { csrf: configManage.csrf, all_ip: [] };
                $("#all_ip_wrap").find("input[name='current_ip']").map((i, item) => {
                    postData.all_ip.push($(item).val());
                })
                if (postData.all_ip.length == 0) {
                    Dialog.msg("请填写IP地址");
                    return;
                }
                Object.assign(postData, objectifyForm(form.serializeArray()));
                configManage.submitAddConfig(form, postData);
            })

        });



    } else if (currentView.match(/addServices/ig)) { // 添加服务界面
        configManage.getAddServicesCsrf();
        configManage.validatorForm('#js_add_services_form', form => {
            let postData = { csrf: configManage.csrf };
            Object.assign(postData, objectifyForm(form.serializeArray()));
            configManage.submitAddService(postData);
        });
    } else if (currentView.match(/addModel/ig)) { // 添加模式界面
        configManage.getAddModeCsrf();
        configManage.validatorForm('#js_add_model_form', form => {
            let postData = { csrf: configManage.csrf };
            Object.assign(postData, objectifyForm(form.serializeArray()));
            configManage.submitAddModel(postData);
        });
    } else if (currentView.match(/addApplication/ig)) { // 添加应用场景界面
        configManage.getAddModeCsrf();
        configManage.validatorForm('#js_add_application_form', form => {
            let postData = { csrf: configManage.csrf };
            Object.assign(postData, objectifyForm(form.serializeArray()));
            // console.log(postData);
            configManage.submitAddApplication(postData);
        });
    } else if (currentView.match(/listConfig/ig)) { // 配置列表页面

        configManage.renderConfigList();

        $("#configListTbody").on("click", ".js_editor_config", function() {
            let id = $(this).data("id");
            configManage.viewManage.go('editorConfig', { configId: id });
        });


        let [c_id,val] = ['',''];
        $('#configListTbody').on('click','.js_set_ip',function(){
        	c_id = $(this).data("current-id");
        	val = $(this).find("a").text();
        	$(".js_bind_ip_" + c_id).find(".btn_val").html(val);
        });

        $('#configListTbody').on("click",'.js_bind_ip_btn',function(){
        	c_id = $(this).data("current-id");
        	val = $(".js_bind_ip_" + c_id).find(".btn_val").html()
        	let current_ip = $(".js_bind_ip_" + c_id).find(".btn_val").data("current-ip");
        	// console.log(val,current_ip,c_id);
        	if(current_ip == val){
        		Dialog.msg("当前IP未改变");
        		return;
        	}
        	configManage.submitBindIp({id:c_id,current_ip:val});

        });

    } else if (currentView.match(/editorConfig/ig)) { // 编辑配置页面

        let editorId = configManage.viewManage.routerParam("configId");

        if (!editorId) {

        } else {
            configManage.renderEditorConfig({ id: editorId }, () => {
                configManage.validatorForm('#js_add_config_form', form => {

                    let postData = { csrf: configManage.csrf, all_ip: [] };
                    $("#all_ip_wrap").find("input[name='current_ip']").map((i, item) => {
                        postData.all_ip.push($(item).val());
                    })
                    if (postData.all_ip.length == 0) {
                        Dialog.msg("请填写IP地址");
                        return;
                    }
                    Object.assign(postData, objectifyForm(form.serializeArray()), { id: editorId });

                    // console.log(postData);
                    configManage.submitAddConfig(form, postData);
                })

            });
        }


    } else if (currentView.match(/addWebsite/ig)) {

        configManage.getAddWebsiteCsrf();
        configManage.validatorForm('#js_add_website_form', form => {
            let postData = { csrf: configManage.csrf };
            Object.assign(postData, objectifyForm(form.serializeArray()));
            configManage.submitAddWebsite(postData);
        });
    } else if (currentView.match(/listWebsite/ig)) {
        configManage.renderWebsiteList();

        $("#js_website_wrap").on('click','.js_website_item',function(){
        	let id = $(this).data("id");
        	configManage.viewManage.go('editorWebsite', { editorId: id });
        });
    } else if (currentView.match(/listServices/ig)){
    	configManage.renderServiceList();

    	$("#servicesListTbody").on('click',".js_editor_services",function(){
    		let id = $(this).data("id");
    		configManage.viewManage.go('editorServices', { servicesId: id });

    	});
    }

    else if (currentView.match(/editorServices/ig)){
    	let editorId = configManage.viewManage.routerParam("servicesId");
    	configManage.renderEditorServices({id:editorId},(res) => {
    		configManage.validatorForm('#js_add_services_form', form => {
    			let postData = { csrf: configManage.csrf,id:editorId};
            	Object.assign(postData, objectifyForm(form.serializeArray()));
    			configManage.submitAddService(postData);
    		});
    	});

    } else if(currentView.match(/editorWebsite/ig)){
    	let editorId = configManage.viewManage.routerParam("editorId");
    	configManage.renderEditorWebsite({id:editorId} ,res => {
    		configManage.validatorForm('#js_add_website_form', form => {
    			let postData = { csrf: configManage.csrf,id:editorId};
            	Object.assign(postData, objectifyForm(form.serializeArray()));
    			configManage.submitAddWebsite(postData);
    		});
    	});
    } else if(currentView.match(/editorModel/ig)){
    	let editorId = configManage.viewManage.routerParam("modelId");
    	configManage.renderEditorModel({id:editorId} ,res => {
    		configManage.validatorForm('#js_add_model_form', form => {
    			let postData = { csrf: configManage.csrf,id:editorId};
            	Object.assign(postData, objectifyForm(form.serializeArray()));
    			configManage.submitAddModel(postData);
    		});
    	});
    } else if (currentView.match(/listModel/ig)){
    	configManage.renderModelList();

    	$("#modelListTbody").on('click',".js_editor_model",function(){
    		let id = $(this).data("id");
    		configManage.viewManage.go('editorModel', { modelId: id });

    	});
    }
    else if (currentView.match(/listApplication/ig)){
    	configManage.renderAppList();

    	$("#addApplicationListTbody").on('click',".js_editor_app",function(){
    		let id = $(this).data("id");
    		configManage.viewManage.go('editorApplication', { applicationId: id });

    	});
    }else if(currentView.match(/editorApplication/ig)){
    	let editorId = configManage.viewManage.routerParam("applicationId");
    	configManage.renderEditorApplication({id:editorId} ,res => {
    		configManage.validatorForm('#js_add_application_form', form => {
    			let postData = { csrf: configManage.csrf,id:editorId};
            	Object.assign(postData, objectifyForm(form.serializeArray()));
    			configManage.submitAddApplication(postData);
    		});
    	});
    } else if (currentView.match(/listMaster/ig)) { // 主库列表页面

        configManage.renderMasterList();

        $("#masterListTbody").on("click", ".js_editor_master", function() {
            let id = $(this).data("id");
            configManage.viewManage.go('editMysqlMaster', { configId: id });
        });

        $('#masterListTbody').on("click",'.js_change_master',function(){
            let $self = $(this);
            Dialog.confirm({'content':'确定切换主库?'},function(){
                let id = $self.data("id");
                configManage.submitChangeMaster({id:id});
            });
        });

    } else if (currentView.match(/addMysqlMaster/ig)) {
        configManage.validatorForm('#js_add_master_form', form => {
            let postData = {};
            Object.assign(postData, objectifyForm(form.serializeArray()));
            configManage.submitAddMaster(form, postData);
        });
    } else if (currentView.match(/editMysqlMaster/ig)){
        let configId = configManage.viewManage.routerParam("configId");
        configManage.renderEditMysqlMaster({id:configId} ,res => {
            configManage.validatorForm('#js_add_master_form', form => {
            let postData = { csrf: configManage.csrf,id:configId};
            Object.assign(postData, objectifyForm(form.serializeArray()));
                configManage.submitAddMaster(form,postData);
            });
        });
    } else if (currentView.match(/listOperateMaster/ig)) { // 主库列表页面

        configManage.renderMasterOperateList();

        $("#masterOperateListTbody").on("click", ".js_view_result", function() {
            let id = $(this).data("id");
            configManage.viewManage.go('viewChangeMasterResult', { operateId: id });
        });

    }  else if(currentView.match(/viewChangeMasterResult/ig)){
        let operateId = configManage.viewManage.routerParam("operateId");
        configManage.renderViewChangeMasterResult({id:operateId});
    }


    $(".js_add_ip_btn").click(() => {
        Dialog.prompt({
            title: '请输入IP地址'
        }, (val, index, elem) => {
            configManage.addIpOption(val);
            Dialog.close(index);
        });
    });


    $("#all_ip_wrap").on('click', '.js_del_ip', function() {
        $(".js_current_ip_" + $(this).data("id")).remove();
        $('#js_add_config_form').validator('update');
    });

})
