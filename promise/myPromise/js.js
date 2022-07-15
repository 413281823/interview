class MyPromise {
    static PENDING = "待定";
    static RESOLVE = "成功";
    static REJECT = "失败";

    constructor(func) {
        this.state = MyPromise.PENDING;
        this.result = null;
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        }catch(e) {
            this.reject(e)
        }
    }

    resolve(res){
        if (MyPromise.PENDING==="待定") {
            this.state = MyPromise.RESOLVE;
            this.result = res
        }
    }

    reject(err) {
        if (MyPromise.REJECT) {
            this.state = MyPromise.REJECT;
            this.result = err
        }
    }

    then(onResolve,onReject) {
        onResolve = typeof onResolve === "function" ? onResolve : (val) => val;
        onReject = typeof onReject === "function" ? onReject : err => {throw new Error(err)};
        if (this.state === MyPromise.RESOLVE) {
            onResolve(this.result)
        }
        if (this.state === MyPromise.REJECT) {
            onReject(this.result)
        }
    }
}

const res = new MyPromise((resolve,rejest) => {
    resolve("hahahahha")
})
res.then(res=>{
    console.log(res)
})
