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

 
	return (
		 

				<div id='two-div'><Card className='col-lg-12'>
				<CardHeader>
					<CardLabel icon='Receipt'>
						<CardTitle tag='div' className='h5'>
							Activity
						</CardTitle>
					</CardLabel>


          <CardActions>
            <Button 
            icon='Favorite' color='primary' isLight 
            onClick={()=>flterActivity('like')}>
              Only Like
            </Button>
            <Button 
            icon='Star' color='warning' isLight 
            onClick={()=>flterActivity('superlike')}>
              Only Super Like
            </Button>
            <Button 
            icon='delete' color='danger' isLight 
            onClick={()=>flterActivity('reported')}>
              Only Reported
            </Button>
            <Button 
            icon='NotInterested' color='secondary' isLight 
            onClick={()=>flterActivity('swipe')}>
              Only Swipe
            </Button>
          </CardActions>
				</CardHeader>
				<CardBody>
					 <div>
            { activitiesToMap ? activitiesToMap.map((item:any,index:any)=>(
                       <div key={item._id}>

              <Alert icon={activityTypeIcons[item?.activityType]as any} isLight color={activityTypeColor[item?.activityType]as any} className='flex-nowrap'>
  
							        {item?.senderUserId?.name}  {item?.activityType}   {item?.receiverUserId?.name}   profile !          <span className='mx-auto'><TimeAgo timestamp={item?.created_at}/></span>
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
