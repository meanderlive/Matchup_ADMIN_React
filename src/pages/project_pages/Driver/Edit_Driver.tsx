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
	const [intersetArray,setIntersetArray]=useState<any >(editData?.interest)
	const [errorHandling, setErrorHandling] = useState(false);
	//    yup
	const [avatarFil, setAvatarFile] = useState<any>(null);

	const store = useSelector((statee: any) => statee);
	const role = store.role.roles.data.data ? store.role.roles.data.data :[]
		 
	const stateinterest = useSelector((statee:any)=>statee.interest)
 
	const dataa:any = stateinterest.interset.data
//    useEffect(()=>{
//      dispatch(getAllInterest(modeid)as any)
//    },[dispatch,modeid])
   const handleActiveInteset =(idd:any)=>{
	const data2 =	intersetArray.includes(idd)
		if(data2){
			const updatedArray = intersetArray.filter((itema:any) => itema !== idd);
			setIntersetArray(updatedArray);
		}else{
			setIntersetArray([...intersetArray,idd])
        
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
		fullname: Yup.string().required('Name is required'),
		email: Yup.string().email('invalid email').required('Email is required'),
		dob: Yup.string().required('required'),
 
		gender: Yup.string().required('required'),
		 
		 
	});
 
	const formik = useFormik({
		initialValues: {
			fullname: editData?.fullname || '',
			email: editData?.email || '',
			contact_number: editData?.contact_number || '',
			password:editData?.password ||'',
			dob: moment(editData?.dob).format("YYYY-MM-DD") || '', // Should be in the format "YYYY-MM-DDTHH:MM:SS.MSSZ"
			gender: editData?.gender || '', // Assuming it's either "Male" or "Female" or "Other"
			mode: modeid, // Example: "modeid"
			role: editData?.role || '', // Example: "iAm" or "looking"
			is_activated: true, // Assuming this is a boolean indicating activation status
			 default_admin: true,
			
		  },
		 
		enableReinitialize: true,
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values:any) => {
			console.log(values);
			try {
				setErrorHandling(true);
				dispatch(fetchupdateUser({editId, values}) as any);
				if(ApiTrue){
					const imageid = editId
					createProfile({imageid,avatarFil})

				}
			} catch (error) {
			} finally {
				dispatch(fetchUser({ modeid }) as any);  
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
	const [ApiTrue,setApiTrue]=useState(false)
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
					<ModalTitle id={id}>{item?.name || 'Edit User'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>

					
				<div className='row g-4'>
						{/* <div
							className='col-md-6'
							style={{ display: 'flex', justifyContent: 'center' }}>
							<label htmlFor='avatarInput'>
								<div
									style={{
										border: '1px solid gray',
										width: '120px',
										height: '120px',
										borderRadius: '50%',
										// backgroundImage: `https://datingapi.meander.software/assets/images/${editData?.avatars[0]}`,
										// backgroundImage: `https://datingapi.meander.software/assets/images/1702641146547.jpg`,

										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}>
									{
										editData?.avatars ? <img
										src={avatarFil
											? URL.createObjectURL(avatarFil)
											: `https://datingapi.meander.software/assets/images/${editData?.mainAvatar || 'default-image.jpg' // Provide a default image or handle accordingly
											  }`
										  }
												alt='Avatar Preview'
												style={{
													width: '100%',
													height: '100%',
													borderRadius: '50%',
												}}
											/> :<div
											style={{
												width: '100%',
												height: '100%',
												borderRadius: '50%',
											}}
												className={`bg-l${
													darkModeStatus
														? 'o25'
														: '25'
												}-${getColorNameWithIndex(0,
												)} text-${getColorNameWithIndex(0,
												)} d-flex align-items-center justify-content-center`}>
												<span className='fw-bold ' >
													{getFirstLetter(formik.values.name)}
												</span>
											</div> 

									}
									
											
										
										<input
											type='file'
											accept='image/'
											id='avatarInput'
											style={{
												width: '100%',
												height: '100%',
												opacity: 0,
												// position: 'absolute',
												// top: 0,
												// left: 0,
												cursor: 'pointer',
											}}
											onChange={(e: any) => handleAvatarChang(e)}
										/>
									{/* <Button
											icon='Edit'
											style={{
												position: 'absolute',
												top: '67%',
												right: '55%',
											}}
										/>  
								</div>
							</label>
						</div> */}

						
						 <FormGroup id="fullname" label="Name" className="col-md-6">
              <Input
                name="fullname"
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
              {errorHandling && formik.errors.fullname ? (
                <div className="errorMassage">{formik.errors.fullname as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>

            <FormGroup id="email" label="Email" className="col-md-6">
              <Input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {errorHandling && formik.errors.email ? (
                <div className="errorMassage">{formik.errors.email as any }</div>
              ) : (
                <div />
              )}
            </FormGroup>

            <FormGroup id="password" label="Password" className="col-md-6">
              <Input
                name="password"
                type="text"
				placeholder='If you want change password then enter your new password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {errorHandling && formik.errors.password ? (
                <div className="errorMassage">{formik.errors.password as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>

            <FormGroup id="dob" label="Birthday" className="col-md-6">
              <Input
                name="dob"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.dob}
              />
              {errorHandling && formik.errors.dob ? (
                <div className="errorMassage">{formik.errors.dob as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>

            <FormGroup id="gender" label="Gender" className="col-md-6">
              <select
                id="gender"
                className="form-select"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  ...Select...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errorHandling && formik.errors.gender ? (
                <div className="errorMassage">{formik.errors.gender as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>

            

            <FormGroup id="role" label="Role" className="col-md-6">
              <select
                id="role"
                className="form-select"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  ...Select...
                </option>
         {  role && role.map((Roleitem:any,index:any)=>{

return<option value={Roleitem?._id} key={Roleitem?._id}>{Roleitem?.name}</option> 
           

         })   }
              
              </select>
              {errorHandling && formik.errors.gender ? (
                <div className="errorMassage">{formik.errors.gender as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>

            <FormGroup
              id="contact_number"
              label="Phone No *"
              className="col-md-6"
            >
              <Input
                name="contact_number"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.contact_number}
              />
              {errorHandling && formik.errors.contact_number ? (
                <div className="errorMassage">
                  {formik.errors.contact_number as any}
                </div>
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
			<FormGroup
              id="default_admin"
              label="Default Admin"
              className="col-md-6"
            >
              <select
                id="default_admin"
                className="form-select"
                name="default_admin"
                value={formik.values.default_admin as any}
                onChange={formik.handleChange}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              {errorHandling && formik.errors.default_admin ? (
                <div className="errorMassage">{formik.errors.default_admin as any}</div>
              ) : (
                <div />
              )}
            </FormGroup>
					</div>
					 
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={()=>{
						formik.handleSubmit()
					setErrorHandling(true)}}>
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
