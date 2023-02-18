import LinearProgress from '@mui/material/LinearProgress';
import ImageIcon from '@mui/icons-material/Image';
import Loading from '../components/Loading'
import {embedData,stringToBinary} from '../scripts/embed.js';

import { useEffect, useState } from 'react';


export default function Encode() {

    const [message,setMessage] = useState("");
    const [bitOption,setBitOption] = useState(1);
    const [image,setImage] = useState(null);
    const [maxSize,setMaxSize] = useState(0);
    const [result,setResult] = useState(null);

    const [processing,setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if(!processing){

            setProcessing(true);
            const res = embedData(image.url,stringToBinary(message),bitOption);
            setResult(res);
            setProcessing(false);
        }
        
    }
    const handleMessageChange = (e) => {
        let newData = e.target.value;
        newData = newData.slice(0,maxSize);
        setMessage(newData);
    }

    const handleImageChange = (e) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setImage({url: imageUrl,raw: e.target.files[0]});
    }
    useEffect(() => {
        if(image){
            var img = new Image();
        
            img.src = image.url;
            img.onload = function () {
                let pixels = img.width * img.height;
    
    
                let size = Math.floor((bitOption/8)*3*(pixels))-1
                setMaxSize(size);
              };
            setResult(null)
        }
       
    },[image,bitOption])
    //When size is changed, crop data
    useEffect(() => {
        let newData = message.slice(0,maxSize);
        setMessage(newData);
    },[maxSize])

    const charactersLeft = maxSize - message.length;
    const percentage = (message.length/maxSize)*100;
    return <div className='container'>
        <div className='main'>
            <div className='box'>
                <form onSubmit={handleSubmit} action="../api/embed" method="post">
                    <div className='formHeader'>
                        <h1>Embed data</h1>
                    </div>
                    <div className='formBody'>
                        {processing ? <Loading /> : <>
                        <div className='formRow'>
                            <div className='formGroup'>
                                <label htmlFor="imageInput">Select your PNG image</label>
                                <div id='imageInput' className='imageInput'>
                                    <label htmlFor="fileInput">
                                        <span>
                                        <ImageIcon sx={{ fontSize: 40 }} />
                                        </span> 
                                        <span>
                                            Upload PNG
                                        </span>
                                    </label>
                                    <input id='fileInput' onChange={handleImageChange} name = 'image' className='hiddenInput' type='file' accept="image/png"/>  
                                </div>
                                {image && <label> Selected: {image.raw.name}</label>}
                                
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="bitoption">Number of bits to modify</label>
                                <select required id='bitoption' name='bitoption' value={bitOption} onChange={(e) => setBitOption(e.target.value)}>
                                    <option value={1}>1 bit</option>
                                    <option value={2}>2 bits</option>
                                    <option value={3}>3 bits</option>
                                    <option value={4}>4 bits</option>
                                    <option value={5}>5 bits</option>
                                    <option value={6}>6 bits</option>
                                    <option value={7}>7 bits</option>
                                    <option value={8}>8 bits</option>
                                </select>
                            </div>
                        </div>
                        <div className='formGroup'>
                            <label htmlFor="message">Message to embed</label>
                            <textarea 
                                required
                                id='message' 
                                className='formInput' 
                                rows="4"
                                name='message'
                                value={message}
                                onChange={handleMessageChange}
                            />
                            <LinearProgress variant="determinate" value={percentage} />
                            <div>{'Characters left: ' + charactersLeft}</div>
                        </div>
                        </>
                    }
                    </div>
                    
                    <div className='formFooter'>
                        <input disabled={processing} type="submit" value="Submit" />
                    </div>

                    
                </form>
                {result && (
                    <div className='resultContainer'>
                        
                        <div className='grid'>
                            <div className='resultImg'>
                                <img src={result?.original}/>
                                <div>Original</div>
                            </div>
                            <div className='resultImg'>
                                <img src={result?.embedded}/>
                                <div>Embedded</div>
                            </div>
                            <div className='resultImg'>
                                <img src={result?.difference}/>
                                <div>Difference (Inverted)</div>
                            </div>
                        </div>
                    </div>
                )}
                
            
                
            </div>
        </div>
    </div>
}