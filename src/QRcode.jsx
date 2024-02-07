import { useState } from 'react'
import './QRcode.css'
function QRcode() {
    const [ img, setImg ] = useState("");
    const [ loading, setloading ] = useState(false);
    const [ qrdata, setqrdata ] = useState('')
    const [ qrsize, setqrsize ] = useState(150)
    async function generateQR() {
        setloading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${qrdata}`;
            setImg(url)
        } catch (error) {
            console.error("Error generating QR code", error)
        } finally {
            setloading(false)
        }
    }
    function downloadQR() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error('Error in Download in QR code',error)
        })
    }
    return (
        <div className='app-container'>
            <h1>QR CODE</h1>
            {loading && <p>Please wait...</p>}
            {img && <img alt='Test.png' src={img} width={150} height={150} className='qr-code-image' />}
            <div>
                <label htmlFor="dataInput" className='input-label'>
                    Data for QR code:
                </label>
                <input type="text" id='dataInput' placeholder='Enter data for QR code' className='input-box' onChange={(e) => setqrdata(e.target.value)} />
                <label htmlFor="sizeInput" className='input-label'>
                    Image size (e.g., 150):
                </label>
                <input type="text" id="sizeInput" value={qrsize} placeholder='Enter Image size' onChange={(e) => setqrsize(e.target.value)} />
                <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
                <button className='download-button' onClick={() => downloadQR()}>Download QR Code</button>
            </div>
            <p className='footer'>Build by Vicky</p>
        </div>
    )
}

export default QRcode