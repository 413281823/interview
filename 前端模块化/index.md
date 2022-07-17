
### 什么是模块化
    
 可能是我学习前端太晚了，一进来就是ESM，对于整个前端模块化的演变以及各种其他的前端模块化规范没有一些了解，为此决定了解并记录一下。
     什么是模块化，这个东西在软件工程里面有一种定义：指整个程序中一些相对对独立的程序单元，每个程序单元完成和实现一个相对独立的软件功能。通俗点就是一些功能独立的程序段。
     
### js如何实现模块化
由于先天的不足，ES5以前JS是不支持模块化开发的。所以模块化往往多需要一些特别的写法(IIFE)完成

**IIFE创建简单模块**

```js
    const spliter = 'QWER'
    const format = str => spliter + str + spliter
    const util = {
    format
    }
```
这样我们就创建了一个简单的模块

但是这样创建我们会有一定的问题
 - spliter与format污染全局变量
 - spliter 非私有化有被篡改的风险

所以我们需要IIFE的写法去创建一个只使用一次的函数，然后立即执行，IIFE可以创建闭包进行作用域隔离，保护私有变量。

```js
    const util = (function () {
        const spliter = 'qwer'
        const format = str => spliter + str + spliter
        return {
        format
        } 
    })
```
那么由此可知，每一个模块，有自己的作用域。在一个模块里面定义的变量、函数、类，都是私有的，对其他文件不可见。

### 前端模块化规范
以前的各种演变现在不管，目前在大量使用的应该是
 - CommonJS - node.js
 - ESM - ECMAScript
 
 ### CommonJS
 CommonJS规范规定，每个模块内部
 
   - module : `modele`变量代表当前模块，这个模块是一个对象
   - module.exports: 是一个对外的接口。加载某个模块，其实是加载改模块的`module.exports`属性
   - require: `require`是一个方法，这个方法用于加载模块

这是我的一篇koa文章中导出的一个模块，
  
```js
const verifyLogin = async (ctx,next) => {

    try {

        const {username,password} = ctx.request.body;

        const res = await getUserinfo({username});

        //用户不存在

        if(!res) {

            console.log('用户不存在',ctx.request.body)

            ctx.app.emit('error',userIsundefined,ctx)

            return

        }

        console.log(password,res.password)

        if (password!==res.password){

            ctx.app.emit('error',userPasswordError,ctx)

            return

        }

    }catch (err) {

        console.error(err);

        ctx.app.emit('error',userLoginError,ctx)

    }

    await next();

}



module.exports= {

    verifyLogin

}
```

在另外一个模块中引入，也就是说每个文件其实可以当作一个模块他们相互隔离。
```js
const {verifyLogin} = require('../middleware/user.middleware')
```
CommonJS模块的特点
 - 所有代码都运行在模块作用域，不会污染全局作用域。
 - 模块可以多次加载，但是只会在第一次加载时候运行，然后运行结果就被缓存了，以后再加载，就直接读取缓存的结果。
 - 模块加载的顺序，按照其在代码中出现的顺序，也就是说是同步加载
 - 输出的是值的拷贝

### ESM
ECMAScript 模块是打包 JavaScript 代码以供重用的官方标准格式。模块是使用`import`and `export`语句定义的。在 ES 2015（ES6）中，直接在语言标准层面上实现了模块的功能。并且是浏览器和服务端都支持的模块化解决方案。

也就是说ESM同时支持服务端和浏览器端。


```js
import name from ' ./index.js'
// ./index.js 文件
const name = '123'
export default name
```

相比CommonJS的同步加载，ESM使用的是异步加载，因为CommoneJS的思想是同步加载，如果在服务端使用模块放在硬盘中性能不会有太大的影响，但是在浏览器中，模块的加载需要异步加载去保证性能。

ESM模块特点：
 - 运行机制在编译时/运行时
 - 静态化，在编译时就缺点模块之间的依赖关系，输入和输出
 - 加载方式是一异步的
 - 输出的是值的引用
