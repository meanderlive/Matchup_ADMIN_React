import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
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
import { createUser, fetchUser } from '../../../redux/Slice/UserManagement_slice';
import { createSubscription, getAllSubscription, updateSubscriptionSlice } from '../../../redux/Slice/SubscriptionSlice';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	editData:any;
	editId:any;
	setIsOpen(...args: unknown[]): unknown;
}

const Edit: FC<ICustomerEditModalProps> = ({ id, isOpen,editData, editId,setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const modeid = localStorage.getItem('modeid');
	console.log(modeid);
	const dispatch = useDispatch();

	const [errorHandling, setErrorHandling] = useState(false);

	// new schema  yup--------
	const userValidation = Yup.object().shape({
		planName: Yup.string().required('Name is required'),
		
	});

	// -------------------------------

	const formik = useFormik({
		initialValues: {


         
        
			planPrice: editData.planPrice||0,
			planDuration: editData.planDuration||'',
			planDescription: editData.planDescription||'',
		  
		  planType:editData.planType||'',
		  planName:editData.planName||'',
		  
		  mode: modeid,
	  
		  Subscriptions: "string",
		 
			 
		 
	
		},
        enableReinitialize: true,

		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (values) => {
			 
			try {
				setErrorHandling(true);
				const res =await dispatch(updateSubscriptionSlice({editId,values}) as any);
				if(res.payload){
					dispatch(getAllSubscription(modeid) as any);
				  }
			} catch (error) {
			} finally {
				 
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'User has been Added successfully',
			);
		},
	});
	const iconNames  = [
		'AcUnit', 'AccessAlarm', 'Accessibility', 'Accessible', 'AccountBalance', 'AccountCircle',
		'Add', 'AddCircle', 'AddCircleOutline', 'Adjust', 'Alarm', 'AlarmAdd', 'AlarmOff', 'AlarmOn',
		'AllInclusive', 'AlternateEmail', 'Announcement', 'Api', 'Archive', 'ArrowBack', 'ArrowDownward',
		'ArrowDropDown', 'ArrowDropDownCircle', 'ArrowDropUp', 'ArrowForward', 'ArrowUpward', 'AttachFile',
		'Attachment', 'Audiotrack', 'Autorenew', 'Backspace', 'Backup', 'Ballot', 'BarChart', 'Battery20',  
	  ];

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{formik.values?.planName || 'edit Subscription'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
					<FormGroup id='planName' label='Plan Name *' className='col-md-12'>
              <Input
                name='planName'
                onChange={formik.handleChange}
                value={formik.values.planName}
              />
              {formik.errors.planName ? (
                <div className='errorMassage'>{formik.errors.planName as string}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='mode' label='Selected Mode' className='col-md-12'>
              <Input
                name='mode'
                onChange={formik.handleChange}
                value={formik.values.mode === '65943637acc570d6b14edf38' ? 'Matrimonial' :'Dating' }
                disabled
              />
              {formik.errors.mode ? (
                <div className='errorMassage'>{formik.errors.mode as string}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planPrice' label='Plan Price *' className='col-md-12'>
              <Input
			  type='number'
                name='planPrice'
                onChange={formik.handleChange}
                value={formik.values.planPrice}
              />
              {formik.errors.planPrice ? (
                <div className='errorMassage'>{formik.errors.planPrice as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planType' label='Plan Type *' className='col-md-12'>
              <Input
                name='planType'
                onChange={formik.handleChange}
                value={formik.values.planType}
              />
              {formik.errors.planType ? (
                <div className='errorMassage'>{formik.errors.planType as string}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planDuration' label='Plan Duration *' className='col-md-12'>
              <Input
                name='planDuration'
                onChange={formik.handleChange}
                value={formik.values.planDuration}
              />
              {formik.errors.planDuration ? (
                <div className='errorMassage'>{formik.errors.planDuration as string}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planDescription' label='Plan Description *' className='col-md-12'>
              <Input
                name='planDescription'
                onChange={formik.handleChange}
                value={formik.values.planDescription}
              />
              {formik.errors.planDescription ? (
                <div className='errorMassage'>{formik.errors.planDescription as string}</div>
              ) : (
                <div />
              )}
            </FormGroup>
       

						
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button
						color='info'
						onClick={() => {
							formik.handleSubmit();
						}}>
						Update
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
Edit.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default Edit;
