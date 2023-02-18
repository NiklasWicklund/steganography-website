const insert_bits_in_first_i_pos = (n, toInsert,len, bitoption) => {
    let zeroMask = ((1 <<8)-1) << bitoption;
  
    let fill = bitoption - len;
    let filler = ((1<<fill)-1)
    zeroMask =  zeroMask | filler;
  
    let cleaned = n & zeroMask;
  
    toInsert = toInsert << fill
    
    return cleaned | toInsert
  }
  
  
  export const stringToBinary = (string) => {
      var str = []
      string.split('').forEach(char => {
          let code = char.charCodeAt(0);
          //Make each character a 8 character long string of its binary representation.
          let bin = code.toString(2).padStart(8,'0');
          str.push(bin);
      });
      return str.join('');
  }
  export const embedData = (imgUrl, data, bitoption) =>{
  
    const originalUrl = imgUrl;
  
    var canvas = document.createElement("canvas");
    var canvas_modified = document.createElement("canvas");
    var canvas_diff = document.createElement("canvas");
  
    var img=document.createElement("img");
    console.log(imgUrl);
    img.setAttribute('src',imgUrl)
    console.log(img.width,img.height)
    let pixels = img.width * img.height
  
    let maxSize = Math.floor((bitoption/8)*3*(pixels))-1;
  
    //Add end null character as zeroes.
    data = data.substring(0,maxSize*8) + "00000000";
  
    canvas.width = img.width
    canvas.height = img.height
      
    canvas_modified.width = img.width
    canvas_modified.height = img.height
  
    canvas_diff.width = img.width
    canvas_diff.height = img.height
  
  
    var ctx = canvas.getContext("2d");
    var ctx_modified = canvas_modified.getContext("2d");
    var ctx_diff = canvas_diff.getContext("2d");
  
    console.log(ctx);
    ctx_diff.drawImage(img, 0, 0,canvas_diff.width,canvas_diff.height);
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
    ctx_modified.drawImage(img, 0, 0,canvas.width,canvas.height);
  
  
    var imageData_mod = ctx_modified.getImageData(0,0,canvas.width,canvas.height);
    var imageData_org = ctx.getImageData(0,0,canvas.width,canvas.height);
    var imageData_diff = ctx_diff.getImageData(0,0,canvas.width,canvas.height);
  
    var bitPointer = 0;
    for(var i = 0; i < imageData_mod.data.length; i += 4) {
        
        for (let j = 0; j < 3; j++) {
            let upperBound = bitPointer+parseInt(bitoption)
            if(bitPointer < data.length){
                var bits = data.substring(bitPointer,upperBound);
                let len = bits.length
                
                bitPointer = bitPointer + parseInt(bitoption);
                bits = parseInt(bits,2);
            
                let org = imageData_mod.data[i+j];
                let mod = insert_bits_in_first_i_pos(imageData_mod.data[i+j],bits,len,bitoption)
                imageData_mod.data[i+j] = mod;
  
            }
            
            //Envert the difference to make it more obvious in final image
            imageData_diff.data[i+j] = 255 - (Math.abs(imageData_org.data[i+j] - imageData_mod.data[i+j]));
            
        }
        
    }
  
  
    //calculate difference.
  
    ctx_modified.putImageData(imageData_mod,0,0);
    ctx_diff.putImageData(imageData_diff,0,0);
    var base64URL_mod = canvas_modified.toDataURL();
    var base64URL_diff = canvas_diff.toDataURL();
    console.log("Done");
    return {"original": originalUrl,"embedded": base64URL_mod,"difference": base64URL_diff};
  }
  
  