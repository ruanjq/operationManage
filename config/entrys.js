
/**
 * @since 2017-03-01
 * @author ruanjq
 * @desc 页面入口文件配置，多面页面多入口
 * 
 */


var path = require('path');

const publicPath = path.resolve(__dirname, '../src/js/pages/');

let entrys = [
    '/configPage.js',
    '/common.js',
    '/sysManagePage.js',
    '/logManagePage.js'
];
entrys = entrys.map((item) => {
	return path.join(publicPath).toString().replace(/\\/ig,"/") + item;
});

module.exports = {
    entrys:entrys
};
