var obj = {
    value:"12341",
    fn:function(){
        console.log(arguments)
    }
}

Function.prototype.MyCall=function (context) {

    if (typeof this !== 'function'){
        throw new Error('Type error')
    }
let args = [...arguments].slice(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn
    return result
}

const res = obj.fn.MyCall(this,[1,2,3])
console.log(res)

Function.prototype.myApplay = function (context) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    let result = null;
    context = context || window
    context.fn = this;
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result;
}

Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    const args = [...arguments].slice[1];
    const fn = this;
    return function Fn () {
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }

}
