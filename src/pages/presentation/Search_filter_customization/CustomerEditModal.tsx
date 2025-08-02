import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
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

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const CustomerEditModal: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const formik = useFormik({
		initialValues: {
			name: item?.name || '',
			email: item?.email || '',
			 
				Description: item?.	Description || 'Author',
			streetAddress: item?.streetAddress || '',
			streetAddress2: item?.streetAddress2 || '',
			city: item?.city || '',
			stateFull: item?.stateFull || '',
			zip: item?.zip || '',
			streetAddressDelivery: item?.streetAddressDelivery || '',
			streetAddress2Delivery: item?.streetAddress2Delivery || '',
			cityDelivery: item?.cityDelivery || '',
			stateFullDelivery: item?.stateFullDelivery || '',
			zipDelivery: item?.zipDelivery || '',
			payoutType: item?.payout || '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Customer has been updated successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'New Filter'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Name' className='col-md-12'>
							<Input onChange={formik.handleChange} value={formik.values.name} />
						</FormGroup>
					 
				 
						<FormGroup id='Description' label='Description' className='col-md-12'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.Description}
								disabled
							/>
						</FormGroup>
						 
						 
						 
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
CustomerEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default CustomerEditModal;
