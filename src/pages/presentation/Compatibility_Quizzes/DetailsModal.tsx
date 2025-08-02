import React from "react";
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import OffCanvas, {
  OffCanvasBody,
  OffCanvasHeader,
  OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks from '../../../components/bootstrap/forms/Checks';
import Popovers from '../../../components/bootstrap/Popovers';
import TimeAgo from "./TimeAgo";

interface AddressComponentProps {
  htmlContent: string;
}

const AddressComponent: React.FC<AddressComponentProps> = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

interface DetailsModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;

}

const dummyActivities = [
  { id: 1, type: 'Like', date: '2024-01-01', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 2, type: 'Message', date: '2024-01-02', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 3, type: 'View_Profile', date: '2024-01-03', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 4, type: 'Like', date: '2024-01-04', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 5, type: 'Message', date: '2024-01-05', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 6, type: 'View_Profile', date: '2024-01-06', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 7, type: 'Like', date: '2024-01-07', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 8, type: 'Message', date: '2024-01-08', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 9, type: 'View_Profile', date: '2024-01-09', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 10, type: 'Like', date: '2024-01-10', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 1, type: 'Like', date: '2024-01-01', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 2, type: 'Message', date: '2024-01-02', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 3, type: 'View_Profile', date: '2024-01-03', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 4, type: 'Like', date: '2024-01-04', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 5, type: 'Message', date: '2024-01-05', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 6, type: 'View_Profile', date: '2024-01-06', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 7, type: 'Like', date: '2024-01-07', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 8, type: 'Message', date: '2024-01-08', sender: 'jane_smith', receiver: 'john_doe' },
  { id: 9, type: 'View_Profile', date: '2024-01-09', sender: 'john_doe', receiver: 'jane_smith' },
  { id: 10, type: 'Like', date: '2024-01-10', sender: 'jane_smith', receiver: 'john_doe' }
  // Add more dummy activities as needed
];
const activityTypeIcons:any = {
  like: 'Favorite', // Change 'Heart' to the actual icon name for 'Like'
  swipe: 'NotInterested', // Change 'Message' to the actual icon name for 'Message'
  View_Profile: 'GroupAdd', // Change 'User' to the actual icon name for 'View Profile'
  // Add more mappings as needed
};
const DetailsModal: React.FC<any> = ({ setOpen, isOpen,editData }) => {


  const activityLogs= [
    {
        user: "6594fab9feaba5b4e633c570",
        action: "like",
        targetUser: "6594fd82feaba5b4e633cd64",
        timestamp: "2024-01-04T10:34:42.765Z",
        _id: "659689c26e01622c387e5214"
    },
    {
        user: "6594fab9feaba5b4e633c570",
        action: "swipe",
        targetUser: "6594fe24feaba5b4e633cf50",
        timestamp: "2024-01-04T10:37:48.592Z",
        _id: "65968a7c6e01622c387e54e4"
    },
    {
      user: "6594fab9feaba5b4e633c570",
      action: "like",
      targetUser: "6594fd82feaba5b4e633cd64",
      timestamp: "2024-01-04T10:34:42.765Z",
      _id: "659689c26e01622c387e5214"
  },
  {
      user: "6594fab9feaba5b4e633c570",
      action: "swipe",
      targetUser: "6594fe24feaba5b4e633cf50",
      timestamp: "2024-01-04T10:37:48.592Z",
      _id: "65968a7c6e01622c387e54e4"
  }
  ]
  
  
  const likeLogs = editData?.activityLogs?.filter((log:any) => log.action === "like");
  
  const swipeLogs = editData?.activityLogs?.filter((log:any) => log.action === "swipe");
  
console.log(likeLogs);
console.log(swipeLogs);



  return (
    <div>
      <OffCanvas style={{width:'35%'}}
        setOpen={setOpen}
        isOpen={isOpen}
        titleId='upcomingEdit'
        isBodyScroll
        placement='end'
      >
        <OffCanvasHeader setOpen={setOpen}>
          <OffCanvasTitle id='upcomingEdit'>Activity</OffCanvasTitle>
        </OffCanvasHeader>
        <OffCanvasBody>
          
        </OffCanvasBody>
         
      </OffCanvas>
    </div>
  );
};

export default DetailsModal;
