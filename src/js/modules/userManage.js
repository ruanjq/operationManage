/** 
 * @author ruanjq
 * @since  2017-03-06
 * @desc   用户管理类
 */
import { Dialog } from './dialog.js';
import { Services } from './services.js';
export class UserManage {
	constructor() {
		this.services = new Services();
	}

	logout(){
		Dialog.confirm({content:'您将退出该管理系统?'},index => {
			this.services.loginOut().then( res => {
				window.location.href = res.url;
			});
			Dialog.close(index);
		});
	}

	/**
	 * [ 登录检查 ]
	 * @return {[type]} [description]
	 */
	loginCheck(){
		// let index = Dialog.loading({content:"正在加载..."});
		return new Promise((resolve, reject) => {
			this.services.login().then(res => {
				// Dialog.close(index);
				resolve(res);
			},(err) => {
				// Dialog.close(index);
				reject(err)
			});
		});
		
	}
}