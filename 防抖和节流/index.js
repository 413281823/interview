const debounce = function (fn,wait,immediate = false) {
    let timer = null

    return function (){
        let context = this
        let args = arguments

        if (timer){
            clearTimeout(timer)
        }
        if (immediate){
            let callNow = !timer
            if (callNow) {
                fn.apply(context,args)
            }
            timer = setTimeout(()=>{
                timer = null
            },wait)
        } else {
            timer = setTimeout( () => {
                fn.apply(context,args)
            },wait)
        }

    }
}

const throttle = function (fn, wait, type) {
    if (type === 1) {
        let preTime = 0
        return function () {
            let context = this
            let args = arguments
            let nowTime = new Date()
            if (nowTime - preTime > wait) {
                preTime = nowTime
                fn.apply(context, args)
            }
        }
    } else {
        let timer = null
        return function () {
            let context = this
            let args = arguments
            if (!timer) {
                // 当延迟时间结束后，执行函数
                timer = setTimeout(() => {
                    timer = null
                    fn.apply(context, args)
                }, wait)
            }
        }
    }
}