import React, { FC, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import data from '../../../../common/data/dummyCustomerData';
import imgback from '../../../../assets/back (3).png'
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Avatar from '../../../../components/Avatar';
import Icon from '../../../../components/icon/Icon';

import useDarkMode from '../../../../hooks/useDarkMode';
import { getbyidPets } from '../../../../redux/Slice/PetsManagement';
import { BorderLeft } from '../../../../components/icon/material-icons';
import Button from '../../../../components/bootstrap/Button';


interface ICustomerEditModalProps {
	dataaaa: any,
	setEditData: any,
	setEditModal: any,
	setEditId: any
}
const MainProfile: FC<ICustomerEditModalProps> = ({ dataaaa, setEditId, setEditModal, setEditData }) => {

	const navigator = useNavigate()

	const { id } = useParams();
	const dispatch = useDispatch()
	const serializedData: any = sessionStorage.getItem('Viewed_Pet_Data');

	// Convert the JSON string back to an object
	const deserializedData = JSON.parse(serializedData);

	const modeid = localStorage.getItem('modeid')


	useEffect(() => {
		dispatch(getbyidPets(id) as any)
	}, [id, dispatch])
	const { darkModeStatus } = useDarkMode();





	const lastIndex = dataaaa?.avatars?.length ? dataaaa.avatars.length - 1 : -1;




	const handleDivClick = () => {
		const userId = dataaaa?.user?._id;
		if (userId) {
			navigator(`/Owner_management/view/${userId}`);
		}
	};

	const handleKeyPress = (event: any) => {
		// Check if the Enter key is pressed
		if (event.key === 'Enter') {
			handleDivClick();
		}
	};


	const itemData = data.filter((item) => item.id.toString() === '1');
	const item = itemData[0];

	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];

	return (


		<div className='row' id='main_profile'>
			<div className='col-lg-12  row '>
				<Card className='shadow-3d-primary '>
					<CardBody>
						<div className='row g-5 py-3' style={{ borderBottom: '1px solid #dee2e6' }}>
							<div className='col-sm-12 col-md-6 col-lg-5 col-xl-4 ' style={{ borderRight: '1px solid #dee2e6' }}>

								<div className='d-flex justify-content-center'>
									<div style={{ position: 'relative' }}>
										<Avatar
											style={{
												borderRadius: '10px',
												border: dataaaa?.subscription ? '5px solid #ffd700' : '5px solid gray',
												position: 'relative',
											}}
											src={dataaaa?.mainAvatar ? `https://datingapi.meander.software/assets/images/${dataaaa?.mainAvatar}` : imgback}
											isOnline={item.isOnline}
										/>
										{dataaaa?.subscription &&
											<div
												style={{
													position: 'absolute',
													top: '50%',
													right: '-15px',
													transform: 'translateY(-50%)',
													color: '#ffd700',
													fontSize: '34px',
												}}
											>
												&#9733; {/* Unicode character for a star */}
											</div>}
									</div>
								</div>


								<div className='row g-3 my-2  justify-content-between  '>

									<div className='d-flex align-items-center' style={{ background: '#f0effb', padding: '10px', borderRadius: '15px' }}>
										<div className='flex-shrink-0'>
											<Icon
												icon='PestControlRodent'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3' >
											<div className='fw-bold fs-5 mb-0 text-capitalize'>
												{dataaaa?.petType || 'Dog'}
											</div>
											<div className='text-muted '>
												Pet Type
											</div>
										</div>
									</div>
									<div className='d-flex align-items-center my-3' style={{ background: '#f0effb', padding: '10px', borderRadius: '15px' }}>
										<div className='flex-shrink-0'>
											<Icon
												icon='MergeType'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3' >
											<div className='fw-bold fs-5 mb-0 text-capitalize'>
												{dataaaa?.petBreed || 'Any'}
											</div>
											<div className='text-muted '>
												Pet Breed
											</div>
										</div>
									</div>
									<div className='d-flex align-items-center my-3  col-5' style={{ background: '#f0effb', padding: '10px', borderRadius: '15px' }}>
										<div className='flex-shrink-0'>
											<Icon
												icon={dataaaa?.petGender === 'male' ? "Male" : "Female"}
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3'  >


											<div className='fw-bold fs-5 mb-0 text-capitalize'>
												{dataaaa?.petGender}

											</div>
											<div className='text-muted'>
												Pet Gender
											</div>
										</div>
									</div>

									<div className='d-flex align-items-center  my-3  col-5	' style={{ background: '#f0effb', padding: '10px', borderRadius: '15px' }}>	
										<div className='flex-shrink-0'>
											<Icon
												icon='Cake'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3'>
											<div className='fw-bold fs-5 mb-0 text-capitalize'>
												{dataaaa?.petAge || '2 Year'}
											</div>
											<div className='text-muted'>
												Gender
											</div>
										</div>
									</div>


									<div>


										<CardHeader>
											<CardLabel icon='StackedLineChart'>
												<CardTitle tag='div' className='h5'>
													Interest
												</CardTitle>
											</CardLabel>

										</CardHeader>
										<CardBody>
											<div className='row'>
												{dataaaa?.interest?.length ? dataaaa?.interest.map((item22: any, index: any) => (

													<div key={item22._id} className='col-sm-12 col-md-6 col-lg-4 col-xl-3  ' style={{ margin: '2px' }}>

														<div className={`bg-${colors[index]} d-flex align-items-center justify-content-center px-1`} style={{ height: '40px', borderRadius: '15px' }}  >
															<Icon icon={item22.icon} size='2x' className={`text-${colors[index - 1]}`} />
															{item22?.name}
														</div>

													</div>
												)) :
													<div>
														<p className='text-danger'>Pet has not selected any interest</p>

													</div>
												}

											</div>
										</CardBody>
									</div>
								</div>
							</div>
							<div className='col-sm-12 col-md-6 col-lg-7 col-xl-8 ' ><div style={{ borderBottom: '1px solid #dee2e6' }}>

								<CardHeader>
									<CardLabel icon='Receipt'>
										<CardTitle tag='div' className='h5'>
											Bio

										</CardTitle>
									</CardLabel>
									<Button
										className='float-end '
										icon='Edit' color='primary' isLight onClick={() => {
											setEditData(deserializedData || dataaaa)
											setEditModal(true)
											setEditId(dataaaa?._id)
										}}>
										Edit
									</Button>
								</CardHeader>
								<CardBody>

									{dataaaa?.description ?

										<p> Hi there! I'm {dataaaa?.petName}, the golden heartthrob of Woofington City. With my golden fur and charming smile, I'm ready to steal your heart. I'm a playful and energetic guy who loves long walks in the park, chasing tennis balls, and cuddling up on the couch for a good belly rub. My favorite pastime is meeting new furry friends and humans alike</p> : <p className='text-danger'>Pet has not Update Description</p>}

								</CardBody>

							</div>

								<div>




									<CardHeader>
										<CardLabel icon='Receipt'>
											<CardTitle tag='div' className='h5'>
												Owner Details

											</CardTitle>
										</CardLabel>

									</CardHeader>
									<div className='d-flex justify-content-center'>
										<div style={{ position: 'relative' }}>
											<Avatar className='rounded-circle10px'
											onClick={handleDivClick}
											style={{
												borderRadius: '0px',
												border: dataaaa?.user?.subscription ? '1px solid #ffd500' : '1px solid gray',
												boxShadow: dataaaa?.user?.subscription ? '0px 0px 50px 3px #ffd500' : 'none',
												position: 'relative',
												cursor: 'pointer'
											  }}
												src={dataaaa?.user?.mainAvatar ? `https://datingapi.meander.software/assets/images/${dataaaa?.user?.mainAvatar}` : imgback}
												isOnline={item.isOnline}
											/>
											{dataaaa?.user?.subscription &&
												<div
													style={{
														position: 'absolute',
														top: '1%',
														right: '-13px',
														transform: 'translateY(-50%)',
														color: '#ffd500',
														fontSize: '34px',
													}}
												>
													&#9733; {/* Unicode character for a star */}
												</div>}
										</div>
									</div>
								</div>
								<div className='row justify-content-around mt-5'>

									<div
										onClick={handleDivClick}
										onKeyPress={handleKeyPress} // Handle key press events
										role="button" // Add role attribute for better accessibility
										tabIndex={0}   // Ensure the element is focusable
										className='d-flex align-items-center my-2 col-5'
										style={{ background: '#f0effb', padding: '10px', borderRadius: '15px', cursor: 'pointer' }}
									>													<div className='flex-shrink-0'>
											<Icon
												icon='Person'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3 '  >
											<div className='fw-bold  mb-0 text-capitalize'>
												{dataaaa?.user?.name || 'Owner'}
											</div>
											<div className='text-muted'>
												Owner Name
											</div>
										</div>
									</div>
									<div
										onClick={handleDivClick}
										onKeyPress={handleKeyPress} // Handle key press events
										role="button" // Add role attribute for better accessibility
										tabIndex={0}   // Ensure the element is focusable
										className='d-flex align-items-center my-2 col-5'
										style={{ background: '#f0effb', padding: '10px', borderRadius: '15px', cursor: 'pointer' }}
									>													<div className='flex-shrink-0'>
											<Icon
												icon='Person'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3 '  >
											<div className='fw-bold  mb-0 text-capitalize'>
												{dataaaa?.user?.address || 'USA'}
											</div>
											<div className='text-muted'>
												Owner Address
											</div>
										</div>
									</div>
									<div
										onClick={handleDivClick}
										onKeyPress={handleKeyPress} // Handle key press events
										role="button" // Add role attribute for better accessibility
										tabIndex={0}   // Ensure the element is focusable
										className='d-flex align-items-center my-2 col-5'
										style={{ background: '#f0effb', padding: '10px', borderRadius: '15px', cursor: 'pointer' }}
									>													<div className='flex-shrink-0'>
											<Icon
												icon='Person'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3 '  >
											<div className='fw-bold  mb-0 text-capitalize'>
												{dataaaa?.user?.email || 'Owner'}
											</div>
											<div className='text-muted'>
												Owner Email
											</div>
										</div>
									</div>
									<div
										onClick={handleDivClick}
										onKeyPress={handleKeyPress} // Handle key press events
										role="button" // Add role attribute for better accessibility
										tabIndex={0}   // Ensure the element is focusable
										className='d-flex align-items-center my-2 col-5'
										style={{ background: '#f0effb', padding: '10px', borderRadius: '15px', cursor: 'pointer' }}
									>													<div className='flex-shrink-0'>
											<Icon
												icon='Person'
												size='3x'
												color='primary'
											/>
										</div>
										<div className='flex-grow-1 ms-3 '  >
										{dataaaa?.phoneNumber?
													
													<div className='fw-bold fs-5 mb-0'>
														({dataaaa?.phoneNumber.slice(0, 3)})-{dataaaa?.phoneNumber.slice(3, 7)}-{dataaaa?.phoneNumber.slice(7)}
                                                       
														</div>:	<div className='fw-bold fs-5 mb-0'>
														(555)-4444-333
                                                       
														</div>}
														<div className='text-muted'>
                                                        Phone Number
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
					</CardBody>


				</Card>
			</div>

		</div>

	);
};

export default MainProfile;
