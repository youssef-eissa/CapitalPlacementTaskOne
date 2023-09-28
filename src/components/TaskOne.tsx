import { FC } from 'react';
import './TaskOne.css'
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { PersonalInformation } from './PersonalInformation';
import { UploadImg } from './UploadImg';
import { Profile } from './Profile';
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
                <div  className='theForm col-11 pb-5 d-flex flex-column'>
                    <div className='col-12  titles d-flex mt-5'>
                        <div style={{fontSize:'20px'}} className='p-5 col-3 d-flex justify-content-center align-items-center'>Program Details</div>
                        <div style={{fontSize:'20px'}} className='p-5 ApplicationFormTitle col-3 d-flex justify-content-center align-items-center'>Application Form</div>

                        <div style={{fontSize:'20px'}} className='WorkFlowtTitle p-5 col-3 d-flex justify-content-center align-items-center'>Workflow</div>

                        <div style={{fontSize:'20px'}} className='p-5 col-3 d-flex justify-content-center align-items-center'>Preview</div>

                    </div>
                    <UploadImg/>
                    <PersonalInformation/>
                <Profile/>
                </div>
            </div>
    </div>
    </div>
);
}

