import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import dayjs from 'dayjs';
import { useTour } from '@reactour/tour';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Button from '../../../components/bootstrap/Button';
import Popovers from '../../../components/bootstrap/Popovers';
import Icon from '../../../components/icon/Icon';
import CommonSalePerformance from '../../_common/CRMDashboard/CommonSalePerformance';
import CommonTopSales from '../../_common/CRMDashboard/CommonTopSales';
import CommonLatestTransActions from '../../_common/CRMDashboard/CommonLatestTransActions';
import CommonIncome from '../../_common/CRMDashboard/CommonIncome';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../components/bootstrap/Card';
import useDarkMode from '../../../hooks/useDarkMode';

import main_banner from '../../../assets/banner/bg.jpg'
import main_banner2 from '../../../assets/banner/01.png'
import login from '../../../assets/banner/login.jpg'
import signup from '../../../assets/banner/reg.146f635242902986a4a5.jpg'
import logo from '../../../assets/banner/logomarier.782c85e1633a1103997b.png'
import Chat from '../../../assets/banner/chatbg2.6d1cbbdc4e10c5c323b6.jpg'
import Download from '../../../assets/banner/download_img.png'






import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';

const CrmDashboard = () => {


    const { darkModeStatus } = useDarkMode();
	/**
	 * For Tour
	 */
	const { currentStep, setCurrentStep } = useTour();
	useEffect(() => {
		if (currentStep === 3) setCurrentStep(4);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentStep]);

	const [state, setState] = useState({
		selection: {
			startDate: dayjs().startOf('week').add(-1, 'week').toDate(),
			endDate: dayjs().endOf('week').toDate(),
			key: 'selection',
		},
		selection2: {
			startDate: dayjs().startOf('week').add(-1, 'week').add(2, 'day').toDate(),
			endDate: dayjs().endOf('week').add(-4, 'day').toDate(),
			key: 'selection2',
		},
		selection3: {
			startDate: dayjs().startOf('week').add(3, 'week').add(2, 'day').toDate(),
			endDate: dayjs().startOf('week').add(3, 'week').add(2, 'day').toDate(),
			key: 'selection3',
		},
	});



    const mediaBanner = [
        {
            name: 'Main Page Back Banner',
            img: main_banner
        },
        {
            name: 'Main Page Back Sec Banner',
            img: main_banner2
        },
        {
            name: 'Login Page Back Banner',
            img: login
        },
        {
            name: 'Signup Page Back Banner',
            img: signup 
        },
        {
            name: 'Home Page Back Banner',
            img: main_banner
        },
        {
            name: 'Header Logo',
            img: logo
        },
        {
            name: 'Chat Page Back Banner',
            img: Chat
        },
        {
            name: 'Download App Section Banner',
            img: Download
        }
    ];
    

	const datePicker = (
		<DateRangePicker
			onChange={(item) => setState({ ...state, ...item })}
			// showSelectionPreview
			moveRangeOnFirstSelection={false}
			retainEndDateOnFirstSelection={false}
			months={2}
			ranges={[state.selection, state.selection2, state.selection3]}
			direction='horizontal'
			rangeColors={[
				String(process.env.REACT_APP_PRIMARY_COLOR),
				String(process.env.REACT_APP_SECONDARY_COLOR),
				String(process.env.REACT_APP_SUCCESS_COLOR),
			]}
		/>
	);

	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.dashboard.text}>
			 

			<Page>
            <div className='row'>
					<div className='col-12'>
						<div className='display-5 fw-bold py-3'>Media Library Management</div>
					</div>
					<div className='col-md-12'>



                    <div >
										<Accordion id='accSample-2' isFlush shadow='none' >



                                            {mediaBanner && mediaBanner.map((i,index)=>(
 

                                                <AccordionItem
                                                key={i.name}
                                                
												id={`accor${index}-2`}
												title={i.name}
                                                
												icon='Photo'>
												 
												 <Card >
							 <CardHeader>
                                <CardActions>
                                <Button
									color='info'
									size='lg'
									isLight
									className='w-100 h-100'
									icon='AddCircle'>
									Update Banner
								</Button>
                                </CardActions>
                             </CardHeader>
							<CardBody>
                                <div style={{width:'100%'}}>

								<img src={i.img} width='100%' alt="main_banner"   />
                                </div>
							</CardBody>
						</Card>




											</AccordionItem>
                               
                                        ))}
											 
											 
										</Accordion>
									</div> 



						
					</div>
					 
					 
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CrmDashboard;
