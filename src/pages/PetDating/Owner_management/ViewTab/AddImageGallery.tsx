import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import { useDispatch} from 'react-redux';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import {  fetchUser, getbyidusers, uploadGalleryImages } from '../../../../redux/Slice/UserManagement_slice';
import img from '../../../../assets/img/user6.png';
import useDarkMode from '../../../../hooks/useDarkMode';

interface ICustomerEditModalProps {
	 
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const EditUser: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { darkModeStatus } = useDarkMode();

	const dispatch = useDispatch();
	//    const [modeId,setModeid]=useState<any>('')
	const modeid = localStorage.getItem('modeid');
	//    setModeid(localStorage.getItem('modeid'))
	//    yup
	const [avatarFil, setAvatarFile] = useState<any>(null);


		 
	


 
	const formik = useFormik({
		initialValues: {
			
		 
		},
	 

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values:any) => {
			console.log(values);
			try {
				 
				 console.log(id,avatarFil);
                 
                dispatch(uploadGalleryImages({id,avatarFil})as any)
                setTimeout(() => {
		
                    dispatch(getbyidusers(id) as any)
                }, 5000);

                if (avatarFil === null) {
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <Icon icon='Info' size='lg' className='me-1' />
                            <span>{avatarFil === null ?'The picture has not been Select': 'Picture Added Successfully'}</span>
                        </span>,
                         'The picture has not been added successfully' ,
                         
                    );
                } else {
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <Icon icon='Info' size='lg' className='me-1' />
                            <span>{avatarFil === null ?'Select Any Image': 'Picture Added Successfully'}</span>
                        </span>,
                          'Picture has been Added successfully',
                         
                    );
                }
			} catch (error) {
			} finally {
				// dispatch(fetchUser({ modeid }) as any);
				setAvatarFile(null)
			}
			setIsOpen(false);
		 
		},
	});
	const handleAvatarChang = (e: any) => {
		console.log(e.target.files[0]);
		setAvatarFile(e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0]);
		}
	};
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>Add New Photo</ModalTitle>
				</ModalHeader>
				<ModalBody className='mx-auto'>
				<div className='row '>
						<div
							className='col-md-12'
							style={{ display: 'flex', justifyContent: 'center' }}>
							<label htmlFor='avatarInput'>
								<div
									style={{
										border: '1px solid gray',
										width: '120px',
										height: '120px',
									 
										backgroundImage: `url(${img})`,
										 
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}>
									 
									 <img
										src={avatarFil
											? URL.createObjectURL(avatarFil)
											:`url(${img})`}
												alt='Avatar Preview'
												style={{
													width: '100%',
													height: '100%',
												 
												}}
											/>  

								 
									
											
										
										<input
											type='file'
											accept='image/'
											id='avatarInput'
											style={{
												width: '100%',
												height: '100%',
												opacity: 0,
												cursor: 'pointer',
											}}
											onChange={(e: any) => handleAvatarChang(e)}
										/>
								 
								</div>
							</label>
						</div>
					 

						 </div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={()=>{
						formik.handleSubmit()
					 }}>
						Upload
					</Button>
				</ModalFooter>
			</Modal>
		
		);
	}
	return null;
};
	

EditUser.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditUser;
