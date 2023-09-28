import {  useState,FormEvent, useRef } from 'react';
import './UploadImg.css'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';


export interface IAppProps {
}

export function UploadImg(props: IAppProps) {
    const [file, setFile] = useState<File | undefined>()

    const inputRef = useRef<any>()
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)
    function UploadImg(e: FormEvent<HTMLInputElement>) {
            const target = e.target as HTMLInputElement & {
        files:FileList
        }
        setFile(target.files[0])
        const Imgfile = new FileReader();
        Imgfile.onload = function () {
            setImg(Imgfile.result)
        }
        Imgfile.readAsDataURL(target.files[0])
    }
return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='imgContainer p-0 col-5 mt-5 ms-5 d-flex flex-wrap '>
                        <h4 className='col-12 p-4 m-0'>Upload cover image</h4>
                        <form  className=' img-box col-12 position-relative d-flex align-items-center justify-content-center'>
                            <input
                                ref={inputRef}
                                type='file'
                                id='img'
                                className='d-none'
                                onChange={UploadImg}
                                accept='image/png , image/jpg, image/jpeg'
                            />
                            <label style={{cursor:'pointer'}} className=' p-4 col-10 d-flex flex-column justify-content-center' htmlFor='img'>
                                <span className='col-12 d-inline-block text-center'><FileUploadOutlinedIcon fontSize='large' /></span>
                                <h6 className='col-12 text-center'>Upload cover image</h6>
                                <p className="col-12 text-center mt-3">16:9 ratio is recommended. Max image size 1mb</p>
                            </label>
                            {img&&<div className='position-absolute top-0 w-100 h-100 p-2'>
                                <img src={`${img}`} className=' rounded img-fluid w-100 h-100' alt='img' />
                                <span onClick={()=>setImg(null)} className='imgDelete rounded'><DeleteIcon fontSize='small'/></span>
                            </div>}
                        </form>
                    </div>
        </div>
    </div>
);
}
