function make_set (array, value = true) {
    const object = Object.create(null)
    array.forEach(function (name){
        object[name] = value
    })
    return object
}
