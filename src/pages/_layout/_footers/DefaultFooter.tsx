import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useDarkMode from '../../../hooks/useDarkMode';
import Footer from '../../../layout/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getbtIDmode } from '../../../redux/Slice/Modes_Slice';

const DefaultFooter = () => {
	const { darkModeStatus } = useDarkMode();
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const userLogin =JSON.parse(localStorage.getItem("login") as any)
	const RoleData =JSON.parse(localStorage.getItem("RoleData") as any)

const store:any =useSelector((i)=>i)
const modeData = store?.mode?.mode[0] || {}
 
const login_Admin_Mode= userLogin?.mode
	const dispatch= useDispatch();
	useEffect(()=>{
		dispatch(getbtIDmode({id:login_Admin_Mode})as any)
	},[dispatch,login_Admin_Mode])

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
							<small className='fw-bold'>{modeData?.display_name}-<span className='fw-lighter'>{RoleData?.name}</span> </small>
						</a>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
