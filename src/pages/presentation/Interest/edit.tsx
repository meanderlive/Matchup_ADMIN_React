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
import { createInterset, getAllInterest, updateInterestSlice } from '../../../redux/Slice/IntersetSlice';

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
		name: Yup.string().required('Name is required'),
		
	});

	// -------------------------------

	const formik = useFormik({
		initialValues: {
			name: editData.name||'',
			mode: modeid,
			icon:  editData.icon||'',
	
		},
        enableReinitialize: true,

		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (values) => {
			 
			try {
				setErrorHandling(true);
				const res =await dispatch(updateInterestSlice({editId,values}) as any);
				if(res.payload){
					dispatch(getAllInterest(modeid) as any);
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
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{formik.values?.name || 'edit Interest'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Name' className='col-md-12'>
							<Input
								name='name'
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
							{formik.errors.name ? (
								<div className='errorMassage'>Name is required</div>
							) : (
								<div/>
							)}
						</FormGroup>
						<FormGroup id='mode' label='Selected Mode' className='col-md-12'>
              <Input
                name='mode'
                onChange={formik.handleChange}
                value={formik.values.mode === '658538b2e21518a3d04bf316' ? 'Matrimonial' :'Dating' }
                disabled
              />
              {formik.errors.mode ? (
                <div className='errorMassage'>{formik.errors.mode}</div>
              ) : (
                <div />
              )}
            </FormGroup>
           

            <FormGroup label='Icon Name' className='col-12'>
             
            <select
                id='icon'
                className='form-select'
                name='icon'
                value={formik.values.icon}
                onChange={formik.handleChange}
              >
                <option value='' disabled>
                  ...Select...
                </option>
                {iconNames.map((item1: any, index: number) => (
                  <option key={item1} value={item1}>
                    <Icon icon={item1} size='lg' className='me-1' />
                    {item1}
                  </option>
                ))}
              </select>
			  {errorHandling && formik.errors.icon ? (
												<div className='errorMassage'>select icon *</div>
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
