 


import React, { useCallback, useEffect, useState } from 'react'

const TimeAgo = ({ timestamp }:any) => {

  const [timeAgo, setTimeAgo] = useState('');
	const calculateTimeAgo:any = useCallback(() => {
    console.log(timestamp);
    
		const now: any = new Date();
		const loginDate: any = new Date(timestamp);
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
	}, [timestamp]);
  useEffect(() => {
		calculateTimeAgo();
	}, [timestamp, calculateTimeAgo]);

  return (
   
      <span>{timeAgo}</span>
    
  )
}

export default TimeAgo
