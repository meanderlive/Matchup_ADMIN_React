import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useDarkMode from '../../../hooks/useDarkMode';
import Footer from '../../../layout/Footer/Footer';

const DefaultFooter = () => {
	const { darkModeStatus } = useDarkMode();
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	useEffect(() => {
	  const intervalId = setInterval(() => {
		setCurrentYear(new Date().getFullYear());
	  }, 1000); // Update every second to ensure the year is always accurate
  
	  return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, []);

	
	return (
		<Footer>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col'>
						<span className='fw-light'>Copyright © {currentYear}- Version 4.3.0</span>
					</div>
					<div className='col-auto'>
						<a
							href='/'
							className={classNames('text-decoration-none', {
								'link-dark': !darkModeStatus,
								'link-light': darkModeStatus,
							})}>
							<small className='fw-bold'>Facit Theme</small>
						</a>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
