import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
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
import img from '../../../assets/Dogs.jpg';
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
import Avatar from '../../../components/Avatar';
import Select from '../../../components/bootstrap/forms/Select';
import Wizard, { WizardItem } from '../../../components/Wizard';
import { getAllInterest } from '../../../redux/Slice/IntersetSlice';
import { createPet, fetchPet } from '../../../redux/Slice/PetsManagement';

interface IPreviewItemProps {
	title: string;
	value: any | any[];
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};
interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const Add: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
 
	 
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const modeid = localStorage.getItem('modeid');
	const [avatarFil, setAvatarFile] = useState<any>();
	const [isProfileUploaded, setisProfileUploaded] = useState<boolean>(false);
 const [intersetArray,setIntersetArray]=useState<any >([])
 const [currentPage, setCurrentPage] = useState<number>(1);
 console.log(intersetArray,'ssdddsdsdssdsdsdsdsdsd');

	const dispatch = useDispatch();
	const [errorHandling, setErrorHandling] = useState(false);
	const heightArray = [];
	for (let i = 3; i <= 6.6; i += 0.1) {
		heightArray.push(parseFloat(i.toFixed(1)));
	}

	const WeightArray = [];




 
	 
	const stateinterest = useSelector((statee:any)=>statee.interest)
	const stateUser: any = useSelector((state: any) => state.user.users.data)
	console.log(stateUser)
	const dataa:any = stateinterest.interset.data
   useEffect(()=>{
	dispatch(fetchUser({ modeid, currentPage }) as any)
     dispatch(getAllInterest(modeid)as any)
   },[dispatch,modeid,currentPage])

	for (let i = 20; i < 120; i += 1) {
		WeightArray.push(i);
	}

	const NumberofSiblingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	// new yup-------- schema 
	const userValidation = Yup.object().shape({
		petName: Yup.string().required('Name is required'),
		petAge: Yup.string().required('Dob is required'),
		email: Yup.string().required('Dob is required'),

	  });

	// -------------------------------

	const formik = useFormik({	
		initialValues: {
			avtarInput: '',
            user:'',
			petName:'',
			petAge:'',
			email:'',
			password:'',
			DOB:'',
			petGender:'',
			subscription:false,
			petBreed:'',
			petType:'',
			image:'',
			mode: modeid,
			interest:intersetArray,
			description:'',
			status: "Active"
		},
		validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			console.log(values);
			try {
				setErrorHandling(true);
				dispatch(createPet({ values, avatarFil }) as any);
			} catch (error) {
			} finally {
				dispatch(fetchPet({ modeid }) as any);
				setIsOpen(false);
				showNotification(
					<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'User has been Added successfully',
				);
			}
		},
	});
	const [ApiTrue,setApiTrue]=useState(false)
	const handleAvatarChang = (e: any) => {

		setApiTrue(true)
	 
		console.log(e.target.files[0]);
		setAvatarFile(e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			setisProfileUploaded(true);
			setAvatarFile(e.target.files[0]);
		}
	};
	const handleActiveInteset =(idd:any)=>{
	const data2 =	intersetArray.includes(idd)
		if(data2){
			const updatedArray = intersetArray.filter((item2:any) => item2 !== idd);
			setIntersetArray(updatedArray);
		}else{
			setIntersetArray([...intersetArray, idd]);
			formik.setFieldValue('interest', intersetArray)
        
		}
	}





	 
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id.toString()}  >
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'New Pet'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4 user-modal-body'>
	 
			 
							 
									<div className='row g-4 align-items-center' style={{ }}>

							<FormGroup
							label='Add Profile Picture *'
							className='col-md-12'
							style={{ display: 'flex', justifyContent: 'center' }}>


							<label htmlFor='avatarInput' style={{margin: '47px 0px 0px -120px'}}>
							 
								<div
									style={{
										border: '1px solid gray',
										width: '120px',
										height: '120px',
										// borderRadius: '50%',
										backgroundImage: `url(${img})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}>
										{avatarFil && (
											<img
												src={URL.createObjectURL(avatarFil) || ''}
												alt='Avatar Preview'
												style={{
													width: '100%',
													height: '100%',
													// borderRadius: '50%',	
												}}
											/>)}
												<input
											type='file'
											accept='image/'
											id='avatarInput'
											name='image'
											style={{
												width: '100%',
												height: '100%',
												opacity: 0, 
												cursor: 'pointer',
											}}
											value={formik.values.image}
											onChange={(e: any) => handleAvatarChang(e)}
										/> 
										 
										<p className='text-center'> Click on Image</p>
								</div>
							</label>
						</FormGroup>
										<FormGroup id='petName' label='Name *' className='col-md-3'>
											<Input
												name='petName'
												onChange={formik.handleChange}
												value={formik.values.petName}
											/>
											{errorHandling && formik.errors.petName ? (
												<div className='errorMassage'>{formik.errors.petName}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup id='email' label='Email *' className='col-md-3'>
											<Input
												name='email'
												onChange={formik.handleChange}
												value={formik.values.email}
											/>
											{errorHandling && formik.errors.email ? (
												<div className='errorMassage'>{formik.errors.email}</div>
											) : (
												<div />
											)}
											</FormGroup>
											<FormGroup id='password' label='Password *' className='col-md-3'>
											<Input
												name='password'
												onChange={formik.handleChange}
												value={formik.values.password}
											/>
											{errorHandling && formik.errors.password ? (
												<div className='errorMassage'>{formik.errors.password}</div>
											) : (
												<div />
											)}
										</FormGroup>
									 
										<FormGroup id='petGender' label='Pet Gender *' className='col-md-3'>
										<select
												id='petGender'
												className='form-select'
												name='petGender'
												value={formik.values.petGender}
												onChange={formik.handleChange}>
												<option value='' disabled>
													...Select...
												</option>
												<option value='male'  >
													Male
												</option>
												<option value='female'  	>
													Female
												</option>
											 
											</select>
										 
											{errorHandling && formik.errors.petGender ? (
												<div className='errorMassage'>{formik.errors.petGender}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup id='petBreed' label='Pet 	Breed *' className='col-md-3'>
											<Input
												name='petBreed'
												onChange={formik.handleChange}
												value={formik.values.petBreed}
											/>
											{errorHandling && formik.errors.petBreed ? (
												<div className='errorMassage'>{formik.errors.petBreed}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup label='Pet Type *' className='col-md-3'>
											<select
												id='petType'
												className='form-select'
												name='petType'
												value={formik.values.petType}
												onChange={formik.handleChange}>
												<option value='' disabled>
													...Select...
												</option>
												 

													<option  value='Cat'>Cat</option>
													<option  value='Dog'>Dog</option>

												 
											 
											</select>
											{errorHandling && formik.errors.petType ? (
												<div className='errorMassage'>{formik.errors.petType}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup label='Owner Name *' className='col-md-3'>
											<select
												id='user'
												className='form-select'
												name='user'
												value={formik.values.user}
												onChange={formik.handleChange}>
												<option value='' disabled>
													...Select...
												</option>
												{stateUser && stateUser.map((itemUser:any,index:any)=>(

													<option key={itemUser._id} value={itemUser._id}>{itemUser.name}</option>
												))

												}
											 
											</select>
											{errorHandling && formik.errors.user ? (
												<div className='errorMassage'>{formik.errors.user}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup id='petAge' label='Pet Age' className='col-md-3'>
											<Input
												name='petAge'
												type='text'
												onChange={formik.handleChange}
												value={formik.values.petAge}
											/>
											{errorHandling && formik.errors.petAge ? (
												<div className='errorMassage'>{formik.errors.petAge}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup id='description' label='Description' className='col-md-12'>
											<Input
												name='description'
												onChange={formik.handleChange}
												value={formik.values.description}
											/>
											{errorHandling && formik.errors.description ? (
												<div className='errorMassage'>{formik.errors.description}</div>
											) : (
												<div />
											)}
										</FormGroup>
									 
									
										 
									 
									</div>
							 
 
						 
							 
					 

						 
						<div className='row g-4'  >
						 
							<FormGroup label='Interest *' className='row g-4 col-md-12'>
								{dataa && dataa.map((item22:any,index:Number)=>(

							<div
					 
							className='col-md-12 col-lg-6 col-xl-3   p-2'
							key={item22._id}
							>
		<Button  onClick={()=>handleActiveInteset(item22._id)as any}
						color='info'
						
						isActive={ intersetArray.includes(item22._id) }	
						isLight
						icon={item22.icon}
						tag='a'
						 
						 >
					{item22?.name}
					</Button>


									

							 
						</div>
							 ))}
				 </FormGroup>
							 
						
						<div
							className='col-md-12'
						 >

						<Button
						color='info'
						className='	 float-end'
						onClick={() => {
							formik.handleSubmit();
							setErrorHandling(true);
						}}>
						Submit
					</Button>
							</div>
							</div>
						 


						{/* <WizardItem   id='step3' title="Add Photo's">
						
						</WizardItem> */}
						 
				 


				</ModalBody>
				 
			</Modal>
		);
	}
	return null;
};
Add.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default Add;
