require('shelljs/global');
const path = require('path');


cd(path.resolve(__dirname, "../config"));

let runGulp = exec('gulp');

if (runGulp.code !== 0) {
  echo('Error: gulp failed');
  exit(1);
}else{
	echo('Suc: gulp successful--------');
}
