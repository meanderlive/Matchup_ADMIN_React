import React, { FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
 
 
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
 
import Icon from '../../../../components/icon/Icon';
 
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Checks from '../../../../components/bootstrap/forms/Checks';
import TimeAgo from '../TimeAgo';
import Popovers from '../../../../components/bootstrap/Popovers';
import { getBySenderUserIds } from '../../../../redux/Slice/ActivitySlice';
import Alert from '../../../../components/bootstrap/Alert';
import Button from '../../../../components/bootstrap/Button';
import CommonSalePerformance from '../../../_common/CRMDashboard/CommonSalePerformance';
import useDarkMode from '../../../../hooks/useDarkMode';
import { priceFormat } from '../../../../helpers/helpers';




interface ICustomerEditModalProps {
	editData:any,
  id:any
}
const Customer: FC<ICustomerEditModalProps> = ({  editData,id }) => {


    const { darkModeStatus } = useDarkMode();
    const activityTypeIcons:any = {
      like: 'Favorite',
      
      superlike:'Star',
      // Change 'Heart' to the actual icon name for 'Like'
        swipe: 'NotInterested', // Change 'Message' to the actual icon name for 'Message'
        reported: 'delete', // Change 'User' to the actual icon name for 'View Profile'
        // Add more mappings as needed
      };
      const activityTypeColor:any = {
        like: 'info',
        
        superlike:'warning',
        // Change 'Heart' to the actual icon name for 'Like'
          swipe: 'secondary', 
          // Change 'Message' to the actual icon name for 'Message'
          reported: 'danger', // Change 'User' to the actual icon name for 'View Profile'
          // Add more mappings as needed
        };

        const [filterArrayActivity, setFilterArrayActivity] = useState<any>([]);

        const ActivityDAta = useSelector((state: any) => state?.activity?.Activity?.data)
        // const reversedActivity = [...ActivityDAta].reverse();
        // console.log(reversedActivity);
      
      const modeid=localStorage.getItem('modeid')
	const dispatch = useDispatch();


  const flterActivity = (key: string) => {
    if (key === 'like') {
      const likeLogs = ActivityDAta?.filter((log: any) => log.activityType === "like");
      setFilterArrayActivity(likeLogs);
    }
    if (key === 'superlike') {
      const likeLogs = ActivityDAta?.filter((log: any) => log.activityType === "superlike");
      setFilterArrayActivity(likeLogs);
      
    }
    if (key === 'reported') {
      const likeLogs = ActivityDAta?.filter((log: any) => log.activityType === "reported");
      setFilterArrayActivity(likeLogs);
      
    }
    if (key === 'swipe') {
      const likeLogs = ActivityDAta?.filter((log: any) => log.activityType === "swipe");
      setFilterArrayActivity(likeLogs);
      
    }
    // Add similar logic for other cases
  };
    


    useEffect(()=>{
      const data = {modeid,id}
      dispatch(getBySenderUserIds(data)as any)
    },[ dispatch, id, modeid])
	 
    const activitiesToMap = filterArrayActivity.length > 0 ? filterArrayActivity : ActivityDAta;

 
	return (
		 

				<div id='two-div'><Card className='col-lg-12'>
			 
				<CardBody>

                <Card>
							<CardHeader>
								<CardLabel icon='StackedLineChart'>
									<CardTitle tag='div' className='h5'>
										Statics
									</CardTitle>
								</CardLabel>
								<CardActions>
									Only in <strong>{dayjs().format('MMM')}</strong>.
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-warning rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='DoneAll' size='3x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>135</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Sales
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-info rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Savings' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													{priceFormat(1260)}
												</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Earning
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-primary rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Star' size='3x' color='primary' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>4.96</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Rating
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-success rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Timer' size='3x' color='success' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>3 years</div>
												<div className='text-muted mt-n2'>Membership</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
                <CommonSalePerformance />

				</CardBody>

			</Card></div>
 
	);
};

export default Customer;
