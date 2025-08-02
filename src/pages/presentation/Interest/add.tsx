import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
 
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon1 from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import { createInterset, getAllInterest } from '../../../redux/Slice/IntersetSlice';
 
interface ICustomerEditModalProps {
  id: string;
  isOpen: boolean;
  setIsOpen(...args: unknown[]): unknown;
}

const ADD: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
  const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
  const item = id && Array.isArray(itemData) ? itemData[0] : {};
  const modeid = localStorage.getItem('modeid');

  const dispatch = useDispatch();

  const [errorHandling, setErrorHandling] = useState(false);

  const userValidation = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      mode: modeid,
      icon: 'AcUnit',
      interests: "string"
    },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      try {
        setErrorHandling(true);
      const res=await  dispatch(createInterset(values) as any); 
    
      if(res.payload){
        dispatch(getAllInterest(modeid) as any);
      }
      // Assuming createInterset is an asynchronous action
      } catch (error) {
        // Handle error
      } finally {
      }
      setIsOpen(false);
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon1 icon='Info' size='lg' className='me-1' />
          <span>Added Successfully</span>
        </span>,
        'User has been Added successfully',
      );
    },
  });

 

  const iconNames  = [
    "AirplanemodeActive",
    "Restaurant",
    "Fastfood",
    "FitnessCenter",
    "Explore",
    "MusicNote",
    "LocalMovies",
    "Camera",
    "SportsBasketball",
  
    "Palette",
    "MenuBook",
    "Landscape",
    "SportsEsports",
    "LocalDining",
   
    "Pets",
    "HotTub",
    "Devices",
    "DirectionsWalk",
    "EmojiPeople",
    "BusinessCenter",
    "Spa",
    "WineBar",
   
    "NaturePeople",
    "Theaters",
    "Create",
    "DirectionsBike",
    "BeachAccess",
    "LocalFlorist",
    "AccessibilityNew",
    "Business",
    "LibraryBooks",
    "Eco",
    "Stars",
    "EventAvailable",
    "PeopleOutline",
    "PanTool",
    "RestaurantMenu",
    "LocalCafe",
    
    
    "LocalMall",
    "Sailing",
    "Mic",
    "DirectionsRun",
    "SportsMma",
    "ContentCut",
    "Build",
    "Explore"
  ]

 

  if (id || id === '0') {
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='sm' titleId={id.toString()}>
        <ModalHeader setIsOpen={setIsOpen} className='p-4'>
          <ModalTitle id={id}>{item?.name || 'Add Interest'}</ModalTitle>
        </ModalHeader>
        <ModalBody className='px-4'>
          <div className='row g-4'>
            <FormGroup id='name' label='Name' className='col-md-12'>
              <Input
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div className='errorMassage'>{formik.errors.name}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='mode' label='Selected Mode' className='col-md-12'>
              <Input
                name='mode'
                onChange={formik.handleChange}
                value={formik.values.mode === '65943637acc570d6b14edf38' ? 'Matrimonial' :'Dating' }
                disabled
              />
              {formik.errors.mode ? (
                <div className='errorMassage'>{formik.errors.mode}</div>
              ) : (
                <div />
              )}
            </FormGroup>
           

            <FormGroup label='Icon Name' className='col-12'>
             
            <select
                id='icon'
                className='form-select'
                name='icon'
                value={formik.values.icon}
                onChange={formik.handleChange}
              >
                <option value='' disabled>
                  ...Select...
                </option>
                {iconNames.map((item1: any, index: number) => (
               
                  <option key={item1} value={item1}>
                   <Icon1 icon={item1} size='lg' className='me-1' />
                   {item1}
                  </option>
                
                ))}
              </select>
              <div>

                <Icon1 icon={formik.values.icon} size='lg' className='me-1' /> Selected Icon
              </div>
											{errorHandling && formik.errors.icon ? (
												<div className='errorMassage'>{formik.errors.icon}</div>
											) : (
												<div />
											)}
										</FormGroup>


                    

                    
          </div>
        </ModalBody>
        <ModalFooter className='px-4 pb-4'>
          <Button
            color='info'
            onClick={() => {
              formik.handleSubmit();
            }}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  return null;
};

ADD.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ADD;
