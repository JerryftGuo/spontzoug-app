export  default function(arrayIn, id, name, value) {
    let newArray=[];
    if ( typeof(arrayIn) !== 'object' ) return arrayIn; 
    arrayIn.forEach(
        (item) => {
            if( item.id === id) {
                newArray.push(
                     Object.assign({}, item,{
                        [name]:value
                    })
                )
            } else {
                newArray.push(item);
            }
        }
    )
    return newArray;
}