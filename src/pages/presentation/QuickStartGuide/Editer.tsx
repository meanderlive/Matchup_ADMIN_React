

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../../../components/bootstrap/Button';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';

interface IEditModalProps {
    id: string;
    isOpen: boolean;
    ApiDAta:any;
    setIsOpen(...args: unknown[]): unknown;
    onSave(content: string): void; // Add onSave prop
}

const QuickStartGuideEditor: React.FC<IEditModalProps> = ({ isOpen,ApiDAta, setIsOpen, id, onSave }) => {
    const QuickStartGuide: any = localStorage.getItem('QuickStartGuide');

    const [editorHtml, setEditorHtml] = useState<string>(QuickStartGuide);

    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
    };

    const handleSave = () => {
        onSave(editorHtml);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId='modalTitle'>
            <ModalHeader>
                <h2>Privacy Policys Editor</h2>
            </ModalHeader>
            <ModalBody>
                <div>
                    <ReactQuill
                        value={ApiDAta?.description  || editorHtml}
                        onChange={handleEditorChange}
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['link'],
                                ['clean']
                            ],
                        }}  
                        style={{ maxHeight: '33vh', overflowY: 'auto', border: '1px solid #ced4da', borderRadius: '5px'}}
                    />
                    <div className='mt-3' style={{ maxHeight: '33vh', overflowY: 'auto', border: '1px solid #ced4da', borderRadius: '4px', padding: '8px' }}>
                        <h3>Preview:</h3>
                        <div  style={{ height: '33vh', overflowY: 'auto' }} dangerouslySetInnerHTML={{ __html: ApiDAta?.description  || editorHtml }} />
                    </div>
                    <Button
                        className='mt-3 mx-auto'
                        color='primary'
                        isLight
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default QuickStartGuideEditor;


