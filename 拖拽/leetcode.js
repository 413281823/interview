var sortColors = function(nums) {

    let p = -1
    let q = nums.length - 1
    let i = 0
    while(i<=q){
        if(nums[i]==0){
            swap(nums,i,p+1)
            p = p+1
            i++
        } else if(nums[i]==2){
            swap(nums,i,q)
            q = q-1
        } else if(nums[i]==1){
            i++
        }
    }
    function swap(arr,a,b){
        [arr[a],arr[b]] = [arr[b],arr[a]]
    }
    return nums


};
sortColors([2,0,1])
