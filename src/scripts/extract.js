const getBitStringFromInt = (num,bitoption) => {
    return num.toString(2).padStart(bitoption, '0');
}


const extractor = (img,bitoption) => {
    console.log(img.src)
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
    let bitString = [];

    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    for(var i = 0; i < imageData.data.length; i += 4) {
        
        for (let j = 0; j < 3; j++) {
            let bits = imageData.data[i+j]
            let extracted = ((1<<bitoption)-1) & bits;
                
            bitString.push(getBitStringFromInt(extracted,bitoption));
        }
        
    }
    bitString = bitString.join('');


    let bitArray = bitString.match(/.{8}/g);

    let string = [];
    for (const byte of bitArray) {
        let code = parseInt(byte,2);
        let char = String.fromCharCode(code);
        if(code == 0)
            return string.join('');
        string.push(char);
    }

    for (let index = 0; index < 100000; index++) {
        //hej
    }
    return string.join('');
}
const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })  
;
export const extractData = async (imgUrl, bitoption) =>{
    
    console.log(imgUrl)
    var result = ""
    await loadImage(imgUrl).then(image => {
        result = extractor(image,bitoption);
    })
    console.log(result)
    
    return result;
}