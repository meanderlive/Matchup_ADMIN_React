import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
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
	resetPasswordSlice,
	createForgotSlice,
	createLoginSlice,
	createOTPverfiySlice,
	setError,
} from '../../../redux/Slice/AuthSlice';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { demoPagesMenu } from '../../../menu';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
				<div className='text-center h4 text-muted mb-5'>Forget password?</div>
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
	console.log(isAuth, "isAuthisAuth12121212")

	const error = isAuth?.error
	console.log(error, 'isAuth');
	const { darkModeStatus } = useDarkMode();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [forgotPassword, setForgotPassword] = useState<any>(false);
	const [isforgot, setIsForgot] = useState<any>(false);
	const [otpData, setOtpData] = useState<any>('');
	const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
	const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);
	const handleOnOut = useCallback(() => navigate(`../${demoPagesMenu.login.path}`), [navigate]);

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
			newPassword: '',
			confirmNewPassword: '',

		},
		validate: (values) => {
			const errors: any = {};

			if (!values.email) errors.email = 'Required';
			if (forgotPassword && !isOtpSent && !isOtpVerified) {
				if (!values.otp) errors.otp = 'Required';
			}
			if (forgotPassword && isOtpVerified) {
				if (!values.newPassword) errors.newPassword = 'Required';
				if (!values.confirmNewPassword) errors.confirmNewPassword = 'Required';
				if (values.newPassword !== values.confirmNewPassword) {
					errors.confirmNewPassword = 'Passwords do not match';
				}
			}
			return errors;
		},
		validateOnChange: false,
		// onSubmit: async (values) => {
		// 	setIsLoading(true);


		// 	const res = await dispatch(createLoginSlice(values) as any);
		// 	console.log(res, 'res.payload.isSuccess');
		// 	localStorage.setItem('facit_asideStatus', 'true');



		// 	setUser(res.payload.data.fullname);

		// 	if (res.payload.isSuccess) {
		// 		showNotification(
		// 			<span className='d-flex align-items-center'>
		// 				<Icon icon='Info' size='lg' className='me-1' />
		// 				<span>Login {res.payload.data.fullname}</span>
		// 			</span>,
		// 			`Login ${res.payload.data.fullname}`,
		// 		);
		// 		localStorage.setItem('login', JSON.stringify(res.payload.data));
		// 		localStorage.setItem('modeid', res.payload.data?.mode);
		// 		localStorage.setItem('RoleData', JSON.stringify(res.payload.data?.role ?? {}));
		// 		localStorage.setItem('RoleId', JSON.stringify(res.payload.data?.role.name ?? {}));



		// 		await handleOnClick();
		// 	}
		// 	else if (res.meta.requestStatus === "rejected") {
		// 		setIsLoading(false);

		// 		alert('kjgfhdg')
		// 	}
		// 	setSignInPassword(true);

		// 	if (isAuth.auth) {
		// 		setIsLoading(false);
		// 		handleOnClick();


		// 	}
		// },
		onSubmit: async (values) => {
			setIsLoading(true);
		
			const res = await dispatch(createLoginSlice(values) as any);
			console.log(res, 'res.payload.isSuccess');
		
			if (res.payload.isSuccess) {
				const userRole = res.payload.data?.role?.name; // Get user role from response
		
				// Allowed roles for the admin panel
				const allowedRoles = ["Admin", "SuperAdmin", "FinanceAdmin", "ServiceAdmin"];
		
				if (!allowedRoles.includes(userRole)) {
					setIsLoading(false);
					alert("Access Denied! You are not authorized to access the Admin Panel.");
					return;
				}
		
				// Proceed with login for allowed roles
				localStorage.setItem('facit_asideStatus', 'true');
				localStorage.setItem('login', JSON.stringify(res.payload.data));
				localStorage.setItem('modeid', res.payload.data?.mode);
				localStorage.setItem('RoleData', JSON.stringify(res.payload.data?.role ?? {}));
				localStorage.setItem('RoleId', JSON.stringify(res.payload.data?.role.name ?? {}));
		
				setUser(res.payload.data.fullname);
		
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Login {res.payload.data.fullname}</span>
					</span>,
					`Login ${res.payload.data.fullname}`,
				);
		
				await handleOnClick(); // Redirect to Admin Panel
			} else if (res.meta.requestStatus === "rejected") {
				setIsLoading(false);
				alert("Login Failed! Please try again.");
			}
		
			setSignInPassword(true);
		
			if (isAuth.auth) {
				setIsLoading(false);
				handleOnClick();
			}
		},
		
	});

	const handleContinue = () => {
		setIsLoading(true);
		setSignInPassword(true);

		setIsLoading(false);
		// }, 1000);
	};
	const handleSendOtp = async () => {
		setIsForgot(true);
		await dispatch(createForgotSlice({ email: formik.values.email }) as any);
	};

	// const handleVerifyOtp = async () => {
	// 	await dispatch(
	// 		createOTPverfiySlice({ otp: formik.values.otp, token: isAuth.forgotUser.data.token }) as any,
	// 	)
	// 	// if(isAuth.auth){
	// 	// 	handleOnClick()
	// 	// }
	// 	if (setUser) {
	// 		setUser(formik.values.email);
	// 	}
	// };

	const handleVerifyOtp = async () => {
		setIsLoading(true);
		const res = await dispatch(
			createOTPverfiySlice({ otp: formik.values.otp, token: isAuth.forgotUser.data.token }) as any
		);
	
		if (res.payload.isSuccess) {
			setIsOtpVerified(true);  // Set this state to show password fields
		} else {
			alert("Invalid OTP, please try again.");
		}
		setIsLoading(false);
	};
	
	const handleResetPassword = async () => {
		if (!formik.values.newPassword) {
			alert("Please enter a new password");
			return;
		}

		setIsLoading(true);
		const res = await dispatch(
			resetPasswordSlice({
				email: formik.values.email,
				newPassword: formik.values.newPassword,
				token: isAuth.forgotUser.data.token,
			}) as any
		);
		if (isAuth.auth) {
			handleOnOut()
		}
		if (res.payload.isSuccess) {
			// showNotification("Password reset successful. Please login with your new password.");
			setForgotPassword(false);
			setIsForgot(false);
		} else {
			alert("Password reset failed. Please try again.");
		}
		setIsLoading(false);
	};

	useEffect(() => {


		if (error?.isSuccess === false && isLoading) {
			setIsLoading(false)
			showNotification(

				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>login failure {error?.error}</span>
				</span>,
				`login failure ${error?.error}`,
			);

			dispatch(setError({}) as any)
			setSignInPassword(false);
		}


	}, [error, isLoading, dispatch])
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
											{!isOtpVerified ? (
												<>
													{/* Email Input */}
													<div className='col-12'>
														<FormGroup
															id='email'
															isFloating
															label='Your email'
															className={classNames({ 'd-none': isforgot })}>
															<Input
																value={formik.values.email}
																isTouched={formik.touched.email}
																invalidFeedback={formik.errors.email}
																isValid={formik.isValid}
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																onFocus={() => { formik.setErrors({}); }}
															/>
														</FormGroup>
													</div>

													{/* OTP Input */}
													{isforgot && (
														<div className='col-12'>
															<FormGroup id='otp' isFloating label='OTP'>
																<Input
																	type='text'
																	autoComplete='otp'
																	value={formik.values.otp}
																	isTouched={formik.touched.otp}
																	invalidFeedback={formik.errors.otp}
																	isValid={formik.isValid}
																	onChange={formik.handleChange}
																	onBlur={formik.handleBlur}
																	onFocus={() => { formik.setErrors({}); }}
																/>
															</FormGroup>
														</div>
													)}

													{/* OTP Submission Button */}
													<div className='col-12'>
														{!isforgot ? (
															<Button color='warning' className='w-100 py-3' isDisable={!formik.values.email} onClick={handleSendOtp}>
																{isLoading && <Spinner isSmall inButton isGrow />}
																Send OTP
															</Button>
														) : (
															<Button color='warning' className='w-100 py-3' onClick={handleVerifyOtp}>
																{isLoading ? <Spinner isSmall inButton isGrow /> : "Submit OTP"}
															</Button>
														)}
													</div>
												</>
											) : (
												<>
													{/* New Password Input */}
													<div className='col-12'>
														<FormGroup id='newPassword' isFloating label='New Password'>
															<Input
																type='password'
																value={formik.values.newPassword}
																isTouched={formik.touched.newPassword}
																invalidFeedback={formik.errors.newPassword}
																isValid={formik.isValid}
																onChange={formik.handleChange}
																placeholder='Enter New Password'
																onBlur={formik.handleBlur}
																onFocus={() => { formik.setErrors({}); }}
															/>
														</FormGroup>
													</div>

													{/* Confirm Password Input */}
													<div className='col-12'>
														<FormGroup id='confirmNewPassword' isFloating label='Confirm New Password'>
															<Input
																type='password'
																value={formik.values.confirmNewPassword}
																isTouched={formik.touched.confirmNewPassword}
																invalidFeedback={formik.errors.confirmNewPassword}
																isValid={formik.isValid}
																onChange={formik.handleChange}
																placeholder='Re-enter New Password'
																onBlur={formik.handleBlur}
																onFocus={() => { formik.setErrors({}); }}
															/>
														</FormGroup>
													</div>

													{/* Reset Password & Login Button */}
													<div className='col-12'>
														<Button color='warning' className='w-100 py-3' onClick={handleResetPassword}>
															{isLoading ? <Spinner isSmall inButton isGrow /> : "Reset Password & Login"}
														</Button>
													</div>
												</>
											)}
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
														{isLoading ? (
															<>
																<Spinner isSmall inButton isGrow /> loading...
															</>
														)
															: "Login"
														}
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
