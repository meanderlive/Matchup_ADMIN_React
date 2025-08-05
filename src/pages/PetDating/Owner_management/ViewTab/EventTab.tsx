import React, { FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
 
 
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

interface ICustomerEditModalProps {
	editData:any,
  id:any
}
const Customer: FC<ICustomerEditModalProps> = ({  editData,id }) => {

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
    const dummyMeetingEvents = [
        {
          userId:editData.name,
          partnerId: 'partner456',
          date: '2023-12-01T19:00:00',
          location: 'Coffee House',
          notes: 'First meeting with Sarah. Excited to chat!',
        },
        {
          userId:editData.name,
          partnerId: 'partner321',
          date: '2023-12-05T20:30:00',
          location: 'City Park',
          notes: 'Meeting John for a casual evening walk. Hope it goes well!',
        },
        {
          userId:editData.name,
          partnerId: 'partner789',
          date: '2023-12-10T18:00:00',
          location: 'Italian Restaurant',
          notes: 'Dinner date with Emily. Looking forward to good conversation and food!',
        },
        {
          userId:editData.name,
          partnerId: 'partner654',
          date: '2023-12-15T15:30:00',
          location: 'Art Gallery',
          notes: 'Visiting an art gallery with Michael. Should be a unique experience!',
        },
        {
          userId:editData.name,
          partnerId: 'partner567',
          date: '2023-02-20T21:00:00',
          location: 'Rooftop Bar',
          notes: 'Night out with Alex at a trendy rooftop bar. Exciting!',
        },
        // Add more dummy meeting events as needed
      ];
      
 
	return (
		 

				<div id='two-div'><Card className='col-lg-12'>
				<CardHeader>
					<CardLabel icon='Receipt'>
						<CardTitle tag='div' className='h5'>
							Event Details
						</CardTitle>
					</CardLabel>

 
				</CardHeader>
				<CardBody>
					 <div>
            { dummyMeetingEvents ? dummyMeetingEvents.map((item:any,index:any)=>(
                       <div key={item._id}>

              <Alert icon={activityTypeIcons.like} isLight color={activityTypeColor[item?.activityType]as any} className='flex-nowrap'>
              {item.userId} is meeting {item.partnerId} on  <span> </span><TimeAgo timestamp={item.date}/> at {item.location}. Notes: {item.notes}
							</Alert>  
                       </div>
            )):
<p className='text-danger'>No activity has been found for this user.</p>
            }
           
            </div>
				</CardBody>

			</Card></div>
 
	);
};

export default Customer;
