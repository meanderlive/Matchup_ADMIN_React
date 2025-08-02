
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import TermsAndConditionsEditor from './TandC';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
	CardFooter,
	CardFooterRight,
	CardFooterLeft,
	CardTabItem,
} from '../../../components/bootstrap/Card';
import { getalltermsAndConditionsSlice, updatetermsAndConditionsSlice } from '../../../redux/Slice/TermAndConditionSlice';

const SingleFluidPage = ({ApiDAta}:any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedContent, setSavedContent] = useState<string>(''); 
	const dispatch = useDispatch()
     
 
    
    
 
    const handleEditClick = () => {
        setIsModalOpen(true);
    };
    const TermCondition: any = localStorage.getItem('TermCondition');

    const handleEditorSave = (content: string) => {

        const values= {['description']:content}
        const editId= ApiDAta?._id
      dispatch(updatetermsAndConditionsSlice({values,editId   
        
    })as any)
        localStorage.setItem("TermCondition",content)
   
        setSavedContent(content);
        setIsModalOpen(false);
    };

    return (
        <PageWrapper title={demoPagesMenu.singlePages.subMenu.fluidSingle.text}>
        <Page container >
           
                <div className='d-flex justify-content-end'>
                    <Button
                        icon='edit'
                        color='primary'
                        isLight
                        onClick={handleEditClick}
                        className='py-2'
                    >
                        Edit Term And Conditions
                    </Button>
                </div>
            
        </Page>
        <Card className='py-5 px-5 mt-5'>
            <TermsAndConditionsEditor
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}
                id="0"
                ApiDAta={ApiDAta}
                onSave={handleEditorSave} // Pass the onSave function
            />
            {/* Display the saved content */}
            <div dangerouslySetInnerHTML={{ __html: ApiDAta?.description&& ApiDAta?.description.length >= 20 ? ApiDAta?.description : TermCondition }} />
        </Card>
    </PageWrapper>
    
    );
};

export default SingleFluidPage;

