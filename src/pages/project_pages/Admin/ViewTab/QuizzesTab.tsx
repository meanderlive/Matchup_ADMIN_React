import React, {   FC, useEffect, useState  } from 'react';
 
import {   useParams } from 'react-router-dom';
 
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
 
import data from '../../../../common/data/dummyCustomerData';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
 
 import AddImage from "./AddImageGallery";
import useDarkMode from '../../../../hooks/useDarkMode';
import { RemoveImageintoGallerys, getbyidusers } from '../../../../redux/Slice/UserManagement_slice';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
 

interface ICustomerEditModalProps {
	dataaaa:any
}
const Gallery: FC<ICustomerEditModalProps> = ({dataaaa}) => {




    const compatibilityQuizzes = [
        {
          id: 1,
          title: 'Personality Quiz',
          questions: [
            {
              id: 1,
              questionText: 'How would you describe your personality in one word?',
              options: ['Outgoing', 'Reserved', 'Adventurous', 'Calm'],
            },
            {
              id: 2,
              questionText: 'What are your favorite hobbies?',
              options: ['Reading', 'Sports', 'Traveling', 'Cooking'],
            },
            {
              id: 3,
              questionText: 'How do you handle stress?',
              options: ['Exercise', 'Meditation', 'Talking to friends', 'Watching movies'],
            },
            {
              id: 4,
              questionText: 'What type of books do you enjoy?',
              options: ['Fiction', 'Non-fiction', 'Mystery', 'Science fiction'],
            },
            {
              id: 5,
              questionText: 'What is your favorite type of music?',
              options: ['Pop', 'Rock', 'Hip-hop', 'Classical'],
            },
          ],
        },
        {
          id: 2,
          title: 'Interest Compatibility',
          questions: [
            {
              id: 1,
              questionText: 'What are your favorite movies?',
              options: ['Action', 'Romance', 'Comedy', 'Drama'],
            },
            {
              id: 2,
              questionText: 'Do you enjoy outdoor activities?',
              options: ['Yes', 'No', 'Sometimes', 'Prefer indoors'],
            },
            {
              id: 3,
              questionText: 'What type of cuisine do you prefer?',
              options: ['Italian', 'Asian', 'Mexican', 'American'],
            },
            {
              id: 4,
              questionText: 'How often do you like to travel?',
              options: ['Frequently', 'Occasionally', 'Rarely', 'Never'],
            },
            {
              id: 5,
              questionText: 'What is your favorite travel destination?',
              options: ['Beach resort', 'Mountain retreat', 'City exploration', 'Countryside'],
            },
          ],
        },
        // Add more quizzes as needed
      ];
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
const [removeImage,setRemoveImage]=useState<boolean>(false)
	const [editModal, setEditModal] = useState<boolean>(false);
	 
	const { ids } = useParams();
	const dispatch = useDispatch()
	 

	
	
	useEffect(() => {
		dispatch(getbyidusers(ids) as any)
	}, [ids, dispatch])
	const { darkModeStatus } = useDarkMode();
	
	
 const removeImageFun = (id:any, item:any)=>{
	const data1 = {id,item}
	dispatch(RemoveImageintoGallerys(data1)as any)
	setTimeout(() => {
		
		dispatch(getbyidusers(id) as any)
	}, 4000);
	showNotification(
		<span className='d-flex align-items-center'>
			<Icon icon='danger' size='lg' className='me-1' />
			<span>Picture Remove Successfully</span>
		</span>,
		'Picture has been Removed successfully',
	);
 }






	 
	const itemData = data.filter((item) => item.id.toString() === '1');
	const item = itemData[0];
 
	 
 
	 

	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'];

	const GALLERY = (
		<div className='row g-4'>
			{dataaaa?.avatars.length ? dataaaa?.avatars.map((item1: any, index: any) => (
				<div key={item1.id} className='col-xxl-2 col-lg-3 col-md-6 position-relative'>
					<p>{item1._id}</p>
					<button
						type='button'
						onClick={() => setSelectedImage(`https://datingapi.meander.software/assets/images/${item1}`)}
						className={classNames(
							'ratio ratio-1x1',
							'rounded-2',
							'border-0',
							`bg-l${darkModeStatus ? 'o25' : '25'}-${colors[index % 7]}`,
							`bg-l${darkModeStatus ? 'o50' : '10'}-${colors[index % 7]}-hover`,
						)}>
						<img
							src={`https://datingapi.meander.software/assets/images/${item1}` || item.src}

							alt={item1.id}
							width='100%'
							height='auto'
							className='object-fit-contain p-4'
						/>
					</button>
				{removeImage &&	<Button
				style={{background:'transparent',border:'none',color : 'black'}}
				icon='Cancel'
				 color='dark'  
          type='button'
          onClick={ ()=>removeImageFun(dataaaa?._id, item1)}	
          className='position-absolute top-0 end-0 m-2 '
        //   aria-label='Close'
        />}
				</div>
			)) : <p className='text-danger'>The user has not uploaded any images.</p>}
		</div>
	);



 
	return (
		  
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='PhotoSizeSelectActual' iconColor='info'>
									<CardTitle>Quizzes </CardTitle>
									 
								</CardLabel>
								 
							</CardHeader>
							<CardBody>
<div className='row'>

                                {compatibilityQuizzes.map((itemmain,indexmain)=>(
<div key={itemmain.id}   style={{background: '#d5d5d58c',
    border: 'aliceblue',
    padding: '10px 10px 0px 10px',
    borderRadius:'15px',
    margin: '0px 0px 19px'}}  >
        <div  data-bs-toggle="collapse "   role="button" aria-expanded="false" aria-controls={`#collapseExample${indexmain}`}>

                                    <p>
  <a className="btn  " style={{border:'none'}} data-bs-toggle="collapse" href={`#collapseExample${indexmain}`} role="button" aria-expanded="false" aria-controls={`#collapseExample${indexmain}`}>
  {itemmain.title}
  </a>

 
</p>
            </div>
<div className="collapse show" id={`collapseExample${indexmain}`}>
  <div className="card card-body">
    {itemmain?.questions.map((item1,subindex)=>(
        <div key={item1.id} style={{borderBottom:'1px gray solid', paddingBottom:'5px'}}>
<p>Questions : {item1.questionText}</p>
<div className='row'>
{item1?.options.map((item2,index)=>(
    <div key={item2} className='col-md-3 col-sm-6 '>
<Button color='primary' isLight={index !== subindex}> {item2}</Button>

            </div>
    ))}
    </div>
            </div>
    ))}
  </div>
</div>
</div>
  ))}
</div>

</CardBody>
						</Card>
					</div>

 
 
		 
				 
	);
};

export default Gallery;
