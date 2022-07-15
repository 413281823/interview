const arr = [12,4,543,6,54,7];
function quick(arr) {
    if (arr.length<=1) return arr
    let middleIndex = Math.floor(arr.length/2);
    let middleVary = arr.splice(middleIndex,1)[0]
    let left = [],right=[];
    for (let i = 0;i < arr.length;i++) {
        let item = arr[i]
        item < middleVary ? left.push(arr[i]) : right.push(arr[i])
    }
    return quick(left).concat(middleVary,quick(right))
}

console.log(quick(arr))
