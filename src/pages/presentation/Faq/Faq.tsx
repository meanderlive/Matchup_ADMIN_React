import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch,useSelector } from 'react-redux';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import data from '../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../components/bootstrap/Popovers';
// import CustomerEditModal from './CustomerEditModal';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import AddFaq from './AddFaq';
import { deleteFaqSlice, getallFaqSlice } from '../../../redux/Slice/FaqSlice';
import DeleteFaq from './DeleteFaq';
import EditFaq from './EditFaq';


const Faq = () => {
	const iddd=localStorage.getItem('modeid')

	const { darkModeStatus } = useDarkMode();
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
   
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
   const [addModal,setAddModal]=useState<any>(false)
   const [deleteModal, setDeleteModal] = useState<boolean>(false);
   const [deleteId,setDeleteid]=useState<any>('')
   const [editData,setEditData]=useState<any>('')
   const [editModal, setEditModal] = useState<boolean>(false);
   const [editId,setEditId]=useState<any>('')

   const dispatch=useDispatch()
	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = data.filter(
		(f) =>
			// Name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
			// Price
			(formik.values.minPrice === '' || f.balance > Number(formik.values.minPrice)) &&
			(formik.values.maxPrice === '' || f.balance < Number(formik.values.maxPrice)) &&
			// Payment Type
			formik.values.payment.includes(f.payout),
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const stateFaq:any = useSelector((state:any)=>state.faq)
    console.log(stateFaq.Faq)
  const dataFaq=stateFaq.Faq
	useEffect(()=>{
		dispatch(getallFaqSlice(iddd)as any)
	},[dispatch,iddd])



 


	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<SubHeader className='mt-5'>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search Faq...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'
								aria-label='Filter'>
								{data.length !== filteredData.length && (
									<Popovers desc='Filtering applied' trigger='hover'>
										<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
											<span className='visually-hidden'>
												there is filtering
											</span>
										</span>
									</Popovers>
								)}
							</Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg'>
							<div className='container py-2'>
								<div className='row g-3'>
									<FormGroup label='Balance' className='col-12'>
										<InputGroup>
											<Input
												id='minPrice'
												ariaLabel='Minimum price'
												placeholder='Min.'
												onChange={formik.handleChange}
												value={formik.values.minPrice}
											/>
											<InputGroupText>to</InputGroupText>
											<Input
												id='maxPrice'
												ariaLabel='Maximum price'
												placeholder='Max.'
												onChange={formik.handleChange}
												value={formik.values.maxPrice}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup label='Payments' className='col-12'>
										<ChecksGroup>
											{Object.keys(PAYMENTS).map((payment) => (
												<Checks
													key={PAYMENTS[payment].name}
													id={PAYMENTS[payment].name}
													label={PAYMENTS[payment].name}
													name='payment'
													value={PAYMENTS[payment].name}
													onChange={formik.handleChange}
													checked={formik.values.payment.includes(
														PAYMENTS[payment].name,
													)}
												/>
											))}
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setAddModal(true)}>
						Add new question
					</Button>
					 
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline col-4'>
												Question{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											
											<th className='col-6'>Answer</th>
											
										
											<td />
										</tr>
									</thead>
									<tbody>
										{
                                        /* {dataPagination(items, currentPage, perPage).map((i) => (
											<tr key={i.id}>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<div
																className='ratio ratio-1x1 me-3'
																style={{ width: 48 }}>
																<div
																	className={`bg-l${
																		darkModeStatus
																			? 'o25'
																			: '25'
																	}-${getColorNameWithIndex(
																		i.id,
																	)} text-${getColorNameWithIndex(
																		i.id,
																	)} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(i.name)}
																	</span>
																</div>
															</div>
														</div>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.name}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i.type}</small>
															</div>
														</div>
													</div>
												</td>
												<td>
													<Button
														isLink
														color='light'
														icon='Email'
														className='text-lowercase'
														tag='a'
														href={`mailto:${i.email}`}>
														{i.email}
													</Button>
												</td>
												<td>
													<div>{i.membershipDate.format('ll')}</div>
													<div>
														<small className='text-muted'>
															{i.membershipDate.fromNow()}
														</small>
													</div>
												</td>
												<td>{priceFormat(i.balance)}</td>
												<td>
													<Icon
														size='lg'
														icon={`custom ${i.payout.toLowerCase()}`}
													/>{' '}
													{i.payout}
												</td>
												<td>
													<Dropdown>
														<DropdownToggle hasIcon={false}>
															<Button
																icon='MoreHoriz'
																color='dark'
																isLight
																shadow='sm'
																aria-label='More actions'
															/>
														</DropdownToggle>
														<DropdownMenu isAlignmentEnd>
															<DropdownItem>
																<Button
																	icon='Visibility'
																	tag='a'
																	to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}>
																	View
																</Button>
															</DropdownItem>
														</DropdownMenu>
													</Dropdown>
												</td>
											</tr>
										))} */}

{
											dataFaq?.map((itemss:any,index:any)=>{
                             return 	<tr key={itemss?._id}>
						
							
							 
							 <td>{itemss?.question}</td>
							 <td>{itemss?.answer}</td>


							 {/* <td>
								 <Icon
									 size='lg'
									 icon={`custom ${i.payout.toLowerCase()}`}
								 />{' '}
								 {i.payout}
							 </td> */}
							 <td className='text-center'>
								 <Dropdown>
									 <DropdownToggle hasIcon={false}>
										 <Button
											 icon='MoreHoriz'
											 color='dark'
											 isLight
											 shadow='sm'
											 aria-label='More actions'
										 />
									 </DropdownToggle>
									 <DropdownMenu isAlignmentEnd>
										 <DropdownItem>
											 <Button
												 icon='Visibility'
												 tag='a'
												 // to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
												 >
												 View
											 </Button>
										 </DropdownItem>
										 <DropdownItem>
											 <Button
												 icon='Edit'
												 tag='a'
												 // to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
												 onClick={() =>{
													setEditData(itemss)
													setEditModal(true)
													setEditId(itemss?._id)
												 } 
												}
												 >
												 Edit
											 </Button>
										 </DropdownItem>
										 <DropdownItem>
											 <Button
												 icon='Delete'
												 tag='a'
												 // to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
												 onClick={() =>{
													setDeleteModal(true)
													setDeleteid(itemss?._id)
												 } 
												      }
												 >
												 Delete
											 </Button>
										 </DropdownItem>
									 </DropdownMenu>
								 </Dropdown>
							 </td>
						 </tr>
											})
										}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='FAQ'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			{/* <SubscripitionDelete setIsOpen={setDeleteModal} isOpen={deleteModal} deleteId={deleteId} id='0'/>
			<SubscriptionEdit setIsOpen={setEditModal} isOpen={editModal} editId={editId} editData={editData} id='0'/> */}
			<AddFaq setIsOpen={setAddModal} isOpen={addModal} id='0'/>
            <DeleteFaq setIsOpen={setDeleteModal} isOpen={deleteModal} deleteId={deleteId} id='0'/>
            <EditFaq setIsOpen={setEditModal} isOpen={editModal} editId={editId} editData={editData} id='0'/>
		</PageWrapper>
	);
};

export default Faq;
