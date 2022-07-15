class MyPromise {
    static PENDING = "等待";
    static RESLOVE = "成功";
    static REJECT =  "失败";
    constructor(func) {
        this.state = MyPromise.PENDING;
        this.result = null
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        }catch(err) {
            this.reject(err)
        }
    }
    resolve(res){
       if (this.state === MyPromise.PENDING) {
           this.state = MyPromise.RESLOVE;
           this.result = res
       }
    }
    reject(err) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.REJECT;
            this.result = err
        }
    }
    then(onResolve,onReject){
        onResolve = typeof onResolve === 'function' ? onResolve : (val) => val;
        onReject = typeof onReject === 'function' ? onReject : reason => {throw reason}
        if (this.state === MyPromise.RESLOVE) {
            onResolve(this.result)
        }
        if (this.state === MyPromise.REJECT) {
            onReject(this.result)
        }
    }
}

const res = new MyPromise((resolve,reject) => {
    resolve('ni hao a wo shi MyPromise')
})

res.then(res => console.log(res))
