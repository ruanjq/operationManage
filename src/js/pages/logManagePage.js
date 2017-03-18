import {ViewManage} from '../modules/viewMenu.js';
import { Services } from '../modules/services.js';
import { Dialog } from '../modules/dialog.js';
import { laytplRender, selectOptionRender, objectifyForm,
	radioRender,
	inputRender,validatorForm,arrayFormatObj,checkboxList,datetimepicker,getParameterByName} from '../modules/util.js';



const logManage = {

	viewManage:new ViewManage(),
	services:new Services(),
	renderLog(param,callBack){
		let index = Dialog.loading({ content: "正在加载..." });
		let self = this;
		this.services.logServi().logList(param).then( res => {
			Dialog.close(index);

			if(res.data.list.length == 0){
				Dialog.msg("暂无日志数据...");
				$('#listLogTbody').html('');
			}
			
			$('#page_sections').bootpag({
	            total: parseInt(res.data.pages.totalPage) == 0 ? 1 : parseInt(res.data.pages.totalPage),
	            maxVisible: 6,
	            leaps:true,
	            page:res.data.pages.curPage
	        }).off("page").on("page", function(event, num){
	        	Object.assign(param,{page:num});
	        	self.renderLog(param);
	        });
			
	        laytplRender("#listLogTpl","#listLogTbody",res.data.list);
			if(typeof callBack == "function") callBack(res);
		}).catch( err => {
			Dialog.close(index);
		});
	},
}


$( ()=> {

	let currentView = logManage.viewManage.currentView();

	if(currentView.match(/logList/ig)){
		datetimepicker('#start_time');datetimepicker('#end_time');
		let queryString = getParameterByName('table');
		let param = {
			table:queryString
		};
		logManage.renderLog(param,res => {
			
		});

		validatorForm('#js_log_search_form',form => {
			let searchData = objectifyForm(form.serializeArray());
			Object.assign(searchData,param);
			logManage.renderLog(searchData);
		});

		
	}
	
})