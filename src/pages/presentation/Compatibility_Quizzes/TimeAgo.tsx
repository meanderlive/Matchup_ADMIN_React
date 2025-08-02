 


import React from 'react'

const TimeAgo = ({ timestamp }:any) => {

    const calculateTimeAgo = () => {
        const now:any = new Date();
        const activityTime:any = new Date(timestamp);
        const timeDifference = now - activityTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
          }
          if (hours > 0) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
          }
          if (minutes > 0) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
          }
        
          return 'Just now';
      };
    
  return (
   
      <span>{calculateTimeAgo()}</span>
    
  )
}

export default TimeAgo
