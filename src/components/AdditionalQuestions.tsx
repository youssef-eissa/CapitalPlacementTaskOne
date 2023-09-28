import * as React from 'react';
import './AdditionalQuestion.css'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export interface IAppProps {
}

export function AdditionalQuestions (props: IAppProps) {
return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='AdditionalQuestions p-0 col-5 mt-5 ms-5 d-flex flex-wrap'>
                <h4 className='col-12 p-4 m-0'>Additional Questions</h4>
                <div className='AdditionalQuestionsContainer col-12 d-flex flex-wrap p-4'>
                    <div className='col-12 d-flex flex-wrap p-3'>
                        <span className='col-12' style={{ color: "#979797", fontSize: '14px' }}>Paragraph</span>
                    <div className='col-11 bb fw-bold'>Please tell me about yourself in less than 500 words</div>
                    <span className='col-1'><CreateOutlinedIcon /></span>
                    </div>
                    <div className='col-12 d-flex flex-wrap p-3'>
                        <span className='col-12' style={{ color: "#979797", fontSize: '14px' }}>Dropdown</span>
                    <div className='col-11 bb fw-bold'>Please select the year of graduation from the list below</div>
                    <span className='col-1'><CreateOutlinedIcon /></span>
                    </div>
                    <div className='col-12 d-flex align-items-center flex-column p-3'>
                        <h5 className='col-12'>Questions</h5>
                        <input
                            className='col-12 p-3 rounded'
                            placeholder='Type here'
                        />
                        <div className='col-11 d-flex flex-wrap  mt-5'>
                            <h5 className='col-12'>Choice</h5>
                            <div className='col-12 d-flex align-items-center justify-content-center'>
                                <FormatListBulletedOutlinedIcon className='col-2' />
                            <input
                            className='col-8 p-3 rounded'
                                />
                                <AddOutlinedIcon className='col-2'/>
                            </div>
                        </div>
                        <div className='col-12 d-flex my-3'>
                            <span style={{ color: '#A80000' }} className='col-6'><CloseOutlinedIcon /> Delete Question</span>
                        <span className='col-6 text-end'>
                            <button className='rounded' style={{border:'none',color:'white',backgroundColor:'#087B2F'}}>save</button>
                        </span>
                        </div>
                    </div>
                    <div className='col-12 mt-2 d-flex flex-wrap'>
                        <span className='col-12' style={{ color: "#979797", fontSize: '14px' }}>Yes/No questions</span>
                        <div className='col-11 bb fw-bold mt-3 '>Have you ever been rejected by the UK embassy?</div>
                    <span className='col-1 mt-3'><CreateOutlinedIcon /></span>
                        <div className='col-12 mt-4'><AddOutlinedIcon/> Add Question</div>
                    </div>
            </div>
            </div>
            
    </div>
    </div>
);
}
