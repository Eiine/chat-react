export const guardarEnStorage=(key, elemento)=>{
    let element=JSON.parse(localStorage.getItem(key))
    if (Array.isArray(element)) {
        element.push(elemento)
    }else{
        element=[elemento]
        
    }
    localStorage.setItem(key,JSON.stringify(element))
    return elemento
}