import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import ADD from './add';
import EditInterest from "./edit";
import { fetchsearchInterest, fetchsortInterest, getAllInterest } from '../../../redux/Slice/IntersetSlice';
import DeleteInterset from './DeleteInterset';

const MyInterest = () => {
	const { darkModeStatus } = useDarkMode();
    const[searchUser,setSearcUser]=useState<any>('')
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editModal, setEditModal] = useState<boolean>(false);
	const [editData,setEditData]=useState<any>('')
	const [editId,setEditId]=useState<any>('')
	const [sort,setSort] =useState<any>('asc')
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteId,setDeleteid]=useState<any>('')
	// const [viewUser,setViewUser]=useState<any>(false)
	// const [viewData,setViewdata]=useState<any>('')
 const paramsData = useParams()
 
	const modeid=localStorage.getItem('modeid')
	const dispatch = useDispatch()
	const state = useSelector((statee:any)=>statee.interest)
 
	const dataa:any = state.interset.data
   useEffect(()=>{
     dispatch(getAllInterest(modeid)as any)
   },[dispatch,modeid,currentPage])

    // const stateUser:any = useSelector((state:any)=>state.user)
    // console.log(stateUser)

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
 
	const filteredData = dataa ? dataa.filter((f: any) =>
		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())  
	) : [];

	const {items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const handleSearch =(e:any)=>{
		const inputValue = e.target.value
		setSearcUser(inputValue)
		if(inputValue.trim()==='')
		{
			dispatch(getAllInterest(modeid)as any)

		}else{

			dispatch(fetchsearchInterest(inputValue)as any)
		}
	}

	const handleSort =(sorrt:any)=>{
    
	 dispatch(fetchsortInterest(sorrt)as any)
	}

	const handleSortByname=()=>{

		const setName = sort === 'asc'?'desc':'asc'
		setSort(setName)
		 dispatch(fetchsortInterest(setName)as any)

	}
 
	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<span className='display-5 fw-bold my-3 mx-3 ' >Interest</span>

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
						placeholder='Search Interest...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					 
					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						New Interest
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
											 

												className='cursor-pointer text-decoration-underline'>
												Interest Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th>Icon</th>
											<th>Action</th>

											<td />
										</tr>
									</thead>
									<tbody>
										
											{
											dataa && dataPagination(items, currentPage, perPage).map((itemss:any,index:any)=>{
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
										
									 </div>
								 </div>
							 </td>
						
<td><Icon icon={itemss?.icon} size='lg' className='me-1' />{itemss?.icon}</td>
							
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
												 icon='Edit'
												 tag='a'
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
												//  tag='a'
												//  to={`../${demoPagesMenu.crm.subMenu.customerID.path}/`}
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
							{dataa&&<PaginationButtons
								data={dataa}
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>}
						</Card>
					</div>
				</div>
			
			 </Page> 
			 {editModalStatus && <ADD setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0'/>}
			{editId && <EditInterest setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId}id="0"/>}

			{deleteId && <DeleteInterset  setIsOpen={setDeleteModal}   isOpen={deleteModal} deleteId={deleteId} id="0"/>}
		</PageWrapper>
	);
};

export default MyInterest;