import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import data from '../../../../common/data/dummyCustomerData';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Label from '../../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../../common/data/enumPaymentMethod';
import {
	createUser,
	fetchUser,
	fetchupdateUser,
} from '../../../../redux/Slice/UserManagement_slice';

import { createProfile } from '../../../../redux/Api/UserManagement';
import { getColorNameWithIndex } from '../../../../common/data/enumColors';
import { getFirstLetter } from '../../../../helpers/helpers';
import useDarkMode from '../../../../hooks/useDarkMode';
import { getAllInterest } from '../../../../redux/Slice/IntersetSlice';
import { create_roles, fetchRoles } from '../../../../redux/Slice/role_Slice';
import Spinner from '../../../../components/bootstrap/Spinner';
import { create_modes, fetchModes } from '../../../../redux/Slice/Modes_Slice';
import { create_tag_SubCategorys, getAll_Tag_SubCategorys } from '../../../../redux/Slice/Tag_Slice  ';
import { getAll_Tag_categorys } from '../../../../redux/Slice/Tag_Category_Slice ';
import { log } from 'console';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const Addmodal: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();
	const modeid = localStorage.getItem('modeid');
	const [errorHandling, setErrorHandling] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);


	const stateCategory: any = useSelector((state: any) => state.TagCategory);
	// const CategoryData = stateCategory.modes.data
	const CategoryData = Array.isArray(stateCategory?.modes?.data) ? stateCategory.modes.data : [];
	const stateMode: any = useSelector((state: any) => state.mode);
	// const ModeData = stateMode.modes.data
	const ModeData = Array.isArray(stateMode?.modes?.data) ? stateMode.modes.data : [];

	// console.log("check the data of category", ModeData);
	useEffect(() => {
		dispatch(fetchModes({}) as any);
		dispatch(getAll_Tag_categorys({}) as any);
		// dispatch(getbyID_Tag_Categorys({ ID: id }) as any);
		// dispatch(all_mode_with_Admins({}) as any);

	}, [dispatch]);

	const userValidation = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		display_name: Yup.string().required('Display name is required'),
		description: Yup.string().required('Description is required'),
		note: Yup.string().required('Note is required'),
		admin_note: Yup.string().required('Admin note is required'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			display_name: '',
			description: '',
			note: '',
			admin_note: '',
			tagcategories_ids: [
				{
					_id: "",
				}
			] as unknown as string[],
			mode: "",

		},
		enableReinitialize: true,
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (values: any) => {
			// console.log(values, "valuesvaluesvalues");

			setIsLoading(true);
			try {

				setErrorHandling(true);
				await dispatch(create_tag_SubCategorys({ values }) as any);
				setIsLoading(false);
				dispatch(getAll_Tag_SubCategorys('') as any);
			} catch (error) { }
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center '>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Update Successfully</span>
				</span>,
				'Tag has been Updated successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>Add New Tag</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Name *' className='col-md-12'>
							<Input
								name='name'
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
							{formik.touched.name && formik.errors.name ? (
								<div className='errorMassage'>{formik.errors.name as any}</div>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup id='display_name' label='Display Name *' className='col-md-12'>
							<Input
								name='display_name'
								onChange={formik.handleChange}
								value={formik.values.display_name}
							/>
							{formik.touched.display_name && formik.errors.display_name ? (
								<div className='errorMassage'>
									{formik.errors.display_name as any}
								</div>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup id='description' label='Description *' className='col-md-12'>
							<Input
								name='description'
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
							{formik.touched.description && formik.errors.description ? (
								<div className='errorMassage'>
									{formik.errors.description as any}
								</div>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup id='note' label='Note *' className='col-md-12'>
							<Input
								name='note'
								onChange={formik.handleChange}
								value={formik.values.note}
							/>
							{formik.touched.note && formik.errors.note ? (
								<div className='errorMassage'>{formik.errors.note as any}</div>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup id='admin_note' label='Admin Note *' className='col-md-12'>
							<Input
								name='admin_note'
								onChange={formik.handleChange}
								value={formik.values.admin_note}
							/>
							{formik.touched.admin_note && formik.errors.admin_note ? (
								<div className='errorMassage'>
									{formik.errors.admin_note as any}
								</div>
							) : (
								<></>
							)}
						</FormGroup>
						{/* <FormGroup id='name' label='Tag Category *' className='col-md-12'>
							<select
								name='name'
								onChange={formik.handleChange}
								value={formik.values.name} // Use the correct value
								className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
							>
								<option value='' label='Select an option' />
								{ CategoryData.map((item :any) => (
									<option key={item?.name?.value} value={item?.name?.value}>
										{item.label}
									</option>
								))}
							</select>
							
							<></>
						</FormGroup> */}
						{/* <FormGroup id='tagcategories_ids' label='Tag Category *' className='col-md-6'>
							<select
								name='tagcategories_ids'
								onChange={formik.handleChange}
								value={formik.values.tagcategories_ids[""]} // Use the correct formik value
								className={`form-control ${formik.touched.tagcategories_ids && formik.errors.tagcategories_ids ? 'is-invalid' : ''}`}
							>
								<option value='' label='Select an option' />
								{CategoryData?.map((item: any,index :any) => (
									<option key={index} value={item?.id}>
										{item?.name} 
									</option>
								))}
							</select>
							
						</FormGroup> */}
						<FormGroup id='tagcategories_ids' label='Tag Category *' className='col-md-6'>
							<select
								name='tagcategories_ids'
								onChange={(e) => {
									// Update the state with the selected ID in an array format
									formik.setFieldValue('tagcategories_ids', [e.target.value]);
								}}
								value={formik.values.tagcategories_ids[0] || ''} // Use the first element of the array or default to empty string
								className={`form-control ${formik.touched.tagcategories_ids && formik.errors.tagcategories_ids ? 'is-invalid' : ''}`}
							>
								<option value='' label='Select an option' />
								{CategoryData?.map((item: any, index: any) => (
									<option key={index} value={item?._id}>
										{item?.name}
									</option>
								))}
							</select>
							{formik.touched.tagcategories_ids && formik.errors.tagcategories_ids ? (
								<div className='errorMassage'>{formik.errors.tagcategories_ids as any}</div>
							) : <></>}
						</FormGroup>

						{/* <FormGroup id='mode' label='MODE *' className='col-md-6'>
							<select
								name='mode'
								onChange={formik.handleChange}
								value={formik.values.mode} // Use the correct formik value
								className={`form-control ${formik.touched.mode && formik.errors.mode ? 'is-invalid' : ''}`}
							>
								<option value='' label='Select an option' />
								{ModeData?.map((item: any, index: any) => (
									<option key={index} value={item?.id}>
										{item?.name}
									</option>
								))}
							</select>

						</FormGroup> */}

						<FormGroup id='mode' label='MODE *' className='col-md-6'>
							<select
								name='mode'
								onChange={(e) => {
									// Update Formik's mode value with the selected option's value
									formik.setFieldValue('mode', e.target.value);
								}}
								value={formik.values.mode} // Use the correct formik value
								className={`form-control ${formik.touched.mode && formik.errors.mode ? 'is-invalid' : ''}`}
							>
								<option value='' label='Select an option' />
								{ModeData?.map((item: any, index: any) => (
									<option key={index} value={item?._id}>
										{item?.name}
									</option>
								))}
							</select>
							{formik.touched.mode && formik.errors.mode ? (
								<div className='errorMassage'>{formik.errors.mode as any}</div>
							) : <></>}
						</FormGroup>


					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button
						color='info'
						onClick={() => {
							formik.handleSubmit();
							setErrorHandling(true);
						}}>
						{isLoading ? (
							<>
								<Spinner isSmall inButton isGrow /> loading...
							</>
						) : (
							'Save'
						)}
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};

Addmodal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default Addmodal;
