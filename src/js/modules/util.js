/**
 * [getParameterByName description]
 * @param  {[type]} name [description]
 * @param  {[type]} url  [description]
 * @return {[type]}      [description]
 */
let getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    // return decodeURIComponent(results[2].replace(/\+/g, " "));
    return decodeURIComponent(results[2]);
};


let getUrlQueryString = url => {
    if (!url) url = window.location.href;
    let vars = [],
        hash;
    let hashes = window.location.href.slice(url.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



let laytplRender = (tplSelctor, targetSelector, data, callBack) => {
    laytpl($(tplSelctor).html()).render(data, html => {
        $(targetSelector).html(html);
        if (typeof callBack === "function") callBack(html);
    });
}


let objectifyForm = (formArray) => { //serialize data function

    let returnArray = {};
    for (let i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

let checkboxList = (selector) =>{
	let list = [];
    $(`${selector} input:checked`).each(function(item) {
        list.push($(this).val());
    });
    return list;
}


/** [description]
 *  渲染表单数据
 */
let renderForm = (form, formData) => 　{

}

let inputRender = (inputElem, value) => {
    $(inputElem).val(value);
}


let objHaskey = data => {
    let result = false;
    for (let k in data) {
        result = true;
    }
    return result;
}

/**
 * [description]   select 控件渲染option dom
 * @param  {[type]} elem     [description]
 * @param  {[type]} data     [description]
 * @param  {[type]} keyName  [description]
 * @param  {[type]} keyValue [description]
 * @return {[type]}          [description]
 */
let selectOptionRender = (elem, data, keyName, keyValue, checkCurrent) => {
    let elemStr = "";
    data.forEach((item, i) => {
        if (keyValue === false || keyName === false) {
            keyName = i;
            keyValue = i;
        }
        if (checkCurrent == item[keyName]) {
            elemStr += `<option selected value="${item[keyName]}">${item[keyValue]}</option>`;
        } else {
            elemStr += `<option value="${item[keyName]}">${item[keyValue]}</option>`;
        }

    });
    $(elem).html(elemStr);
}


/**
 * [description]
 * @param  {[type]} elem         [插入的dom 元素]
 * @param  {[type]} data         [数据]
 * @param  {[type]} keyName      [key name]
 * @param  {[type]} keyValue     [key value]
 * @param  {[type]} radioName    [ 单选按钮 name 名称 ]
 * @param  {String} checkCurrent [ 当前选中的数据 ]
 * @return {[type]}              [description]
 */
let radioRender = (elem, data, keyName, keyValue, radioName, checkCurrent = "") => {
    let elemStr = "";
    data.forEach((item, i) => {
        if (keyValue === false || keyName === false) {
            keyName = i;
            keyValue = i;
        }
        if (checkCurrent == item[keyName]) {
            elemStr += `<label class="radio-inline" for="${radioName}_${i}">
	                    	<input type="radio" checked="checked" name="${radioName}" id="${radioName}_${i}" value="${item[keyName]}" required=""> ${item[keyValue]}
	                    </label>`;
        } else {
            elemStr += `<label class="radio-inline" for="${radioName}_${i}">
	                    	<input type="radio" name="${radioName}" id="${radioName}_${i}" value="${item[keyName]}" required=""> ${item[keyValue]}
	                    </label>`;
        }



    });
    $(elem).html(elemStr);
}


let checkboxRender = (elem, data, keyName, keyValue, checkboxName, checkCurrent = {}) => {
    let elemStr = "";
    data.forEach((item, i) => {
        if (keyValue === false || keyName === false) {
            keyName = i;
            keyValue = i;
        }
        if (checkCurrent.hasOwnProperty(item[keyName])) {
            elemStr += `<label class="checkbox-inline" for="${checkboxName}_${i}">
                    	<input type="checkbox" checked="checked" name="${checkboxName}" id="${checkboxName}_${i}" value="${item[keyName]}" required=""> ${item[keyValue]}
                    </label>`;
        } else {
            elemStr += `<label class="checkbox-inline" for="${checkboxName}_${i}">
                    	<input type="checkbox" name="${checkboxName}" id="${checkboxName}_${i}" value="${item[keyName]}" required=""> ${item[keyValue]}
                    </label>`;
        }

    });
    $(elem).html(elemStr);
}

let validatorForm = (formSelector, callback) => {
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
}

/**
 * [description] 数组格式化为对象
 * @param  {[type]} data    [description]
 * @param  {[type]} keyName [description]
 * @return {[type]}         [description]
 */
let arrayFormatObj = (data,keyName) => {
	if(!(data instanceof Array)) return;
	let result = {};
	data.forEach((item,i) => {
		result[item[keyName]] = item; 
	})
	return result;
}	


let datetimepicker = (selector,option) => {
    let config = {
        locale: 'zh-cn',
        disabledDates:[],
        format:'YYYY-MM-DD HH:mm:ss'
    };
    Object.assign(config,option);
    $(selector).datetimepicker(config);
}

/**
 * [ 时间戳格式过滤器 ]
 * @param  {[type]} d      [ 时间戳 ]
 * @param  {[type]} format [ String ]
 * @return {[type]}        [description]
 */
window.dateFormat = (d, format) => {
    /*const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];*/
    if(d  == undefined || d == "") return "";
    let result = '';
    const monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
    ];
    let date = new Date(parseInt(d) * 1000);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let monthIndex = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // 匹配格式
    switch (format) {
        case 'MM/dd/YYYY HH:mm:ss':
            result = `${year}/${monthIndex}/${day} ${hours}:${minutes}:${sec}`;
            break;
    }
    return result;
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

export {
    getParameterByName,
    laytplRender,
    selectOptionRender,
    radioRender,
    checkboxRender,
    objectifyForm,
    objHaskey,
    inputRender,
    getUrlQueryString,checkboxList,
    validatorForm,dateFormat,arrayFormatObj,datetimepicker
}
