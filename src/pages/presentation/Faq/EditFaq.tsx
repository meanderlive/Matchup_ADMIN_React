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
import { createSubscription, getallSubscription } from '../../../redux/Slice/SubscriptionPlans_Slice';
import { createFaqSlice, getallFaqSlice, updateFaqSlice } from '../../../redux/Slice/FaqSlice';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
    editId:string;
    editData:any;
	setIsOpen(...args: unknown[]): unknown;
}

const EditFaq: FC<ICustomerEditModalProps> = ({ id, isOpen,editId,editData, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const iddd = localStorage.getItem('modeid');
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			question:editData.question||'',
            answer:editData.answer||'',
			mode: iddd,
		},
        enableReinitialize: true,

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			console.log(values);
			try {
				dispatch(updateFaqSlice({editId,values}) as any);
			} catch (error) {
			}finally {
				dispatch(getallFaqSlice(iddd)as any)
			}
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'Faq has been Added successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.question || 'New Faq'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className=' g-4'>
						<FormGroup id='question' label='Question' className='col-12'>
							<Input onChange={formik.handleChange} value={formik.values.question} />
						</FormGroup>
						<FormGroup id='answer' label='Answer' className='col-12'>
							<Input onChange={formik.handleChange} value={formik.values.answer} />
						</FormGroup>

						{/* <FormGroup>
							<Label htmlFor='payoutType'>Payout Type</Label>
							<ChecksGroup isInline>
								{Object.keys(PAYMENTS).map((i) => (
									<Checks
										type='radio'
										key={PAYMENTS[i].name}
										id={PAYMENTS[i].name}
										label={PAYMENTS[i].name}
										name='payoutType'
										value={PAYMENTS[i].name}
										onChange={formik.handleChange}
										checked={formik.values.payoutType}
									/>
								))}
							</ChecksGroup>
						</FormGroup> */}
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
EditFaq.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditFaq;
