
import Footer from '../components/Footer'
import LinearProgress from '@mui/material/LinearProgress';
import ImageIcon from '@mui/icons-material/Image';
import Loading from '../components/Loading'
import {extractData} from '../scripts/extract.js';

import { useEffect, useState } from 'react';


export default function Extract() {

    const [message,setMessage] = useState("");
    const [bitOption,setBitOption] = useState(1);
    const [image,setImage] = useState(null);

    const [result,setResult] = useState(null);

    const [processing,setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if(!processing){
            setProcessing(true);
            extractData(image.url,bitOption).then(res => {
                setResult(res);
            })
            setProcessing(false);
        }
        
    }
    useEffect(() => {
        setResult(null)
    },[image,bitOption])
    const handleImageChange = (e) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setImage({url: imageUrl,raw: e.target.files[0]});
        setResult(null);
    }
    return <div className='container'>
        <div className='main'>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <div className='formHeader'>
                        <h1>Settings</h1>
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
                        </>
                    }
                    </div>
                    
                    <div className='formFooter'>
                        <input disabled={processing} type="submit" value="Submit" />
                    </div>

                    
                </form>
                {result && (
                    <div className='resultContainer'>
                        <textarea 
                            required
                            id='message' 
                            className='formInput' 
                            rows="5"
                            disabled={true}
                            name='message'
                            value={result}
                        />
                    </div>
                )}
                
            
                
            </div>
        </div>
    </div>
}