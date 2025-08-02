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
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../components/bootstrap/Card';
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
import EditSubscription from "./edit";
import { fetchsearchSubscription, fetchsortSubscription, getAllSubscription } from '../../../redux/Slice/SubscriptionSlice';
import DeleteSubscription from './DeleteSubscription';
import CommonDashboardMarketingTeam from '../dashboard/common/CommonDashboardMarketingTeam';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import CommonHowToUse from '../../../common/other/CommonHowToUse';
import QuickStartGuide from '../QuickStartGuide/Preview'
import TermAndCondition from '../TermAndCondition/TandCEditor'
import PrivacyPolicys from '../PrivacyPolicys/Preview'
import LegalDocument from '../Legal Document Archive/Preview'

import CommonStoryBtn from '../../../common/other/CommonStoryBtn';
import { deletetermsAndConditionsSlice, getalltermsAndConditionsSlice } from '../../../redux/Slice/TermAndConditionSlice';
import { getallPrivecyPolicysSlice } from '../../../redux/Slice/PrivecyPolicysSlice';

const MySubscription = () => {
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
	 
	const state = useSelector((statee:any)=>statee.TermsAndConditions?.termsAndConditions)
	const statePrivecyPolicys = useSelector((statee:any)=>statee.PrivecyPolicys?.PrivecyPolicys)

	const ApiDAta= state[0]
	const Policys= statePrivecyPolicys[0]
	console.log(Policys);

 
 
	const dataa:any = { }
   useEffect(()=>{
     dispatch(getalltermsAndConditionsSlice(modeid)as any)
	 
     dispatch(getallPrivecyPolicysSlice(modeid)as any)
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
 
	const filteredData = data ? data.filter((f: any) =>
		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())  
	) : [];

	const {items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	
 
 
 
	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<span className='display-5 fw-bold py-5 mx-3 ' >Community Guidelines Management</span>

			 
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
					<div>
										<Accordion id='accSample-2' isFlush shadow='none'>
											<AccordionItem
												id='accor1-2'
												title='Term And Condition'
												icon='List'>
												 
												 <TermAndCondition ApiDAta={ApiDAta}/>




											</AccordionItem>
											<AccordionItem
												id='accor2-2'
												title='Privacy Policys'
												icon='DocumentScanner'>
												 <PrivacyPolicys ApiDAta={Policys}/>
											</AccordionItem>
											<AccordionItem
												id='accor3-2'
												title='Quick Start Guide'
												icon='Opacity'>
												 <QuickStartGuide/>
											 
											</AccordionItem>
											<AccordionItem
												id='accor4-2'
												title='Legal Document Archive(Recorders of other documents)'
												icon='ViewCompact'>
												<LegalDocument/>
												
											</AccordionItem>
										</Accordion>
									</div> 
					</div>
				</div>
			
			 </Page> 
			 {editModalStatus && <ADD setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0'/>}
			{editId && <EditSubscription setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId}id="0"/>}

			{deleteId && <DeleteSubscription  setIsOpen={setDeleteModal}   isOpen={deleteModal} deleteId={deleteId} id="0"/>}
		</PageWrapper>
	);
};

export default MySubscription;