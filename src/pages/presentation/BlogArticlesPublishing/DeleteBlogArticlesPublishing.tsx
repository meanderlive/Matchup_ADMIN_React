import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import { fetchUser, fetchdeleteUser } from '../../../redux/Slice/UserManagement_slice';
// import { fetchdeleteSubscription, getallSubscription } from '../../../redux/Slice/SubscriptionPlans_Slice';
import { deleteblogSlice, getallblogSlice } from '../../../redux/Slice/BlogArticlesPublishingSlice';
// import PAYMENTS from '../../../common/data/enumPaymentMethod';
interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	deleteId:any;

	
}
  
const  DeleteBlogArticlesPublishing: FC<ICustomerEditModalProps> = ({ id, isOpen,deleteId, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
   const dispatch =useDispatch()
   const iddd=localStorage.getItem('modeid')
 
   const handleDeleteClick = () => {
    setIsOpen(false);
	try {
		dispatch(deleteblogSlice(deleteId) as any);

			
		}catch (error) {
			
		}finally{
            dispatch(getallblogSlice(iddd)as any)
 
		}
};
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}  isCentered
            titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'Remove Blog'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
                <p>Are you sure you want to delete this Blog ?</p>
				</ModalBody>
	          <ModalFooter className='bg-transparent '>
								<div className='d-flex  justify-content-between w-100'>

								
							<Button
									color='info'
									className='w-50 m-2 '
									onClick={()=>setIsOpen(false)} 
								>
									No
								</Button>

								<Button 
                                	className='w-50 m-2 btn btn-danger'
									onClick={() => handleDeleteClick()}
								>
									Yes
								</Button>
								</div>
							</ModalFooter>
							
								</Modal>
		);
	}
	return null;
};
DeleteBlogArticlesPublishing.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default  DeleteBlogArticlesPublishing;
