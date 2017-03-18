"use strict";

require('shelljs/global');
const path = require('path');

cd(path.resolve(__dirname, "../config"));

let runGulp = exec('gulp watch');

if (runGulp.code !== 0) {
  echo('Error: gulp watch failed');
  exit(1);
}else{
	echo('Suc: gulp watch successful--------');
}
