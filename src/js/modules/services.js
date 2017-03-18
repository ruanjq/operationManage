/**
 * @author ruanjq
 * @since  2017-03-02
 * @desc   API接口服务,该系统所有http 服务全部在此封装 ，，，，接口post 请求规则，
 *
 *   1：post 接口请求之前先用get 方式获取 Csrf 验证参数，
 *   2：post 接口提交数据必须携带 get 方式获取的 Csrf 字段
 */
import { Dialog } from './dialog.js';
export class Services {
    constructor(args) {

        // 接口地址
        this.serverUrl = "http://servermaster.com/index.php/api/";
    }


    ajax(type, param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: type,
                url: param.url,
                dataType: "json",
                data: param.data,
                timeout:param.timeout || 10000,
                async: param.async || true,
                statusCode:{
                	404:(error) => {
                		reject(404)
                	}
                },
                success(res) {
                    if (res.success) {
                        resolve(res);
                    } else if (res.url != undefined && res.url != "") {
                        location.href = res.url;
                    } else {
                        reject(404);
                        Dialog.msg({content:res.msg,icon:6});
                    }
                },
                error(err){
                	reject(404)
                }
            });
        });
    }


    getAjax(param){
    	return this.ajax('get',param);
    }

    postAjax(param){
    	return this.ajax('post',param);
    }

    /** 
	 * @desc 用户登录接口。返回用户名相关信息，和菜单列表数据
     */
    login() {
    	return this.getAjax({url:`${this.serverUrl}site/info`});
        
    }

    loginOut(){
        return this.getAjax({url:`${this.serverUrl}site/logout`});
    }

    // 菜单相关服务
    menuServi(){
        let self = this;
        return {
            /**
             * [menuList description]   获取表格菜单列表数据
             * @return {[type]} [description]
             */
            menuList(){
                return self.getAjax({url:`${self.serverUrl}menu/list`});
            },
            menuAdd(param){
                return self.postAjax({url:`${self.serverUrl}menu/add`,data:param});
            },

            menuAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}menu/add`,data:param});
            },
            configList(){
                return self.getAjax({url:`${self.serverUrl}config/list`});
            },
            masterList(){
                return self.getAjax({url:`${self.serverUrl}mysql-master/list`});
            },
            masterOperateList(){
                return self.getAjax({url:`${self.serverUrl}mysql-master-operate/list`});
            }
        }
    }

    configServi(){
        let self = this;
        return {
            // 添加配置
            configAdd(param){
                return self.postAjax({url:`${self.serverUrl}config/add`,data:param});
            },

            // 获取添加配置的form表单数据
            configAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}config/add`,data:param});
            },
            // 添加模式
            modelAdd(param){
                return self.postAjax({url:`${self.serverUrl}mode/add`,data:param});
            },
            modelAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}mode/add`,data:param});
            },
            // 群集哦模式列表
            modelList(param){
                return self.getAjax({url:`${self.serverUrl}mode/list`,data:param});
            },
            // 添加服务
            serviceAdd(param){
                return self.postAjax({url:`${self.serverUrl}service/add`,data:param});
            },
            servceAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}service/add`,data:param});
            },

            serviceList(){
                return self.getAjax({url:`${self.serverUrl}service/list`});
            },
            // 添加应用
            applicationAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}application/add`,data:param});
            },
            applicationAdd(param){
                return self.postAjax({url:`${self.serverUrl}application/add`,data:param});
            },
            applicationList(param){
                return self.getAjax({url:`${self.serverUrl}application/list`,data:param});
            },
            ipBindCsrf(param){
                return self.getAjax({url:`${self.serverUrl}config/bind`,data:param});
            },

            ipBind(param){
                 return self.postAjax({url:`${self.serverUrl}config/bind`,data:param}); 
            },

            // 添加配置
            masterAdd(param){
                return self.postAjax({url:`${self.serverUrl}mysql-master/add`,data:param});
            },
            // 获取添加配置的form表单数据
            masterAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}mysql-master/add`,data:param});
            },
            //切换主库
            changeMaster(param){
                return self.postAjax({url:`${self.serverUrl}mysql-master/change`,data:param});
            },
            changeMasterResult(param){
                return self.getAjax({url:`${self.serverUrl}mysql-master/get-result`,data:param});
            }
        }
    }

    websiteServi(){
        let self = this;
        return {
            websiteAdd(param){
                return self.postAjax({url:`${self.serverUrl}website/add`,data:param});
            },
            websiteAddCsrf(param){
                return self.getAjax({url:`${self.serverUrl}website/add`,data:param});
            },
            websiteList(param){
                return self.getAjax({url:`${self.serverUrl}website/list`,data:param});
            }
        }
    }

    departmentServi(){
        let self = this;
        return {
            departmentList(){
                return self.postAjax({url:`${self.serverUrl}department/list`});
            },
            departmentCsrf(param){
                return self.getAjax({url:`${self.serverUrl}department/add`,data:param});
            },
            departmentAdd(param){
                return self.postAjax({url:`${self.serverUrl}department/add`,data:param});
            }
        }
    }


    adminServi(){
        let self = this;
        return {
            adminList(){
                return self.getAjax({url:`${self.serverUrl}admin/list`});
            },
            adminCsrf(param){
                return self.getAjax({url:`${self.serverUrl}admin/add`,data:param});
            },
            adminAdd(param){
                return self.postAjax({url:`${self.serverUrl}admin/add`,data:param});
            }
        }
    }

    logServi(){
        let self = this;
        return{
            logList(param){
                return self.getAjax({url:`${self.serverUrl}log/list`,data:param});
            }
        }
    }

    
}
