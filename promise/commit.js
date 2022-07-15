class Commitment{

    static PENDING="待定"; static FULFILLED = "成功"; static REJECT = "失败"

    constructor(func) {
        this.state= Commitment.PENDING;
        this.result = null;
        this.reslveCallbacks = [];
        this.rejectCallbacks = [];
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        } catch(err){
            this.reject(err)
        }

    }

    resolve(res){
        setTimeout(() => {
            if (this.state === Commitment.PENDING) {
                this.state = Commitment.FULFILLED;
                this.result = res;
                this.reslveCallbacks.forEach((callback) => {
                    callback(res)
                })
            }
        })
    }

    reject(err){
        setTimeout(() => {
            if (this.state === Commitment.PENDING) {
                this.state = Commitment.REJECT;
                this.result = err;
                this.rejectCallbacks.forEach(callback => {
                    callback(err)
                })
            }
        })
    }

    then(onFulfilled,onRejected){
        const thenPromise = new Commitment((resolve,reject) => {
            const resolvePromise = cb => {
                try {
                    const x = cb(this.result)
                    if (x === thenPromise) {
                        // 不能返回自身哦
                        throw new Error('不能返回自身。。。')
                    }
                    if (x instanceof Commitment) {
                        // 如果返回值是Promise
                        // 如果返回值是promise对象，返回值为成功，新promise就是成功
                        // 如果返回值是promise对象，返回值为失败，新promise就是失败
                        // 谁知道返回的promise是失败成功？只有then知道
                        x.then(resolve, reject)
                    } else {
                        // 非Promise就直接成功
                        resolve(x)
                    }
                } catch (err) {
                    // 处理报错
                    reject(err)
                    throw new Error(err)
                }
            }

            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled:(val) => val;
            onRejected = typeof onRejected === 'function' ? onRejected:reason => {throw reason};
            if (this.state === Commitment.PENDING) {
                this.reslveCallbacks.push(resolvePromise.bind(this,onFulfilled))
                this.rejectCallbacks.push(resolvePromise.bind(this,onRejected))
            }
            if (this.state === Commitment.FULFILLED) {
                setTimeout(() => {
                    onFulfilled(this.result);
                })
            }
            if (this.state === Commitment.REJECT) {
                setTimeout(() => {
                    onRejected(this.result)
                })
            }
        })
        return thenPromise
    }
}
const res = new Commitment((resolve,reject) => {
    resolve("我坐牢了")
})

res.then((res) => {
    console.log(res)
}).then(res => {
    console.log('qwer')
})