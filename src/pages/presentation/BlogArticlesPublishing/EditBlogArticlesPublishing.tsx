import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
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
import PAYMENTS from '../../../common/data/enumPaymentMethod';
// import { createSubscription, getallSubscription } from '../../../redux/Slice/SubscriptionPlans_Slice';
import { createblogSlice, getallblogSlice, updateblogSlice } from '../../../redux/Slice/BlogArticlesPublishingSlice';
import Textarea from '../../../components/bootstrap/forms/Textarea';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
    editId:string;
    editData:any;
	setIsOpen(...args: unknown[]): unknown;
}

const EditBlogArticlesPublishing: FC<ICustomerEditModalProps> = ({ id, isOpen,editId,editData, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const iddd = localStorage.getItem('modeid');
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			Image:editData.Image||'',
			title:editData.title|| "",
			description:editData.description|| "",
			publishedDate:editData.publishedDate|| "",
			modifiedDate:editData.modifiedDate|| "",
			status:editData.status|| "",
	 
			mode: iddd,
		},
        enableReinitialize: true,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			console.log(values);
			try {
				dispatch(updateblogSlice({editId,values}) as any);
			} catch (error) {
			}finally {
				dispatch(getallblogSlice(iddd)as any)
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'BlogArticlesPublishing has been Added successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.question || 'Edit Blog Articles Publishing'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
				<div className=' g-4'>
					<FormGroup id='Image' label='Image' className='col-12'>
							<Input
							type='file'
							 onChange={formik.handleChange} 
							 value={formik.values.Image}
							  
							 onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
														isValid={formik.isValid}

							  />
						</FormGroup>
						<FormGroup id='title' label='Title' className='col-12'>
							<Input
							 onChange={formik.handleChange} 
							 value={formik.values.title}
							 
							 
							 onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
														isValid={formik.isValid}

							  />
						</FormGroup>
						 
						<FormGroup
								id='description'
								label='description'
								className='my-5'
								isColForLabel
								labelClassName='col-sm-2  text-capitalize'
								childWrapperClassName='col-sm-10'>
								<Textarea value={formik.values.description}  onChange={formik.handleChange}    />
							</FormGroup>

						 
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Update
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
EditBlogArticlesPublishing.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditBlogArticlesPublishing;
