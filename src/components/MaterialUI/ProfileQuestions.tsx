import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetDataQuery } from '../../Redux/DataApi';
import { PersonalQuestions } from '../TaskOne';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateDataMutation } from '../../Redux/DataApi';



export default function ProfileBasicSelect() {
    const[sendData,setSendData]=React.useState<any>()
    const [Save]=useUpdateDataMutation()
    const {data:allData,isSuccess}=useGetDataQuery()
    const [questionInput, setQuestionInput] = React.useState<string>('')
    const [choices, setChoices] = React.useState(allData?.data.attributes.profile.profileQuestions[0].choices)
    const [ProfileQuestions,setProfileQuestions]=React.useState<any>()

    React.useEffect(() => {
        if (isSuccess) {
            const allQuestionsArray = Object.values(PersonalQuestions)
            setChoices(allQuestionsArray)
            setProfileQuestions(allData?.data.attributes.personalInformation.personalQuestions)
            setSendData(allData)
        }
    }, [isSuccess, allData])

const [currentQuestion, setCurrentQuestion] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
    setCurrentQuestion(event.target.value as string);
    };

    function handleSave() {
    const NewItem = {
        choices: choices,
        disqualify: false,
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08" + Math.random(),
        maxChoice: 0,
        other: false,
        question: questionInput,
        type:currentQuestion
    }
        setProfileQuestions([...ProfileQuestions, NewItem])
        setQuestionInput('')
        Save(sendData)
        console.log(ProfileQuestions);
        
    }
return (
    <Box sx={{ width: '100%' }}>
    <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Questions</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentQuestion}
        label="Questions"
        onChange={handleChange}
            >
                {choices?.map(question => {
                    return <MenuItem value={question} key={question} className='col-12'>{question }</MenuItem>
                })}
            </Select>
            <input
                    type='text'
                placeholder='type here'
                className='p-2 mt-2 inputPersonalQuestion rounded'
                onChange={(e) => setQuestionInput(e.target.value)}
                value={questionInput}
            />
            <div className='col-12 d-flex mt-2 justify-content-between'>
                <span style={{color:'#A80000', fontWeight:"500",cursor:'pointer'}} className='col-6'><CloseIcon/>delete question</span>
                <button disabled={questionInput.length===0} className='btnSave position-relative rounded col-2' onClick={handleSave}>save</button>
            </div>
    </FormControl>
    </Box>
);
}