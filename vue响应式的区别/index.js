//为什么vue2不劫持数组
//1。 因为数组的位置不固定，数量多变，正常对象key对应value一般不会变，但是如果对于数组进行修改，顺序就会乱，会触发多次set

//2。 数组的元素可能非常的多，每个元素进行劫持会造成性能浪费

//3。 vue对7种数组的变异方法进行了重写

const arr = [1,2,3,4,5,6]

for (let key in arr) {
    let value = arr[key]
    Object.defineProperty(arr,key,{
        get(){
            console.log(`get:${key}`)
            return value
        },
        set(newValue){
            console.log(`set:${key},${newValue}`)
            return value = newValue
        }
    })
}

arr[0] = 99
arr.shift()

const obj = {
    age:"14",
    fun:{
        age:"14"
    }
}

function deepObject (obj){
    return new Proxy(obj,{
        get(target,key) {
            console.log(target,key)
            if (typeof target[key]==="object"&&target[key]!==null){
                return deepObject(target[key])
            }
            return target[key]
        },
        set(target, key, value) {
            console.log(`set：${key} to ${value}`)

            return target[key] = value
        }
    })

}

const haodx = deepObject(obj)

console.log(haodx.fun.age)

// 从以上的例子就能看到，Object.defineProperty必须“预先”劫持属性。被劫持的属性才会被监听到。所以后添加的属性，需要手动再次劫持。
//
// 而proxy代理了整个对象，不需要预先劫持属性，而是在获取/修改的时候，通过get/set方法来告诉你key。所以不管如何新增属性，总是能被捕获到。