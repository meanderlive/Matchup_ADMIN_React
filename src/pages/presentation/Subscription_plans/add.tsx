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
import { createSubscription, getAllSubscription } from '../../../redux/Slice/SubscriptionSlice';
 
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
    planName: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {

      
         
        
        planPrice: 0,
        planDuration: '',
        planDescription: '',
      
      planType:'',
      planName:'',
      
      mode: modeid,
  
      Subscriptions: "string"
    },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      try {
        setErrorHandling(true);
      const res=await  dispatch(createSubscription(values) as any); 
    
      if(res.payload){
        dispatch(getAllSubscription(modeid) as any);
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
        <ModalHeader setIsOpen={setIsOpen} className='p-4'>
          <ModalTitle id={id}>{item?.name || 'Add Subscription'}</ModalTitle>
        </ModalHeader>
        <ModalBody className='px-4'>
          <div className='row g-4'>
            <FormGroup id='planName' label='Plan Name *' className='col-md-12'>
              <Input
                name='planName'
                onChange={formik.handleChange}
                value={formik.values.planName}
              />
              {formik.errors.planName ? (
                <div className='errorMassage'>{formik.errors.planName}</div>
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
            <FormGroup id='planPrice' label='Plan Price *' className='col-md-12'>
              <Input
              type='number'
                name='planPrice'
                onChange={formik.handleChange}
                value={formik.values.planPrice}
              />
              {formik.errors.planPrice ? (
                <div className='errorMassage'>{formik.errors.planPrice}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planType' label='Plan Type *' className='col-md-12'>
              <Input
                name='planType'
                onChange={formik.handleChange}
                value={formik.values.planType}
              />
              {formik.errors.planType ? (
                <div className='errorMassage'>{formik.errors.planType}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planDuration' label='Plan Duration *' className='col-md-12'>
              <Input
                name='planDuration'
                onChange={formik.handleChange}
                value={formik.values.planDuration}
              />
              {formik.errors.planDuration ? (
                <div className='errorMassage'>{formik.errors.planDuration}</div>
              ) : (
                <div />
              )}
            </FormGroup>
            <FormGroup id='planDescription' label='Plan Description *' className='col-md-12'>
              <Input
                name='planDescription'
                onChange={formik.handleChange}
                value={formik.values.planDescription}
              />
              {formik.errors.planDescription ? (
                <div className='errorMassage'>{formik.errors.planDescription}</div>
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
