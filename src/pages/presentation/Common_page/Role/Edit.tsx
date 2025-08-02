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
import { fetchRoles, update_Roles } from '../../../../redux/Slice/role_Slice';
import Spinner from '../../../../components/bootstrap/Spinner';

const defaultPermissions: Record<string, { read: boolean; write: boolean; delete: boolean }> = {
	"Admin (ACL)": { "read": true, "write": true, "delete": false },
	"Dashboard": { "read": true, "write": true, "delete": false },
	"Admin-menu": { "read": true, "write": true, "delete": false },
	"Admins": { "read": true, "write": true, "delete": false },
	"Customers": { "read": true, "write": true, "delete": false },
	"Providers": { "read": true, "write": true, "delete": false },
	"Drivers": { "read": true, "write": true, "delete": false },
	"Services": { "read": true, "write": true, "delete": false },
	"Offerings": { "read": true, "write": true, "delete": false },
	"Bookings": { "read": true, "write": true, "delete": false },
	"Transactions": { "read": true, "write": true, "delete": false },
	"Inventories": { "read": true, "write": true, "delete": false },
	"Preferences": { "read": true, "write": true, "delete": false },
	"Reviews": { "read": true, "write": true, "delete": false },
	"Plans": { "read": true, "write": true, "delete": false },
	"Subscriptions": { "read": true, "write": true, "delete": false },
	"Modes": { "read": true, "write": true, "delete": false },
	"Roles": { "read": true, "write": true, "delete": false },
	"Blogs": { "read": true, "write": true, "delete": false },
	"FAQs": { "read": true, "write": true, "delete": false },
	"Settings": { "read": true, "write": true, "delete": false },
	"Admin User": { "read": true, "write": true, "delete": false },
	"Access Control": { "read": true, "write": true, "delete": false },
	"Audit Logs": { "read": true, "write": true, "delete": false }
};

interface ICustomerEditModalProps {
	editId: any;
	editData: any;
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const EditModal: FC<ICustomerEditModalProps> = ({ id, isOpen, editId, editData, setIsOpen }) => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();
	const modeid = localStorage.getItem('modeid');
	const [errorHandling, setErrorHandling] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [permissions, setPermissions] = useState(editData.permissions || defaultPermissions);

	// Function to toggle permission states
	const handlePermissionChange = (category: string, permissionType: "read" | "write" | "delete") => {
		setPermissions((prev: any) => {
			const updatedPermissions = {
				...prev,
				[category]: {
					...prev[category],
					[permissionType]: !prev[category][permissionType],
				},
			};
			formik.setFieldValue('permissions', updatedPermissions); // Update Formik's state
			return updatedPermissions;
		});
	};


	const userValidation = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		display_name: Yup.string().required('Display name is required'),
		description: Yup.string().required('Description is required'),
		note: Yup.string().required('Note is required'),
		admin_note: Yup.string().required('Admin note is required'),
	});

	const formik = useFormik({
		initialValues: {
			name: editData.name || '',
			display_name: editData.display_name || '',
			description: editData.description || '',
			note: editData.note || '',
			admin_note: editData.admin_note || '',
			permissions: editData.permissions || {},
			mode: editData?.mode,
		},
		enableReinitialize: true,
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (values: any) => {
			setIsLoading(true);
			try {
				setErrorHandling(true);
				await dispatch(update_Roles({ editId, values }) as any);
				setIsLoading(false);
				dispatch(fetchRoles({ modeid }) as any);
			} catch (error) { }
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center '>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Update Successfully</span>
				</span>,
				'Role has been Updated successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{editData.name + ' Edit' || 'Edit Role'}</ModalTitle>
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

						<FormGroup id='permissions' label='Permissions *' className='col-md-12'>
							<div className='row'>
								{formik.values.permissions &&
									Object.entries(formik.values.permissions).map(([category, perms]) => {
										const typedPerms = perms as { read: boolean; write: boolean; delete: boolean }; // Explicitly type perms
										return (
											<div key={category} className='col-md-3 mb-3'>
												<div className='permission-card'>
													<h6 className='permission-title'>{category}</h6>
													<div className='permission-options'>
														{['read', 'write', 'delete'].map((perm) => (
															<Checks
																key={perm}
																label={perm.charAt(0).toUpperCase() + perm.slice(1)}
																checked={typedPerms[perm as 'read' | 'write' | 'delete']}
																onChange={() => handlePermissionChange(category, perm as 'read' | 'write' | 'delete')}
															/>
														))}
													</div>
												</div>
											</div>
										);
									})}
							</div>
							{formik.touched.permissions && formik.errors.permissions ? (
								<div className='errorMassage'>{formik.errors.permissions as any}</div>
							) : (
								<></>
							)}
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
							'Update'
						)}
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};

EditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditModal;
