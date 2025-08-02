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
import { createUser, fetchUser, fetchupdateUser } from '../../../redux/Slice/UserManagement_slice';
import img from '../../../assets/img/user6.png';
import { createProfile } from '../../../redux/Api/UserManagement';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import { getFirstLetter } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { getAllInterest } from '../../../redux/Slice/IntersetSlice';
import { getAll_Preference, update_Preference } from '../../../redux/Slice/Preferences_Slice';

interface ICustomerEditModalProps {
	editId: any;
	editData: any;
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const EditUser: FC<ICustomerEditModalProps> = ({ id, isOpen, editId, editData, setIsOpen }) => {
	const { darkModeStatus } = useDarkMode();

	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const dispatch = useDispatch();
	//    const [modeId,setModeid]=useState<any>('')
	const modeid = localStorage.getItem('modeid');
	//    setModeid(localStorage.getItem('modeid'))
	const [intersetArray, setIntersetArray] = useState<any>(editData?.interest)
	const [errorHandling, setErrorHandling] = useState(false);
	//    yup
	const [avatarFil, setAvatarFile] = useState<any>(null);

	const store = useSelector((statee: any) => statee);
	const role = store.role.roles.data ? store.role.roles.data : []

	const stateinterest = useSelector((statee: any) => statee.interest)

	const dataa: any = stateinterest.interset.data
	useEffect(() => {
		dispatch(getAllInterest(modeid) as any)
	}, [dispatch, modeid])
	const handleActiveInteset = (idd: any) => {
		const data2 = intersetArray.includes(idd)
		if (data2) {
			const updatedArray = intersetArray.filter((itema: any) => itema !== idd);
			setIntersetArray(updatedArray);
		} else {
			setIntersetArray([...intersetArray, idd])

		}
	}

	const heightArray = [];
	for (let i = 3; i <= 6.6; i += 0.1) {
		heightArray.push(parseFloat(i.toFixed(1)));
	}

	const WeightArray = [];

	for (let i = 20; i < 120; i += 1) {
		WeightArray.push(i);
	}

	const NumberofSiblingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const userValidation = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		description: Yup.string().required("Email is required"),
	});

	const formik = useFormik({
		initialValues: {
			name: editData?.name || '',
			display_name: editData?.display_name || '',
			description: editData?.description || '',
			note: editData?.note || '',
			admin_note: editData?.admin_note || '',
			mode: editData?.mode || '',
			service: editData?.service || '',
			is_activated: true,
		},

		enableReinitialize: true,
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (values: any) => {
			console.log(values);
			try {
				setErrorHandling(true);
			await	dispatch(update_Preference({ editId, values }) as any);
				dispatch(getAll_Preference({}) as any);

			} catch (error) {
			} finally {
				setAvatarFile(null)
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center '>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'User has been Added successfully',
			);
		},
	});
	const [ApiTrue, setApiTrue] = useState(false)
	const handleAvatarChang = (e: any) => {

		setApiTrue(true)

		setAvatarFile(e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0]);
		}
	};
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{editData?.name || 'Edit User'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id="name" label="Name" className="col-md-6">
							<Input
								name="name"
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
							{errorHandling && formik.errors.name ? (
								<div className="errorMassage">{formik.errors.name as any}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id="display_name" label="Display Name" className="col-md-6">
							<Input
								name="display_name"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.display_name}
							/>

							{errorHandling && formik.errors.display_name ? (
								<div className="errorMassage">{formik.errors.display_name as any}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id="description" label="Description" className="col-md-6">
							<Input
								name="description"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
							{errorHandling && formik.errors.description ? (
								<div className="errorMassage">{formik.errors.description as any}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id="note" label="Note" className="col-md-6">
							<Input
								name="note"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.note}
							/>
							{errorHandling && formik.errors.note ? (
								<div className="errorMassage">{formik.errors.note as any}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id="admin_note" label="Admin Note" className="col-md-6">
							<Input
								id="admin_note"
								// className="form-select"
								name="admin_note"
								value={formik.values.admin_note}
								onChange={formik.handleChange}
							/>
							{errorHandling && formik.errors.admin_note ? (
								<div className="errorMassage">{formik.errors.admin_note as any}</div>
							) : (
								<div />
							)}	
						</FormGroup>

						<FormGroup id="mode" label="Mode" className="col-md-6">
							<select
								id="mode"
								className="form-select"
								name="mode"
								value={formik.values.mode}
								onChange={formik.handleChange}
							>
								<option value="" disabled>
									...Select...
								</option>
								{role && role.map((Roleitem: any, index: any) => {

									return <option value={Roleitem?._id} key={Roleitem?._id}>{Roleitem?.name}</option>

								})}
							</select>
							{errorHandling && formik.errors.mode ? (
								<div className="errorMassage">{formik.errors.mode as any}</div>
							) : (
								<div />
							)}
						</FormGroup>
						<FormGroup id="service" label="service" className="col-md-6">
							<select
								id="service"
								className="form-select"
								name="service"
								value={formik.values.service}
								onChange={formik.handleChange}
							>
								<option value="" disabled>
									...Select...
								</option>
								{role && role.map((Roleitem: any, index: any) => {

									return <option value={Roleitem?._id} key={Roleitem?._id}>{Roleitem?.name}</option>

								})}
							</select>
							{errorHandling && formik.errors.service ? (
								<div className="errorMassage">{formik.errors.service as any}</div>
							) : (
								<div />
							)}
						</FormGroup>

						<FormGroup
							id="is_activated"
							label="Is Activated"
							className="col-md-6"
						>
							<select
								id="is_activated"
								className="form-select"
								name="is_activated"
								value={formik.values.is_activated as any}
								onChange={formik.handleChange}
							>
								<option value="true">True</option>
								<option value="false">False</option>
							</select>
							{errorHandling && formik.errors.is_activated ? (
								<div className="errorMassage">{formik.errors.is_activated as any}</div>
							) : (
								<div />
							)}
						</FormGroup>
					</div>

				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={() => {
						formik.handleSubmit()
						setErrorHandling(true)
					}}>
						Save
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
