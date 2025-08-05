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

	const GALLERY = (
		<div className='row g-4'>
			{dataaaa?.avatars.length ? dataaaa?.avatars.map((item1: any, index: any) => (
				<div key={item1.id} className='col-xxl-2 col-lg-3 col-md-6 position-relative'>
					<p>{item1._id}</p>
					<button
						type='button'
						onClick={() => setSelectedImage(`https://datingapi.meander.software/assets/images/${item1}`)}
						className={classNames(
							'ratio ratio-1x1',
							'rounded-2',
							'border-0',
							`bg-l${darkModeStatus ? 'o25' : '25'}-${colors[index % 7]}`,
							`bg-l${darkModeStatus ? 'o50' : '10'}-${colors[index % 7]}-hover`,
						)}>
						<img
							src={`https://datingapi.meander.software/assets/images/${item1}` || item.src}

							alt={item1.id}
							width='100%'
							height='auto'
							className='object-fit-contain p-4'
						/>
					</button>
				{removeImage &&	<Button
				style={{background:'transparent',border:'none',color : 'black'}}
				icon='Cancel'
				 color='dark'  
          type='button'
          onClick={ ()=>removeImageFun(dataaaa?._id, item1)}	
          className='position-absolute top-0 end-0 m-2 '
        //   aria-label='Close'
        />}
				</div>
			)) : <p className='text-danger'>The user has not uploaded any images.</p>}
		</div>
	);



 
	return (
		 <>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='PhotoSizeSelectActual' iconColor='info'>
									<CardTitle>Photos </CardTitle>
									 
								</CardLabel>
								 
								<CardActions>
								<Button onClick={()=>{setEditModal(true)
								setRemoveImage(false)}}
						icon='Add' color='primary' isLight>
											Add New Photo
										</Button>
								<Button onClick={()=>setRemoveImage(!removeImage)}
						icon={removeImage ? 'Cancel' :'Delete'} color='danger' isLight>
											{removeImage ? 'Cancel' :'Remove Photo'}
										</Button>
								</CardActions>
							</CardHeader>
							<CardBody>{GALLERY}</CardBody>
						</Card>
					</div>

<Modal setIsOpen={setSelectedImage} isOpen={!!selectedImage} size='lg' >
<ModalHeader setIsOpen={setSelectedImage}>
	<ModalTitle id='preview'>Preview</ModalTitle>
</ModalHeader>
<ModalBody>
	<img src={selectedImage} alt='eneme' width='100%'/>
</ModalBody>
</Modal>

<AddImage setIsOpen={setEditModal} isOpen={editModal}   id={dataaaa?._id} />
		 </>
				 
	);
};

export default Gallery;
