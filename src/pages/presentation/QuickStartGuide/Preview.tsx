
import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import QuickStartGuideEditor from './Editer';
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

const SingleFluidPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedContent, setSavedContent] = useState<string>(''); // Store the saved content

    const handleEditClick = () => {
        setIsModalOpen(true);
    };
    const QuickStartGuide: any = localStorage.getItem('QuickStartGuide');

    const handleEditorSave = (content: string) => {
      
        localStorage.setItem("QuickStartGuide",content)
   
        setSavedContent(content);
        setIsModalOpen(false);
    };
    const ApiDAta  ={}

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
                        Edit Quick Start Guide
                    </Button>
                </div>
            
        </Page>
        <Card className='py-5 px-5 mt-5'>
            <QuickStartGuideEditor
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}
                id="0"
                ApiDAta={ApiDAta || {}}
                onSave={handleEditorSave} // Pass the onSave function
            />
            {/* Display the saved content */}
            <div dangerouslySetInnerHTML={{ __html: QuickStartGuide }} />
        </Card>
    </PageWrapper>
    
    );
};

export default SingleFluidPage;

