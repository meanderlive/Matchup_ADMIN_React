import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
 
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import data from '../../../common/data/dummyCustomerData';
import Button from '../../../components/bootstrap/Button';
import latestSalesData from '../../../common/data/dummySalesData';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, {
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Edit_Plans from './Edit_Reviews';
import useDarkMode from '../../../hooks/useDarkMode';
import { getbyidusers } from '../../../redux/Slice/UserManagement_slice';
import CommonRightPanel from './ViewTab/ActivtyTab';
import Gallery from './ViewTab/GalleryTab';
import MainProfile from './ViewTab/MainProfile';
import QuizzesTab from './ViewTab/QuizzesTab';
import SubscriptionsTab from './ViewTab/SubscriptionTab';
import EventTab from './ViewTab/EventTab';
 import Engagement from "./ViewTab/EngagementTab";
 
const Customer = () => {





	

	const userDAta = useSelector((state: any) => state?.user?.user?.data)
	const { id } = useParams();
	const dispatch = useDispatch()
	const [toggleRightPanel, setToggleRightPanel] = useState(false);



	useEffect(() => {
		dispatch(getbyidusers(id) as any)
	}, [id, dispatch])
	const { darkModeStatus } = useDarkMode();


	const dataaaa = userDAta ? userDAta[0] : null;

	const lastIndex = dataaaa?.avatars?.length ? dataaaa.avatars.length - 1 : -1;






	const [editModal, setEditModal] = useState<boolean>(false);
	const [editData, setEditData] = useState<any>('')
	const navigate = useNavigate();
	const itemData = data.filter((item) => item.id.toString() === '1');
	const item = itemData[0];
	const [editId, setEditId] = useState<any>('')
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['3']);

	const { items, requestSort, getClassNamesFor } = useSortableData(latestSalesData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};
	const [timeAgo, setTimeAgo] = useState('');
	const calculateTimeAgo = useCallback(() => {

		console.log(dataaaa?.last_Loginout);
		
		const now: any = new Date();
		const loginDate: any = new Date(dataaaa?.last_Loginout);
		const timeDifference = now - loginDate;
		const seconds = Math.floor(timeDifference / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		let timeAgoString = '';

		if (days > 0) {
			timeAgoString = `${days} day${days === 1 ? '' : 's'} ago`;
		} else if (hours > 0) {
			timeAgoString = `${hours} hour${hours === 1 ? '' : 's'} ago`;
		} else if (minutes > 0) {
			timeAgoString = `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
		} else {
			timeAgoString = 'Just now';
		}

		setTimeAgo(timeAgoString);
	}, [dataaaa?.last_Loginout]);

	useEffect(() => {
		calculateTimeAgo();
	}, [dataaaa?.last_Loginout, calculateTimeAgo]);

	setTimeout(() => {
		calculateTimeAgo();
	}, 60000);

	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];





	const [activeTab, setActiveTab] = useState<string>('main_profile')
	return (

		<PageWrapper title={demoPagesMenu.crm.subMenu.customer.text}>
			<div style={{ marginTop: '20px' }}>


				<SubHeader>
					<SubHeaderLeft>
						<Button
							color='primary'
							isLink
							icon='ArrowBack'
							tag='a'
							onClick={() => navigate(-1)}>
							Back to List
						</Button>
						<SubheaderSeparator />
						<span className='text-muted fst-italic me-2'>Last login:</span>
						<span className='fw-bold'>{timeAgo}</span>
					</SubHeaderLeft>

				</SubHeader>
			</div>
			<Page>
				<div className='pt-3 pb-5 d-flex align-items-center'>

					<div className='col-10'>
						<span className='display-4 fw-bold me-3 ' >{dataaaa?.name || 'John'}</span>

						<span className='border border-success border-2 text-success fw-bold px-3  rounded '>
							User
						</span>
					</div>
				 
				</div>

				<div className='row'>
					<ul className="nav nav-tabs">
						<li className="nav-item ps-3" >

							<a className={`nav-link ${activeTab === 'main_profile' ? 'active' : " "}`} aria-current="page" href="#">
								<div role="button"
									tabIndex={0}
									onClick={() => setActiveTab('main_profile')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('main_profile');
										}
									}}>
									<p className='fw-bold '>

										Profile Details
									</p>
								</div>
							</a>
						</li>

						<li className="nav-item " >
							<a className={`nav-link ${activeTab === 'activity' ? 'active' : " "}`} aria-current="page" href="#">
								<div
									role="button"
									tabIndex={0}
									onClick={() => setActiveTab('activity')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('activity');
										}
									}}
								>

									<p className='fw-bold '>
										Activity
									</p>

								</div>
							</a>
						</li>
						<li className="nav-item" >
							<a className={`nav-link ${activeTab === 'engagement' ? 'active' : " "}`} aria-current="page" href="#">
								<div
									role="button"
									tabIndex={0}
									onClick={() => setActiveTab('engagement')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('engagement');
										}
									}}
								>
									<p className='fw-bold '>
									Engagement
									</p>
								</div>
							</a>
						</li>
						<li className="nav-item" >
							<a className={`nav-link ${activeTab === 'gallery' ? 'active' : " "}`} aria-current="page" href="#">
								<div
									role="button"
									tabIndex={0}
									onClick={() => setActiveTab('gallery')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('gallery');
										}
									}}
								>
									<p className='fw-bold '>
										Gallery
									</p>
								</div>
							</a>
						</li>
						<li className="nav-item" >
							<a className={`nav-link ${activeTab === 'Engagement' ? 'active' : " "}`} aria-current="page" href="#">
								<div
									role="button"
									tabIndex={0}
									onClick={() => setActiveTab('Engagement')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('Engagement');
										}
									}}
								>
									<p className='fw-bold '>
										Compatibility Quizzes
									</p>
								</div>
							</a>
						</li>

						<li className="nav-item" >
							<a className={`nav-link ${activeTab === 'subscription ' ? 'active' : " "}`} aria-current="page" href="#">
								<div
									role="button"
									tabIndex={0}
									onClick={() => setActiveTab('subscription')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('subscription');
										}
									}}
								>
									<p className='fw-bold '>
										Subscription
									</p>
								</div>
							</a>
						</li>
						<li className="nav-item" >
							<a className={`nav-link ${activeTab === 'event' ? 'active' : " "}`} aria-current="page" href="#">
								<div
									role="button"
									tabIndex={0}
									onClick={() => setActiveTab('event')}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											setActiveTab('event');
										}
									}}
								>
									<p className='fw-bold '>
										Event
									</p>
								</div>
							</a>
						</li>

					</ul>

				</div>







				
				{
					activeTab === 'engagement' &&

					<Engagement  editData={dataaaa} id={id} />
				}
				{
					activeTab === 'main_profile' &&

					<MainProfile dataaaa={dataaaa} setEditData={setEditData} setEditModal={setEditModal} setEditId={setEditId} />
				}

				{
					activeTab === 'activity' &&

					<CommonRightPanel editData={dataaaa} id={id} />
				}
				{
					activeTab === 'gallery' &&


					<Gallery dataaaa={dataaaa} />

				}
				{
					activeTab === 'Engagement' &&


					<QuizzesTab dataaaa={dataaaa} />

				}{
					activeTab === 'subscription' &&


					<SubscriptionsTab dataaaa={dataaaa} />

				}
{
					activeTab === 'event' &&


					<EventTab editData={dataaaa} id={id}/>

				}

			</Page>
			{editId && <Edit_Plans setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId} id="0" />}

		</PageWrapper>

	);
};

export default Customer;
