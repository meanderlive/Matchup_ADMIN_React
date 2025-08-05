import React, {   FC, useEffect, useState  } from 'react';
 
import {   useParams } from 'react-router-dom';
 
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
 
import data from '../../../../common/data/dummyCustomerData';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
 
 import AddImage from "./AddImageGallery";
import useDarkMode from '../../../../hooks/useDarkMode';
import { RemoveImageintoGallerys, getbyidusers } from '../../../../redux/Slice/UserManagement_slice';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
 

interface ICustomerEditModalProps {
	dataaaa:any
}
const Gallery: FC<ICustomerEditModalProps> = ({dataaaa}) => {




    
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
const [removeImage,setRemoveImage]=useState<boolean>(false)
	const [editModal, setEditModal] = useState<boolean>(false);
	 
	const { ids } = useParams();
	const dispatch = useDispatch()
	 

	
	
	useEffect(() => {
		dispatch(getbyidusers(ids) as any)
	}, [ids, dispatch])
	const { darkModeStatus } = useDarkMode();
	
	
 const removeImageFun = (id:any, item:any)=>{
	const data1 = {id,item}
	dispatch(RemoveImageintoGallerys(data1)as any)
	setTimeout(() => {
		
		dispatch(getbyidusers(id) as any)
	}, 4000);
	showNotification(
		<span className='d-flex align-items-center'>
			<Icon icon='danger' size='lg' className='me-1' />
			<span>Picture Remove Successfully</span>
		</span>,
		'Picture has been Removed successfully',
	);
 }






	 
	const itemData = data.filter((item) => item.id.toString() === '1');
	const item = itemData[0];
 
	 
 
	 

	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];
 


 
	return (
		 
					<div className='col-12'>
                    	<Card>
					{ dataaaa?.subscription ? 				<CardBody>
                            <div id='third' className='row scroll-margin'>
					<div className='col-12 my-3'>
						<div className='  fw-bold py-3'>{dataaaa.name} have a subscription premium plan.</div>
					</div>
					 
					<div className='col-md-12'> 
						<Card
							className={classNames({
								'bg-lo25-primary': darkModeStatus,
								'bg-l25-primary': !darkModeStatus,
							})}>
							<CardHeader
								borderSize={1}
								borderColor='primary'
								className='bg-transparent'>
								<div className='col text-center py-4 position-relative'>
									<h2 className='fw-bold display-5'>Premium Plan</h2>
									<div className='h5 fw-light'>Get the hack started.</div>
									<span className='position-absolute top-0 end-0 border border-primary border-2 text-primary fw-bold px-2 py-1 rounded-1 lead text-uppercase'>
										propose
									</span>
								</div>
							</CardHeader>
							<CardBody>
								<div className='row g-5 pt-4 text-center'>
									<div className='col-auto mx-auto'>
										<h3 className=' fw-bold pb-5'>  Unlimited Messaging
                                    
										</h3>
										<div className='text-end mt-n4'>
											<span className='fw-bold text-muted text-uppercase'>
                                            Enjoy unrestricted communication with other premium members.
											</span>
										</div>
									</div>
                                    <div className='col-auto mx-auto'>
										<h3 className='pb-5 fw-bold'>Advanced Search Filters
										</h3>
										<div className='text-end mt-n4'>
											<span className='fw-bold text-muted text-uppercase'>
                                            Boost your profile to stand out and increase chances of meaningful connections.
                                            
											</span>
										</div>
									</div>
                                    <div className='col-auto mx-auto'>
                                  
										<h3 className='pb-5 fw-bold'>  Ad-Free Experience
										</h3>
										<div className='text-end mt-n4'>
											<span className='fw-bold text-muted text-uppercase'>
                                            Navigate the site without interruptions, experiencing a seamless and enjoyable interface.
											</span>
										</div>
									</div>
									 
									<div className='col-12'/>
										 
									 
								</div>
							</CardBody>
						</Card>
					</div>
					 
				</div>
</CardBody>:	<div className='col-12 m-3'>
						<div className='  fw-bold p-3 text-danger'>{dataaaa.petName} does not have a subscription plan.</div>
					</div>
							 
			
}
						</Card>
					</div>

 
 
	 
				 
	);
};

export default Gallery;
