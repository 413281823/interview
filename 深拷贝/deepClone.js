export function deepClone(source) {
    let target =  Object.create(
        Object.getPrototypeOf(source)
    );
    let map = new Map();
    map.set(source, target);
    // 任务队列
    let stack = [{target: target},{source: source}];
    while(stack.length) {
        let {target, source} = stack.pop()
        for(let property of Object.getOwnPropertyNames(source))  {
            let descriptor = Object.getOwnPropertyDescriptor(source, property)
            if (descriptor.hasOwnProperty("value")){
                if (typeof source[property] === 'object') {
                    if(map.has(source[property])){
                        descriptor.value= map.get(source[property])
                    } else {
                        descriptor.value = Object.create(
                            Object.getPrototypeOf(source[property])
                        )
                        map.set(source[property], descriptor.value )
                        stack.push({target: descriptor.value},{source: source[property]})
                    }
                
                } else {
                    descriptor.value = source[property]
                }
            } else {
                Object.defineProperty(target, property, descriptor)
            }
        }
    }
    
    return tatget
}
