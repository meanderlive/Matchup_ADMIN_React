import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

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
import ActiveStatus from './ActiveStatus';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import AddBlogArticlesPublishing from './AddBlogArticlesPublishing';
import { createblogSlice, deleteblogSlice, getallblogSlice } from '../../../redux/Slice/BlogArticlesPublishingSlice';
import DeleteBlogArticlesPublishing from './DeleteBlogArticlesPublishing';
import EditBlogArticlesPublishing from './EditBlogArticlesPublishing';
import { fetchUser } from '../../../redux/Slice/UserManagement_slice';


 

// You can use dummyBlogs array in your dating website to display blog content.


const BlogArticlesPublishing = () => {
	const modeid = localStorage.getItem('modeid')

	const { darkModeStatus } = useDarkMode();
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [addModal, setAddModal] = useState<any>(false)
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteid] = useState<any>('')
	const [editData, setEditData] = useState<any>('')
	const [editModal, setEditModal] = useState<boolean>(false);
	const [editId, setEditId] = useState<any>('')
	const stateBlogArticlesPublishing: any = useSelector((state: any) => state.BlogArticlesPublishing)
	console.log(stateBlogArticlesPublishing?.blog)
	const dataBlogArticlesPublishing = stateBlogArticlesPublishing.blog
	const dispatch = useDispatch()
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
	const handleStatus = async (idedi: any, value: any) => {
	 
		
		const BaseURl = 'https://datingapi.meander.software/';
		const options = {
		  method:'PUT',
		  headers: {
			'content-type':'application/json',
			// 'x-access-token':
			//   token,
		  },
		  body: JSON.stringify({status:value}),
		};
		try {
		  const response:any = await fetch(
			`${BaseURl}blog/update/${idedi}`,
			options
		  );
		  if (response) {
			
			  await dispatch(getallblogSlice(modeid) as any);
		  }
	
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	}
	const filteredData = Array.isArray(dataBlogArticlesPublishing)
  ? dataBlogArticlesPublishing.filter((f: any) =>
      f.title.toLowerCase().includes(formik.values.searchInput.toLowerCase())
    )
  : [];


	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const refresh = useCallback(()=>{
		dispatch(getallblogSlice(modeid) as any)
	
	},[dispatch, modeid])

	useEffect(() => {
		refresh()
	}, [refresh])




 



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
						placeholder='Search Blogs...'
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
						onClick={() => {setAddModal(true)
						setEditData({})
						setEditId('')
						}}>
						Add New Blog
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
												onClick={() => requestSort('title')}
												className='cursor-pointer text-decoration-underline ps-5 	'>
												Title{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('title')}
													icon='FilterList'
												/>
											</th>

											<th >Description</th>
											<th >Published Date</th>
											<th >Modified Date</th>
											<th >Status</th>
											<th >Action</th>





											<td />
										</tr>
									</thead>
									<tbody>



										{dataPagination(items, currentPage, perPage).map((itemss: any, index: any) => {
											return <tr key={itemss?._id}>

												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<div
																className='ratio ratio-1x1 me-3'
																style={{ width: 48 }}>
																<div
																	className={`bg-l${darkModeStatus
																		? 'o25'
																		: '25'
																		}-${getColorNameWithIndex(
																			index,
																		)} text-${getColorNameWithIndex(
																			index,
																		)} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(itemss?.title)}
																	</span>
																</div>
															</div>
														</div>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{itemss?.title}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>Blog</small>
															</div>
														</div>
													</div>
												</td>
												<td>{itemss?.description}</td>
												<td>{itemss?.publishedDate.split("T")[0]}</td>
												<td>{itemss?.modifiedDate.split("T")[0]}</td>



												<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	isLink
																// color={item.status.color}
																// icon='Circle'
																// className="bn6"
																>

																	{itemss?.status === true ? (
																		<span className='badge bg-success'>
																			Published
																		</span>
																	) : (
																		<span className='badge bg-secondary'>
																			Unpublished
																		</span>
																	)}
																</Button>
															</DropdownToggle>
															<DropdownMenu>
																{Object.keys(ActiveStatus).map(
																	(key) => (
																		<DropdownItem key={key}>
																			<div
																				onClick={() => handleStatus(itemss._id, ActiveStatus[key].value)}
																				onKeyDown={(e) => {
																					if (e.key === 'Enter' || e.key === 'Space') {
																						handleStatus(itemss._id, ActiveStatus[key].value);
																					}
																				}}
																				role="button"
																				tabIndex={0}
																			>
																				{ActiveStatus[key].name}
																			</div>
																		</DropdownItem>

																	),
																)}
															</DropdownMenu>
														</Dropdown>
													</td>

												 
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
															{/* <DropdownItem>
																<Button
																	icon='Visibility'
																	tag='a'
																// to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
																>
																	View
																</Button>
															</DropdownItem> */}
															<DropdownItem>
																<Button
																	icon='Edit'
																	tag='a'
																	// to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
																	onClick={() => {
																		setEditData(itemss)
																		setAddModal(true)
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
																	onClick={() => {
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
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
	 
			<AddBlogArticlesPublishing setIsOpen={setAddModal} isOpen={addModal} editId={editId} editData={editData} id='0' />
			<DeleteBlogArticlesPublishing setIsOpen={setDeleteModal} isOpen={deleteModal} deleteId={deleteId} id='0' />
			<EditBlogArticlesPublishing setIsOpen={setEditModal} isOpen={editModal} editId={editId} editData={editData} id='0' />
		</PageWrapper>
	);
};

export default BlogArticlesPublishing;
