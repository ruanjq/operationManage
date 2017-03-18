const Dialog = {

    msg(option) {
        if(typeof option === "string") return  layer.msg(option,{time:1500});
        let config = {
            content: 'hello！',
            icon: 1,
            time: 5000, // 自动关闭时间
            shade: [0.5, '#000']
        };
        Object.assign(config, option);
        return layer.msg(config.content, config);
    },

    loading(option) {
        let config = {
            content: '正在加载...',
            shade: [0.4, '#000'],
            icon: 16,
            time: 0 //不自动关闭
        };
        Object.assign(config, option);
        return layer.msg(config.content, config);
    },

    tips(option) {
        let [config, n] = [{
            content: 'hello',
            direction: 'top', // [top 1,left 4,right 2,down 3]
            selector: option.selector, //#id或者.class
            bgColor: '#000' //还可配置颜色
        }];
        Object.assign(config, option);
        switch (config.direction) {
            case 'top':
                n = 1;
                break;
            case 'left':
                n = 4;
                break;
            case 'right':
                n = 2;
                break;
            case 'down':
                n = 3;
                break;
        }
        return layer.tips(config.content, config.selector, {
            tips: [n, config.bgColor]
        });
    },


    // 对话框
    confirm(option,okCallback,cancelCallBack) {
        let config = {
            content: 'hello....',
            okBtnLabel: '确定',
            cancelBtnLabel: '取消',
            icon:1
        };
        Object.assign(config, option);
        let index = layer.confirm(config.content, {
            btn: [config.okBtnLabel, config.cancelBtnLabel] //按钮
        }, function() {
            if(typeof okCallback === "function") okCallback(index);
        }, function() {
            if(typeof cancelCallBack === "function") cancelCallBack(index);
        });
    },

    prompt(option,callback,cancel) {
        let config = {
            title: 'prompt 标题信息',
            formType: 0,
            okBtnLabel: '确定',
            cancelBtnLabel: '取消'
        }
        Object.assign(config, option);
        layer.prompt(config, (txt,i,elem) => {
            if(typeof callback === "function") callback(txt,i,elem)
        },index => {
            if(typeof cancel === "cancel") callback(index)
        });
    },

    // 自定义弹框内容
    open(option) {
        let config = {
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true, // 点击背景关闭页面
            skin: 'yourclass',
            content: '自定义HTML内容' // content: $('#tong')  可以为jQuery 对象
        };
        Object.assign(config, option);
        return layer.open(config);
    },

    close(index) {
        layer.close(index);
    },


    closeAll(type = '') {
        layer.closeAll(type);
    }
}


export { Dialog }
