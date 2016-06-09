### JS Module Loading
[JS Module](https://www.youtube.com/watch?v=U4ja6HeBm6s)，這支影片真的是神整理全部的JS Module loading  

JS Module Loading主要有四：  
####Global：會有全局變數污染問題
```
function add(x,y){
  return x+y;
}
```
####CommomJS：NodeJS module loading模式，採用sync 
```
import('module');
function add(x,y){
  return x+y;
}
module.expors = add;
```
####AMD：async方式加載模組
```
defined('this module name',[module_you_need], function(){
  return function add(x,y){
    return x+y;
  }
})
```
可採用[RequireJS](http://requirejs.org/docs/start.html)
####(ES6)[https://github.com/lukehoban/es6features#module-loaders]：可動態加載，透過[SystemJS](https://github.com/systemjs/systemjs)
```
import module.
function add(x,y){
  return x+y;
}
export add;

```

影片作者還有提供package manager作法 像是Browsify、Webpack等等，十分實用。
