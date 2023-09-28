import { useState, useRef, useEffect,ReactElement } from 'react';
import { useGetDataQuery } from '../Redux/DataApi';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import './Profile.css'
import ProfileBasicSelect from './MaterialUI/ProfileQuestions';
export interface IAppProps {
}
export function Profile(props: IAppProps) {
    const [ClonedQuestions,setClonedQuestions]=useState<any>([])
    const [startClone, setStartClone] = useState<number>(0)
    const {data:allData,isSuccess}=useGetDataQuery()
    const divREf=useRef<any>(null)

    const [show, setShow] = useState<boolean>(false)

    const [ProfileArray, setProfileArray] = useState<any>([])

    function ProfileMandatory(current:any) {
        const currentIndex = ProfileArray.findIndex((item: any) => item === current)
        const currentItem = ProfileArray[currentIndex]
        if (currentItem) {
            const updateItem = { ...currentItem[1], mandatory: !currentItem[1].mandatory }
            ProfileArray[currentIndex][1] = updateItem
        }
    }
    function ProfileShowSet(current:any) {
        const currentIndex = ProfileArray.findIndex((item: any) => item === current)
        const currentItem = ProfileArray[currentIndex]
        if (currentItem) {
            const updateItem = { ...currentItem[1], show: !currentItem[1].show }
            ProfileArray[currentIndex][1] = updateItem
        }
    }
    useEffect(() => {
        if (isSuccess) {
            const Profile = Object.entries(allData.data.attributes.profile)
            setProfileArray(Profile)

        }
    }, [isSuccess, allData])
    function handleAddQuestionClick():void {
        setShow(true)
        setStartClone(prev => prev + 1)
        if (startClone >= 1) {
        setClonedQuestions([...ClonedQuestions,divREf.current])
        }
    }
    function AddQuestion():ReactElement<typeof ProfileBasicSelect> {
        return <ProfileBasicSelect/>
    }
return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='profile p-0 col-5 mt-5 ms-5 d-flex flex-wrap'>
                        <h4 className='col-12 p-4 m-0'>Profile</h4>
                        {ProfileArray.length > 0 && ProfileArray.map((key: any) => {
                            return <div key={key[0]} className='col-12 py-3 RowOfData d-flex'>
                                <span className='col-6 d-flex align-items-center ps-3 '>
                                    {key[0]!=='profileQuestions'&&key[0]}
                                </span>
                                {key[0] !== 'profileQuestions' && <span className='col-6 d-flex h-auto'>
                                <span style={{ fontSize: '15px' }} className='col-6 d-flex align-self-start align-items-center'>
                            <Checkbox
                            sx={{width:'auto',height:'auto'}}
                            defaultChecked={key[1].mandatory}
                            onChange={() => ProfileMandatory(key)}
                            /> Mandatory
                                    </span>
                                    <span style={{ fontSize: '16px' }} className='col-6 d-flex align-self-start align-items-center'><Switch
                            defaultChecked={key[1].show}
                            onChange={() => ProfileShowSet(key)}
                            name='hide'
                            value={key[0]}
                            /> Hide</span>
                                </span>}
                            </div>
                        })}
                        <div className='ProfileQuestionContainer p-2 col-12 d-flex flex-column'>
                        {show&&<div ref={divREf}  className='col-12 d-flex flex-column'>
                                <ProfileBasicSelect/>
                            </div>}
                            {ClonedQuestions.length>0&&ClonedQuestions.map((targetQuestion:any) => {
                                return <div key={startClone+1} className={`${targetQuestion!==null && targetQuestion.className} mt-4`}><AddQuestion/></div>
                            })}
                            <span onClick={()=>handleAddQuestionClick() }
                            style={{ fontWeight: '600', cursor: 'pointer' }} className='col-12 mt-1'><AddIcon /> Add a question</span>
                        </div>
                    </div>
    </div>
    </div>
);
}
