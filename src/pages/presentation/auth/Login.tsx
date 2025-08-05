import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import {
	createForgotSlice,
	createLoginSlice,
	createOTPverfiySlice,
} from '../../../redux/Slice/AuthSlice';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
				<div className='text-center h4 text-muted mb-5'>Forgat password?</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};
LoginHeader.defaultProps = {
	isNewUser: false,
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser } = useContext<any>(AuthContext);
	const dispatch = useDispatch();
	const isAuth = useSelector((state: any) => state.auth);
	console.log(isAuth)
	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [forgotPassword, setForgotPassword] = useState<any>(false);
	const [isforgot, setIsForgot] = useState<any>(false);
	const [otpData, setOtpData] = useState<any>('');

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/modes'), [navigate]);

	const usernameCheck = (username: string) => {
		return !!getUserDataWithUsername(username);
	};

	const passwordCheck = (username: string, password: string) => {
		return getUserDataWithUsername(username).password === password;
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
			otp: '',
		},
		validate: (values) => {
			const errors: { email?: string; password?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {

			 
			const res=	await dispatch(createLoginSlice(values) as any);
			localStorage.setItem('facit_asideStatus', 'true');
		setUser(res.payload.data.Name);
			if(res.payload.isSuccess){

				// const idmode = '658538cde21518a3d04bf3ae';
				// localStorage.setItem('modeid', idmode);
			await	handleOnClick();
		}
			setSignInPassword(true);

			if (isAuth.auth) {
				handleOnClick();
				 
			}
			//  else if (isAuth.auth === false) {
			// 	showNotification(
			// 		<span className='d-flex align-items-center'>
			// 			<Icon icon='Info' size='lg' className='me-1' />
			// 			<span>Credentials don't match</span>
			// 		</span>,
			// 		'Credentials Failed',
			// 	);
			// }

			// setUser('test');

			// if (usernameCheck(values.email)) {
			// 	if (passwordCheck(values.email, values.password)) {
			// 		if (setUser) {
			// 			setUser('test');
			// 		}

			// 		handleOnClick();
			// 	} else {
			// 		formik.setFieldError('password', 'Username and password do not match.');
			// 	}
			// }
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		// setIsLoading(true);
		setSignInPassword(true);

		// setTimeout(() => {
		// 	if (
		// 		!Object.keys(USERS).find(
		// 			(f) => USERS[f].username.toString() === formik.values.email,
		// 		)
		// 	) {
		// 		formik.setFieldError('email', 'No such user found in the system.');
		// 	} else {
		// 		setSignInPassword(true);
		// 	}
		// 	setIsLoading(false);
		// }, 1000);
	};
	const handleSendOtp = async () => {
		setIsForgot(true);
		await dispatch(createForgotSlice({ email: formik.values.email }) as any);
	};

	const handleVerifyOtp = async () => {
		await dispatch(
			createOTPverfiySlice({ otp: formik.values.otp, token: isAuth.forgotUser.token }) as any,
		)
		if(isAuth.auth){
			handleOnClick()
		}
		if (setUser) {
			setUser(formik.values.email);
		}
	};
	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-dark': !singUpStatus, 'bg-light': singUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/auth-pages/login'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}
										aria-label='Facit'>
										 	<h1 className=' my-3 fw-bold'>Admin</h1>
									</Link>
								</div>
								 

								<LoginHeader isNewUser={forgotPassword} />
 
								<form className='row g-4'>
									{forgotPassword ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='email'
													isFloating
													label='Your email'
													className={classNames({
														'd-none': isforgot,
													})}>
													<Input
														value={formik.values.email}
														isTouched={formik.touched.email}
														invalidFeedback={formik.errors.email}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='otp'
													isFloating
													label='otp'
													className={classNames({
														'd-none': !isforgot,
													})}>
													<Input
														type='text'
														autoComplete='otp'
														value={formik.values.otp}
														isTouched={formik.touched.otp}
														invalidFeedback={formik.errors.otp}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!isforgot ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.email}
														onClick={() => handleSendOtp()}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Send Otp
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={handleVerifyOtp}>
														{isAuth && (
															<Spinner isSmall inButton isGrow />
														)}
														Login
													</Button>
												)}
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='email'
													isFloating
													label='Your email or username'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formik.values.email}
														isTouched={formik.touched.email}
														invalidFeedback={formik.errors.email}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
												{signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formik.values.email}.
													</div>
												)}
												<FormGroup
													id='password'
													isFloating
													label='Password'
													className={classNames({
														'd-none': !signInPassword,
													})}>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.password}
														isTouched={formik.touched.password}
														invalidFeedback={formik.errors.password}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.email}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formik.handleSubmit}>
														Login
													</Button>
												)}
											</div>
										</>)}
										{
  !forgotPassword && (
    <div
      role="button" // Adding the appropriate role
      tabIndex={0} // Making it focusable with a keyboard
      className='col-12'
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        cursor: 'pointer',
      }}
      onClick={() => setForgotPassword(true)}
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          // Trigger the action on Enter key press
          setForgotPassword(true);
        }
      }}
    >
      <h6>Forgot Password?</h6>
    </div>
  )
}


							

									{/* {!signInPassword && (
										<>
											<div className='col-12 mt-3 text-center text-muted'>
												OR
											</div>
											<div className='col-12 mt-3'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomApple'
													onClick={handleOnClick}>
													Sign in with Apple
												</Button>
											</div>
											<div className='col-12'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomGoogle'
													onClick={handleOnClick}>
													Continue with Google
												</Button>
											</div>
										</>
									)} */}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
