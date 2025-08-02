import React, { FC, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormikHelpers, useFormik } from 'formik';
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
import { getAll_Service, update_Service, upload_Banner } from '../../../redux/Slice/Services_Slice';
import { fetchModes } from '../../../redux/Slice/Modes_Slice';

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
	const modeid = localStorage.getItem('modeid');
	const [intersetArray, setIntersetArray] = useState<any>(editData?.interest)
	const [errorHandling, setErrorHandling] = useState(false);
	const [avatarFil, setAvatarFile] = useState<any>(null);
	const store = useSelector((statee: any) => statee);
	const role = store.role.roles.data ? store.role.roles.data : []
	const stateinterest = useSelector((statee: any) => statee.interest)
	const dataa: any = stateinterest.interset.data
	const Data = store.mode.modes.data?.data
	const mode_data = Data
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	// Use Effect to handle preview and cleanup


	// Handle file selection
	const handleFileChange = (event: any) => {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		const file = event.currentTarget.files?.[0];

		if (file) {
			formik.setFieldValue("banner.bannerImage", file); // Corrected field path

			// Create Object URL for preview
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
		}
	};

	// Clean up object URL when component unmounts or file changes
	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	useEffect(() => {

		dispatch(fetchModes({}) as any);

		// if (modeid) {
		//   dispatch(getAllInterest(modeid) as any);
		// }
	}, [dispatch]);

	// const handleActiveInteset = (idd: any) => {
	// 	const data2 = intersetArray.includes(idd)
	// 	if (data2) {
	// 		const updatedArray = intersetArray.filter((itema: any) => itema !== idd);
	// 		setIntersetArray(updatedArray);
	// 	} else {
	// 		setIntersetArray([...intersetArray, idd])

	// 	}
	// }

	// const heightArray = [];
	// for (let i = 3; i <= 6.6; i += 0.1) {
	// 	heightArray.push(parseFloat(i.toFixed(1)));
	// }

	// const WeightArray = [];

	// for (let i = 20; i < 120; i += 1) {
	// 	WeightArray.push(i);
	// }

	const NumberofSiblingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const userValidation = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		display_name: Yup.string().required("Display Name is required"),
		description: Yup.string().required("Description is required"),
		banner: Yup.object().shape({
			title: Yup.string().required("Banner Title is required"),
			description: Yup.string().required("Banner Description is required"),
			bannerImage: Yup.mixed().required("Banner Image is required"),
		}),
		note: Yup.string().required("Note is required"),
		admin_note: Yup.string().required("Admin Note is required"),
		mode: Yup.string().required("Mode is required"),
		// Category: Yup.string().required("Category is required"),
		is_activated: Yup.boolean().required("Is Activated is required"),
	});

	// eslint-disable-next-line @typescript-eslint/no-shadow
	const UploadBanner = async (bannerImage: any, editData: any, editId: any) => {
		if (bannerImage instanceof File) {
			const BannerData = new FormData();
			BannerData.append("bannerImage", bannerImage); // Correctly append the file
			BannerData.append("title", editData?.banner?.title || "");
			BannerData.append("description", editData?.banner?.description || "");

			console.log("Uploading banner...");
			BannerData.forEach((value, key) => {
				console.log(`${key}:`, value);
			});

			const uploadResponse = await dispatch(upload_Banner({ BannerData, editId }) as any);
			console.log("Banner upload respons:", uploadResponse);
			if (uploadResponse?.success && uploadResponse?.data) {
				return uploadResponse.data.banner; // Return the uploaded URL
			} else {
				console.error("Banner upload failed:", uploadResponse);
				throw new Error("Banner upload failed");
			}
		}
		return null; // No upload needed
	};


	const formik = useFormik({

		initialValues: {
			name: editData?.name || '',
			display_name: editData?.display_name || '',
			description: editData?.description || '',
			banner: {
				title: editData?.banner?.title || '',
				description: editData?.banner?.description || '',
				bannerImage: editData?.banner?.bannerImage || '',

			},
			note: editData?.note || '',
			admin_note: editData?.admin_note || '',
			mode: editData?.mode || '',
			Category: editData?.Category || '',
			is_activated: true,

		},

		enableReinitialize: true,
		validationSchema: userValidation,



		onSubmit: async (values: any, { setSubmitting }: FormikHelpers<any>) => {

			try {
				setErrorHandling(true);
				console.log(values, "valuesupdated debug");

				// Extract banner image from Formik values
				const bannerImage = values?.banner?.bannerImage;
				let uploadedBannerUrl = values?.banner?.bannerImage; // Default to existing banner image

				// If bannerImage is a File, upload it first
				if (bannerImage instanceof File) {
					uploadedBannerUrl = await UploadBanner(bannerImage, values, editId);
				}

				// Prepare updated values
				const updatedValues = {
					...values,
					banner: {
						...values.banner,
						bannerImage: uploadedBannerUrl, // Use uploaded banner URL or existing one
					},
				};

				console.log("Updating service with values:", updatedValues);
				await dispatch(update_Service({ editId, values: updatedValues }) as any);

				// Show success notification
				showNotification(
					<span className="d-flex align-items-center">
						<Icon icon="Info" size="lg" className="me-1" />
						<span>Updated Successfully</span>
					</span>,
					"Service has been updated successfully"
				);
			} catch (error) {
				console.error("Error in submitting:", error);
			} finally {
				setSubmitting(false);
				dispatch(getAll_Service({}) as any);
				setIsOpen(false);
			}
		}


	});

	// Create preview URL when file is set
	useEffect(() => {
		if (file) {
			const objectURL = URL.createObjectURL(file);
			setPreview(objectURL);

			return () => {
				URL.revokeObjectURL(objectURL);
			};
		}
	}, [file]);

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
								{Array.isArray(mode_data) ? (
									mode_data.map((items: any, index: number) => (
										<option key={index} value={items._id}>
											{items.name}
										</option>
									))
								) : (
									<option disabled>Loading...</option>
								)}
							</select>
							{errorHandling && formik.errors.mode ? (
								<div className="errorMassage">{formik.errors.mode as any}</div>
							) : (
								<div />
							)}
						</FormGroup>
						{/* <FormGroup id="mCategoryode" label="Category" className="col-md-6">
							<select
								id="Category"
								className="form-select"
								name="Category"
								value={formik.values.Category}
								onChange={formik.handleChange}
							>
								<option value="" disabled>
									...Select...
								</option>
								{role && role.map((Roleitem: any) => {

									return <option value={Roleitem?._id} key={Roleitem?._id}>{Roleitem?.name}</option>

								})}
							</select>
							{errorHandling && formik.errors.Category ? (
								<div className="errorMassage">{formik.errors.Category as any}</div>
							) : (
								<div />
							)}
						</FormGroup> */}

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
						<FormGroup id="banner_title" label="Banner Title" className="col-md-6">
							<Input
								id="banner_title"
								name="banner.title"
								className="form-control"
								value={formik.values.banner.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{errorHandling && formik.touched.banner?.title && formik.errors.banner?.title ? (
								<div className="errorMessage">{formik.errors.banner.title as any}</div>) : (
								<div />
							)}
						</FormGroup>

						<FormGroup id="banner_description" label="Banner Description" className="col-md-6">
							<Input
								id="banner_description"
								name="banner.description"
								className="form-control"
								value={formik.values.banner.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{errorHandling && formik.touched.banner?.description && formik.errors.banner?.description ? (
								<div className="errorMessage">{formik.errors.banner.description as any}</div>) : (
								<div />
							)}
						</FormGroup>



						<FormGroup id="banner_image" label="Banner Image" className="col-md-6">
							<input
								type="file"
								id="banner_image"
								name="banner.bannerImage"
								className="form-control"
								accept="image/*"
								onChange={handleFileChange}
							/>

							{/* Image Preview */}
							{formik.values.banner.bannerImage && (
								<img
									src={previewUrl}
									alt="Banner Preview"
									style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "5px" }}
								/>
							)
							}
							{/* Show Validation Errors */}
							{errorHandling && formik.touched.banner?.bannerImage && formik.errors.banner?.bannerImage ? (
								<div className="errorMessage">{formik.errors.banner.bannerImage as any}</div>
							) : (
								<div />)}
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
