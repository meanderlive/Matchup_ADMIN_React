import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
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
// import add_user_management from './ADD'

import { fetchUser, fetchsearchUser } from '../../../redux/Slice/UserManagement_slice';
import { fetchModes } from '../../../redux/Slice/Modes_Slice';
import showNotification from '../../../components/extras/showNotification';

const Modes = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [modeids, setModeids] = useState<any>(false);

	const dispatch = useDispatch()
   useEffect(()=>{
   dispatch(fetchModes()as any)
   },[dispatch])
 
    const stateUser:any = useSelector((state:any)=>state.mode)
    const modesData= stateUser?.modes?.data

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

	
 const [moodeId,setMoodeId]=useState(localStorage.getItem('modeid') || '')
    const handlemode =async (modeid: any) => {
		setMoodeId(modeid)
		
	};
	useEffect(() => {
		const storedModeId = localStorage.getItem('modeid');
		
		if (moodeId === '') {
		  const defaultModeId = modesData ? modesData[1]._id : '659436bcacc570d6b14edf41';
		  localStorage.setItem('modeid', defaultModeId);
		  
		  // Dispatch your actions if needed
		  // dispatch(fetchUser({ moodeId: defaultModeId, currentPage }) as any);
		  // dispatch(fetchModes() as any);
		  
		  // Trigger a full page refresh
		  window.location.reload();
		} else if (moodeId !== storedModeId) {
		  localStorage.setItem('modeid', moodeId);
	  
		  // Dispatch your actions if needed
		  // dispatch(fetchModes() as any);
		  // dispatch(fetchUser({ moodeId, currentPage }) as any);
		  
		  // Trigger a full page refresh
		  window.location.reload();
		}
	  }, [moodeId, modesData]);
	  

 
 
	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<SubHeader className='mt-3'>
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
						placeholder='Search User...'
						
					/>
				</SubHeaderLeft>
				
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
												className='cursor-pointer text-decoration-underline'>
												Mode Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th>Note</th>
											<th>Active</th>
											
											
											<td />
										</tr>
									</thead>
									<tbody>
										 

										{
											modesData?.map((itemss:any,index:any)=>{
                             return 	<tr key={itemss?._id}>
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
												 }-${getColorNameWithIndex(index,
												 )} text-${getColorNameWithIndex(index,
												 )} rounded-2 d-flex align-items-center justify-content-center`}>
												 <span className='fw-bold'>
													 {getFirstLetter(itemss.name)}
												 </span>
											 </div>
										 </div>
									 </div>
									 <div className='flex-grow-1'>
										 <div className='fs-6 fw-bold'>
											 {itemss?.name}
										 </div>
										 <div className='text-muted'>
											 <Icon icon='Label' />{' '}
											 <small>{itemss?.is_activated}</small>
										 </div>
									 </div>
								 </div>
							 </td>
							 
							 <td> {itemss?.description}</td>
							 <td>
                             {itemss?._id  }
								
							 </td>
							 <td> <input
																style={{ color: 'green' }}
																type='radio'
																id='html'
																name='fav_language'
																onChange={() => {
																	setModeids(true);
																	handlemode(itemss?._id);
																	showNotification(
																		<span className='d-flex align-items-center'>
																			<Icon
																				icon='Info'
																				size='lg'
																				className='me-1'
																			/>
																			<span> {itemss?.name} Mode Active</span>
																		</span>,
																		`The ${itemss?.name}  details have been successfully updated.`,
																	);
																}}
																value='HTML'
																checked={itemss?._id === localStorage.getItem('modeid')}
															/></td>

							 {/* <td>
								 <Icon
									 size='lg'
									 icon={`custom ${i.payout.toLowerCase()}`}
								 />{' '}
								 {i.payout}
							 </td> */}
							 
						 </tr>
											})
										}
									
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={modesData || []}
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
			{/* <CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' /> */}
			{/* <add_user_management setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />
			 */}
			 {/* <Add setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0'/>
			 <Edit_User setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId}id="0"/>
			 <OrderDeleteModal  setIsOpen={setDeleteModal}   isOpen={deleteModal} deleteId={deleteId} id="0"/> */}
		</PageWrapper>
	);
};

export default Modes;
