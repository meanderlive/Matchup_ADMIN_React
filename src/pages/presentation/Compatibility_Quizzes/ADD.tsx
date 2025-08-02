import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
 
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
 
import { createCompatibility, getAllCompatibilityApis } from '../../../redux/Slice/CompatibilitySlice';

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
	const state = useSelector((statee: any) => statee.interest);
	 
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const modeid = localStorage.getItem('modeid');
	const [anserArray,setAnswerAry]=useState<any>([])
 const [answerarray1,setAnswerArray ]= useState<any>('')
 const [answerarray2,setAnswerArray2 ]= useState<any>('')

 const [answerarray3,setAnswerArray3 ]= useState<any>('')

 const [answerarray4,setAnswerArray4 ]= useState<any>('')


	const dispatch = useDispatch();
	const [errorHandling, setErrorHandling] = useState(false);
 




 
	 
    
 
 
 
	 
	// new yup-------- schema 
	const userValidation = Yup.object().shape({
		question: Yup.string().required('Name is required'),
		answer: Yup.string().required('Email is required'),
		 
	  });

	// -------------------------------
 
	const formik = useFormik({	
		initialValues: {
			mode:modeid,
			question: "",
			answer:anserArray
			 
		},
		// validationSchema: userValidation,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async(values) => {
			
			try {
				const modify = {...values,answer:[answerarray1, answerarray2, answerarray3, answerarray4]}
		 
			dispatch(createCompatibility({ modify }) as any);

				// setErrorHandling(true);
				 setTimeout(() => {
					
					 dispatch(getAllCompatibilityApis( modeid ) as any);
				 }, 1000);
			} catch (error) {
			} finally {
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
 
 





	 
	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()}  >
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'New Compatibility Quizzes'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4 user-modal-body'>
	 
					 
							 
									<div className='row g-4 align-items-center' style={{ }}>
										<FormGroup id='question' label='Question' className='col-md-6'>
											<Input
												name='question'
												onChange={formik.handleChange}
												value={formik.values.question}
											/>
											{errorHandling && formik.errors.question ? (
												<div className='errorMassage'>{formik.errors.question}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup id='mode' label='Mode Selected' className='col-md-6'>
											<Input
											disabled
												name='mode'
												onChange={formik.handleChange}
												value={formik.values.mode === '658538b2e21518a3d04bf316' ? 'Matrimonial' :'Dating' }
											/>
											{errorHandling && formik.errors.mode ? (
												<div className='errorMassage'>{formik.errors.mode}</div>
											) : (
												<div />
											)}
										</FormGroup>
										<FormGroup id='answer' label='Answer (a)' className='col-md-6'>
											<Input
												name='answer'
												onChange={(e:any)=>setAnswerArray(e.target.value)}
												value={answerarray1}
											/>
										 
										</FormGroup>
										<FormGroup id='answer' label='Answer (b)' className='col-md-6'>
											<Input
												name='answer'
												onChange={(e:any)=>setAnswerArray2(e.target.value)}
												value={answerarray2}
											/>
											
										</FormGroup>
										<FormGroup id='answer' label='Answer (c)' className='col-md-6'>
											<Input
												name='answer'
												onChange={(e:any)=>setAnswerArray3(e.target.value)}
												value={answerarray3}
											/>
											
											
										</FormGroup>
										<FormGroup id='answer' label='Answer (d)' className='col-md-6'>
											<Input
												name='answer'
												onChange={(e:any)=>setAnswerArray4(e.target.value)}
												value={answerarray4}
											/>
										
											
										</FormGroup>
									 

									</div>
							 

					 
							 <div className='py-5'>

							 <Button
						color='info'
						className='col-1 col-sm-3 col-md-3 col-lg-2 col-xl-1 col-xxl-1	 float-end'
						onClick={() => {
							formik.handleSubmit();
							setErrorHandling(true);
						}}>
						Submit
					</Button>
							 </div>
						 
					 


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
