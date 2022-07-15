class MyPromise {
    static PENDING = "待定";
    static RESOLVE = "成功";
    static REJECT = "失败";
    constructor(func) {
        this.state = MyPromise.PENDING;
        this.result = null;
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        }catch (err) {
            this.reject(err)
        }
    }
    resolve(res) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.RESOLVE;
            this.result = res
        }
    }
    reject(err) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.REJECT;
            this.result = err;
        }
    }
    then (onResolve,onReject) {
        onResolve = typeof onResolve === "function" ? onResolve : val => val;
        onReject = typeof onReject === "function" ? onReject : err => {throw new Error(err)}
        if (this.state===MyPromise.RESOLVE) {
            onResolve(this.result)
        }
        if (this.state === MyPromise.REJECT) {
            onReject(this.result)
        }
    }
}

const res = new MyPromise((resolve,reject) => {
    resolve("村长大大")
})

console.log(res)
