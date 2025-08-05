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
    const dummyDogMeetingEvents = [
      {
        userId: 'Buddy', // Replace 'Buddy' with your dummy dog name
        partnerId: 'Max', // Replace 'Max' with your dummy dog name
        date: '2023-12-01T14:00:00',
        location: 'Dog Park',
        notes: 'First playdate with Max. Excited to see how they get along!',
      },
      {
        userId: 'Buddy', // Replace 'Buddy' with your dummy dog name
        partnerId: 'Bella', // Replace 'Bella' with your dummy dog name
        date: '2023-12-05T16:30:00',
        location: 'Beach',
        notes: 'Meeting Bella for a fun day at the beach. Hoping for some good fetch!',
      },
      {
        userId: 'Buddy', // Replace 'Buddy' with your dummy dog name
        partnerId: 'Rocky', // Replace 'Rocky' with your dummy dog name
        date: '2023-12-10T12:00:00',
        location: 'Pet-friendly Cafe',
        notes: 'Lunch date with Rocky. Looking forward to treats and tail wags!',
      },
      {
        userId: 'Buddy', // Replace 'Buddy' with your dummy dog name
        partnerId: 'Daisy', // Replace 'Daisy' with your dummy dog name
        date: '2023-12-15T09:45:00',
        location: 'Doggy Daycare',
        notes: 'Spending the day at Doggy Daycare with Daisy. Playtime guaranteed!',
      },
      {
        userId: 'Buddy', // Replace 'Buddy' with your dummy dog name
        partnerId: 'Rex', // Replace 'Rex' with your dummy dog name
        date: '2023-02-20T18:00:00',
        location: 'Pet Expo',
        notes: 'Exploring the Pet Expo with Rex. Lots of treats and toys to discover!',
      },
      // Add more dummy dog meeting events as needed
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
				<CardBody >
					 <div className='row'>
            { dummyDogMeetingEvents ? dummyDogMeetingEvents.map((item:any,index:any)=>(
                       <div key={item._id} className='col-12'>

              <Alert icon={activityTypeIcons.like} isLight color={activityTypeColor[item?.activityType]as any} className='flex-nowrap'>
              {item.userId} is meeting {item.partnerId} on  <span> </span><TimeAgo timestamp={item.date}/> at {item.location}. <br/>Notes: {item.notes}
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
