
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import LegalEditor from './Editer';
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
import { updatetermsAndConditionsSlice } from '../../../redux/Slice/TermAndConditionSlice';
import { updatePrivecyPolicysSlice } from '../../../redux/Slice/PrivecyPolicysSlice';

const SingleFluidPage = ({ApiDAta}:any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedContent, setSavedContent] = useState<string>(''); // Store the saved content

    const handleEditClick = () => {
        setIsModalOpen(true);
    };
    const Legal: any = localStorage.getItem('Legal');

    const dispatch = useDispatch()
    const handleEditorSave = (content: string) => {

        const values= {['description']:content}
        const editId= ApiDAta?._id
      dispatch(updatePrivecyPolicysSlice({values,editId})as any)
      
        localStorage.setItem("Legal",content)
   
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
                        Edit Privacy Policys
                    </Button>
                </div>
            
        </Page>
        <Card className='py-5 px-5 mt-5'>
            <LegalEditor
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}
                id="0"
                onSave={handleEditorSave} // Pass the onSave function
            />
            {/* Display the saved content */}
            <div dangerouslySetInnerHTML={{ __html: ApiDAta?.description && ApiDAta?.description.length >= 20 ? ApiDAta?.description :'Privacy & Policy Last Updated: December 1, 2022 This Privacy Policy describes how Marier , collects, uses, and protects the personal information you provide when using our dating app. By using Marier, you consent to the practices outlined in this Privacy Policy.' }} />
        </Card>
    </PageWrapper>
    
    );
};

export default SingleFluidPage;

 

