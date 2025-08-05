import React, { FC , useEffect  } from 'react';
import classNames from 'classnames';
 
import {   useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector  } from 'react-redux';
 
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
import { getbyidusers } from '../../../../redux/Slice/UserManagement_slice';
import { BorderLeft } from '../../../../components/icon/material-icons';
import Button from '../../../../components/bootstrap/Button';
import { petGetbyUserIds } from '../../../../redux/Slice/PetsManagement';
import Badge from '../../../../components/bootstrap/Badge';
 
 
interface ICustomerEditModalProps {
	dataaaa:any,
	setEditData:any,
	setEditModal:any,
	setEditId:any
}
const MainProfile: FC<ICustomerEditModalProps> = ({dataaaa,setEditId,setEditModal,setEditData}) => {


 
	const { id } = useParams();
	const dispatch = useDispatch()
	const serializedData:any = sessionStorage.getItem('Viewed_User_Data');
	const PetDAta = useSelector((state: any) => state?.Pet?.Pets)

	console.log(PetDAta);
	
    // Convert the JSON string back to an object
    const deserializedData = JSON.parse(serializedData);

	const modeid = localStorage.getItem('modeid')
	 
	
	useEffect(() => {
		dispatch(getbyidusers(id) as any)
		dispatch(petGetbyUserIds(id) as any)

	}, [id, dispatch])
	const { darkModeStatus } = useDarkMode();
	
	
	
	 
	
	const lastIndex = dataaaa?.avatars?.length ? dataaaa.avatars.length - 1 : -1;

	const navigator =useNavigate()

	const handleDivClick = (iddd:any) => {
	  
		if (id) {
			navigator(`/profile_management/view/${iddd}`);
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
								<div className='row g-5 py-3' style={{borderBottom:'1px solid #dee2e6'}}>
                                    <div className='col-sm-12 col-md-6 col-lg-5 col-xl-4 ' style={{borderRight:'1px solid #dee2e6'}}>

									<div className='d-flex justify-content-center'>
    <div style={{ position: 'relative' }}>
        <Avatar
            style={{ 
                borderRadius: '10px',
				border: dataaaa?.subscription ? '5px solid #ffd700' : '5px solid gray',
                position: 'relative', // Add this to position the pseudo-element
            }}
            src={dataaaa?.mainAvatar ? `https://datingapi.meander.software/assets/images/${dataaaa?.mainAvatar}` :imgback }
            isOnline={item.isOnline}
        />
        { dataaaa?.subscription &&
        <div
            style={{
                position: 'absolute',
                top: '50%', // Adjust the top position as needed
                right: '-15px', // Adjust the right position as needed
                transform: 'translateY(-50%)',
                color: '#ffd700', // Golden color
                fontSize: '34px', // Adjust the font size as needed
            }}
        >
            &#9733; {/* Unicode character for a star */}
        </div>}
    </div>
</div>
									 
                                           
										<div className='row g-3 my-2    '>
											<div className='col-12'>
												<div className='d-flex align-items-center'style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='Mail'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3' >
														<div className='fw-bold fs-5 mb-0'>
															{dataaaa?.email || 'John@gmail.com'}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
                                                <div className='d-flex align-items-center my-3' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='Phone'
															size='3x'
															color='primary'
                                                            />
													</div>
													<div className='flex-grow-1 ms-3'  	>
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
										 
												<div className='d-flex align-items-center' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon={dataaaa?.iAm === 'Male' ? "Male" : "Female"}
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{dataaaa?.iAm || 'Male'}
														</div>
														<div className='text-muted'>
															Gender
														</div>
													</div>
												 
											</div>
											<div className='d-flex align-items-center' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='cake'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
														{new Date(dataaaa?.dob).toLocaleDateString('en-US') || 'mm/dd/yyyy' }
														</div>
														<div className='text-muted'>
															Date of Birth
														</div>
													</div>
												 
											</div>
											<div className='d-flex align-items-center' style={{background:'#f0effb',padding:'10px',borderRadius:'15px'}}>
													<div className='flex-shrink-0'>
														<Icon
															icon='ListAlt'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
														{dataaaa?.address || 'USA' }
														</div>
														<div className='text-muted'>
														Address
														</div>
													</div>
												 
											</div>
											 
										</div>
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-7 col-xl-8 ' ><div style={{borderBottom:'1px solid #dee2e6'}}>

                                        <CardHeader>
					<CardLabel icon='Receipt'>
						<CardTitle tag='div' className='h5'>
							Bio
							
						</CardTitle>
					</CardLabel>
					<Button
						className='float-end '
						icon='Edit' color='primary' isLight onClick={() => {
							setEditData( deserializedData || dataaaa)
							setEditModal(true)
							setEditId(dataaaa?._id)
						}}>
							Edit
						</Button>
				</CardHeader>
				<CardBody>
				 
				{dataaaa?.description ?
					 
							<p>{dataaaa?.description}</p> :<p className='text-danger'>User has not Update Description</p>}
					 
				</CardBody>                                        
                                     
                            </div>



                            <div>

                                        
                                        <CardHeader>
								<CardLabel icon='StackedLineChart'>
									<CardTitle tag='div' className='h5'>
										Pet's 
									</CardTitle>
								</CardLabel>
								 
							</CardHeader>
							<CardBody className='row'>
							{Array.isArray(PetDAta) && PetDAta.map((dogitem: any, index: any) => (
  <Card key={dogitem?._id}
        className={`cursor-pointer shadow-3d-primary shadow-3d-hover col-5 mx-4 my-0 ${classNames(
		 
			`bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
			 
		  )}`}
		  onClick={()=>handleDivClick(dogitem?._id)}

      
  >
    <CardBody>
      <div
        className={classNames(
          'rounded-2 ',
          `bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
          'mb-3',
		  
        )}>
        <img
          src={dogitem?.mainAvatar ? `https://datingapi.meander.software/assets/images/${dogitem?.mainAvatar}` : imgback}
          alt=''
          width='100%'
          height='100%'
          className='object-fit-contain p-3'
        />
      </div>
      <CardTitle tag='div' className='h5'>
        {dogitem?.petName}
      </CardTitle>
      <p className='text-muted truncate-line-2'>{dogitem?.description}</p>
      <div className='row g-2'>
        {dogitem?.interest &&
          dogitem?.interest.map((itemInterest: any) => (
            <div key={itemInterest} className='col-auto'>
              <Badge isLight color='primary' className='px-3 py-2'>
                interest
              </Badge>
            </div>
          ))}
      </div>
    </CardBody>
  </Card>
))}

							</CardBody>
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
