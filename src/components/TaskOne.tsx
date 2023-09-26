import { FC, useState,FormEvent, useRef } from 'react';
import './TaskOne.css'
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetDataQuery } from '../Redux/DataApi';


export interface IProps {
}

export const TaskOne: FC = (props: IProps) => {
    const inputRef=useRef<any>()
    const {data}=useGetDataQuery()
    const [file, setFile] = useState<File | undefined>()
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
    <div style={{backgroundColor:'white'}} className='container  '>
        <div className='row'>
            <div className='col-12 d-flex p-0'>
                <div className='col-1 sideMenu position-relative min-vh-100 p-2 d-flex flex-column align-items-center'>
                <div className='col-10 d-flex justify-content-center mb-5'><MenuIcon fontSize='large'/></div>
                <div className='col-10 d-flex justify-content-center mb-3 '><HomeOutlinedIcon fontSize='large'/></div>
                <div className='col-10 d-flex justify-content-center'><ListAltOutlinedIcon fontSize='large'/></div>
                <div className='col-10 d-flex justify-content-center d-flex my-auto '><span className='userCircle d-flex justify-content-center align-items-center'>NT</span></div>
                </div>
                <div  className='theForm col-11 d-flex flex-column'>
                    <div className='col-12  titles d-flex mt-5'>
                        <div style={{fontSize:'20px'}} className='p-5 col-3 d-flex justify-content-center align-items-center'>Program Details</div>
                        <div style={{fontSize:'20px'}} className='p-5 ApplicationFormTitle col-3 d-flex justify-content-center align-items-center'>Application Form</div>

                        <div style={{fontSize:'20px'}} className='WorkFlowtTitle p-5 col-3 d-flex justify-content-center align-items-center'>Workflow</div>

                        <div style={{fontSize:'20px'}} className='p-5 col-3 d-flex justify-content-center align-items-center'>Preview</div>

                    </div>
                    <div className='imgContainer  col-5 mt-5 ms-5 d-flex flex-wrap '>
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
    </div>
    </div>
);
}
