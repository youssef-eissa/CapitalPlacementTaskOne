import { FC, useState,FormEvent, useRef, useEffect, ReactElement } from 'react';
import './TaskOne.css'
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetDataQuery } from '../Redux/DataApi';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import BasicSelect from './MaterialUI/List';
export interface IProps {

}
export enum PersonalQuestions{
    Paragraph='Paragraph',
    ShortAnswer='Short answer',
    YesNo='Yes/No',
    Dropdown='Dropdown',
    Date='Date',
    MultipleChoice='Multiple choice',
    Number='Number',
    FileUpload='File upload'
}


export const TaskOne: FC<IProps> = (props) => {
    const divREf=useRef<any>(null)
    const [ClonedQuestions,setClonedQuestions]=useState<any>([])
    const inputRef = useRef<any>()
    const {data:allData,isSuccess}=useGetDataQuery()
    const [file, setFile] = useState<File | undefined>()
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)
    const [personalInformationArray, setpersonalInformationArray] = useState<any>([])
    const [show, setShow] = useState<boolean>(false)
    const [startClone, setStartClone] = useState<number>(0)


    useEffect(() => {
        if (isSuccess) {
            const personalInformation = Object.entries(allData.data.attributes.personalInformation)
            setpersonalInformationArray(personalInformation)

        }
    }, [isSuccess, allData])

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

    function personalInfohandleShow(current:any) {
        const currentIndex = personalInformationArray.findIndex((item: any) => item === current)
        const currentItem = personalInformationArray[currentIndex]
        if (currentItem) {
            const updateItem = { ...currentItem[1], show: !currentItem[1].show }
            personalInformationArray[currentIndex][1] = updateItem
        }
    }
    function personalInfohandleInternal(current:any) {
        const currentIndex = personalInformationArray.findIndex((item: any) => item === current)
        const currentItem = personalInformationArray[currentIndex]
        if (currentItem) {
            const updateItem = { ...currentItem[1], internalUse: !currentItem[1].internalUse }
            personalInformationArray[currentIndex][1] = updateItem
        }
    }
    function AddQuestion():ReactElement<typeof BasicSelect> {
        
        return <BasicSelect/>
    }
    function handleAddQuestionClick():void {
        setShow(true)
        setStartClone(prev => prev + 1)
        if (startClone >= 1) {
        setClonedQuestions([...ClonedQuestions,divREf.current])
            
        }
    }

console.log(allData?.data.attributes.personalInformation.personalQuestions);
console.log(allData?.data.attributes.personalInformation.personalQuestions);

return (
    <div style={{backgroundColor:'white'}} className='container  '>
        <div className='row'>
            <div className='col-12 d-flex p-0'>
                <div className='col-1 sideMenu h-75 position-relative  p-2 d-flex flex-column align-items-center'>
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
                    <div className='imgContainer col-5 mt-5 ms-5 d-flex flex-wrap '>
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

                    <div className='personalInformation col-5 mt-5 ms-5 d-flex flex-wrap'>
                        <h4 className='col-12 p-4 m-0'>Personal Information</h4>
                        <div className='col-12 d-flex p-3 flex-column'>
                            {personalInformationArray.length > 0 && personalInformationArray.map((key:any,index:number) => {
                                return <div key={key[0]} className='col-12 py-3 RowOfData d-flex'>
                                    <span className='col-6 d-flex align-items-center h-auto' key={key[0]}>{key[0] === 'firstName' ? 'First Name' : key[0] === 'lastName' ? 'Last Name' : key[0] === 'emailId' ? 'Email' : key[0] === 'phoneNumber' ? 'Phone (without dial code)' : key[0] === 'nationality' ? 'Nationality' : key[0] === 'currentResidence' ? 'Current Residence ' : key[0] === 'idNumber' ? 'ID Number' : key[0] === 'dateOfBirth' ? 'Date of Birth ' : key[0] === 'gender' ? 'Gender' : ''}</span>
                                    {key[0] !== 'firstName' && key[0] !== 'lastName' && key[0] !== 'emailId' ? <span style={{ color: '#666666' }} className='col-6 d-flex h-auto'>
                                        <span style={{ fontSize: '15px' }} className='col-6 d-flex align-self-start align-items-center'>
                                            <Checkbox
                                                sx={{width:'auto',height:'auto'}}
                                                defaultChecked={key[1].internalUse}
                                                onChange={() => personalInfohandleInternal(key)}
                                                
                                                /> Internal
                                        </span>
                                        <span style={{ fontSize: '16px' }} className='col-6 d-flex align-self-start align-items-center'><Switch
                                            defaultChecked={key[1].show}
                                            onChange={() => personalInfohandleShow(key)}
                                            name='hide'
                                            value={key[0]}
                                            /> Hide</span>
                                    </span> : ''}
                                </div>
                            })}
                        </div>
                        <div className='personalInfoQuestionContainer p-2 col-12 d-flex flex-column'>
                        {show&&<div ref={divREf}  className='col-12 d-flex flex-column'>
                                <BasicSelect/>
                            </div>}
                            {ClonedQuestions.length>0&&ClonedQuestions.map((targetQuestion:any) => {
                                return <div key={startClone+1} className={`${targetQuestion!==null && targetQuestion.className} mt-4`}><AddQuestion/></div>
                            })}
                            <span onClick={()=>handleAddQuestionClick() }
                            style={{ fontWeight: '600', cursor: 'pointer' }} className='col-12 mt-4'><AddIcon /> Add a question</span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
);
}

