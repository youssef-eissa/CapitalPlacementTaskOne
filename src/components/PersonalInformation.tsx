import { useState, useRef, useEffect, ReactElement } from 'react';
import { useGetDataQuery } from '../Redux/DataApi';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import BasicSelect from './MaterialUI/List';
import './PersonalInformation.css'

export interface IAppProps {
}

const fieldsDict = {
    firstName: 'First Name',
    lastName: 'Last Name',
    emailId: 'Email',
    phoneNumber: 'Phone (without dial code)',
    nationality: 'Nationality',
    currentResidence: 'Current Residence',
    idNumber: 'ID number',
    dateOfBirth: 'Date of Birth ',
    gender: 'Gender',
};
export function PersonalInformation(props: IAppProps) {
    const divREf=useRef<any>(null)
    const [ClonedQuestions,setClonedQuestions]=useState<any>([])

    const {data:allData,isSuccess}=useGetDataQuery()
    const [personalInformationArray, setpersonalInformationArray] = useState<any>([])
    const [show, setShow] = useState<boolean>(false)
    const [startClone, setStartClone] = useState<number>(0)
        useEffect(() => {
        if (isSuccess) {
            const personalInformation = Object.entries(allData.data.attributes.personalInformation)
            setpersonalInformationArray(personalInformation)

        }
        }, [isSuccess, allData])
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

    function shouldShowCheckbox(key: string):boolean {
        if (key !== 'firstName' && key !== 'lastName' && key !== 'emailId') {
            return true;
        }
        return false;
    }

return (
    <div className='container-fluid '>
        <div className='row'>
            <div className='personalInformation p-0 col-5 mt-5 ms-5 d-flex flex-wrap'>
                        <h4 className='col-12 p-4 m-0'>Personal Information</h4>
                        <div className='col-12 d-flex p-3 flex-column'>
                            {personalInformationArray.length > 0 && personalInformationArray.map((key:any,index:number) => {
                            return <div key={key[0]} className='col-12 py-3 RowOfData d-flex'>
                                <span className='col-6 d-flex align-items-center h-auto' >{fieldsDict[key[0] as keyof typeof fieldsDict]}</span>
                            {shouldShowCheckbox(key[0]) ? <span style={{ color: '#666666' }} className='col-6 d-flex h-auto'>
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
);
}
