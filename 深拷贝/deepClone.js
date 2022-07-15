export function deepClone(source) {
    let target = {};
    let map = new Map();
    map.set(source, target);
    // 任务队列
    let stack = [{target: target},{source: source}];
    while(stack.length) {
        let {target, source} = stack.pop()
        for(let property in source)  {
            if (typeof source[property] === 'object') {
                if(map.has(source[property])){
                    target[property] = map.get(source[property])
                } else {
                    target[property] = {}
                    map.set(source[property], target[property])
                    stack.push({target: target[property]},{source: source[property]})
                }
            
            } else {
                target[property] = source[property]
            }
        }
    }
    
    return tatget
}
