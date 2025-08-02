import React, { useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import data from '../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../components/bootstrap/Popovers';
import CustomerEditModal from './CustomerEditModal';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';

const SearchFilterCustomization = () => {

	const searchFilterData = [
		// Basic Information
		{ name: 'AgeRange', description: 'Allow users to filter potential matches based on their age preferences.', status: 'active' },
		{ name: 'Gender', description: 'Provide options for users to select the gender(s) they are interested in.', status: 'active' },
		{ name: 'Location', description: 'Enable users to filter matches based on geographical proximity or distance range.', status: 'active' },
	  
		// Appearance
		{ name: 'Height', description: 'Allow users to specify their preferred height range for potential matches.', status: 'active' },
		{ name: 'BodyType', description: 'Provide options for body type preferences, such as slim, athletic, or curvy.', status: 'active' },
	  
		// Interests and Hobbies
		{ name: 'Hobbies', description: 'Allow users to filter matches based on shared interests or specific hobbies.', status: 'active' },
		{ name: 'MusicMoviePreferences', description: 'Include filters for favorite music genres or movie types.', status: 'active' },
	  
		// Lifestyle
		{ name: 'SmokingDrinkingHabits', description: 'Include filters for smoking and drinking preferences.', status: 'active' },
		{ name: 'ExerciseFrequency', description: 'Allow users to filter based on how often potential matches exercise.', status: 'active' },
	  
		// Education and Occupation
		{ name: 'EducationLevel', description: 'Enable users to filter matches based on educational background.', status: 'active' },
		{ name: 'Occupation', description: 'Provide options to filter matches based on their profession or occupation.', status: 'active' },
	  
		// Relationship Preferences
		{ name: 'RelationshipStatus', description: 'Allow users to filter matches based on whether they are single, divorced, or widowed.', status: 'active' },
		{ name: 'Intentions', description: 'Include filters for relationship intentions, such as casual dating, serious relationship, or friendship.', status: 'active' },
	  
		// Ethnicity and Religion
		{ name: 'Ethnicity', description: 'Allow users to specify preferences for ethnicity if it\'s important to them.', status: 'active' },
		{ name: 'Religion', description: 'Include filters for religious beliefs and practices.', status: 'active' },
	  
		// Compatibility Metrics
		{ name: 'ZodiacSign', description: 'For users interested in astrology, provide a filter based on zodiac signs.', status: 'active' },
		{ name: 'MBTI', description: 'Allow users to filter matches based on personality types.', status: 'active' },
	  
		// Language and Communication
		{ name: 'LanguageSpoken', description: 'Include filters for preferred languages.', status: 'active' },
		{ name: 'CommunicationStyle', description: 'Allow users to filter matches based on communication preferences, such as text, voice, or video.', status: 'active' },
	  
		// Custom Tags
		{ name: 'CustomTags', description: 'Enable users to add custom tags or keywords to their profiles that others can use as search filters.', status: 'active' },
	  ];



	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
 
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData =searchFilterData && searchFilterData?.filter(
		(f:any) =>
			// Name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())  
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);

	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<SubHeader className='mt-5'>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search filter...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'
								aria-label='Filter'>
								{data.length !== filteredData.length && (
									<Popovers desc='Filtering applied' trigger='hover'>
										<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
											<span className='visually-hidden'>
												there is filtering
											</span>
										</span>
									</Popovers>
								)}
							</Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg'>
							<div className='container py-2'>
								<div className='row g-3'>
									<FormGroup label='Balance' className='col-12'>
										<InputGroup>
											<Input
												id='minPrice'
												ariaLabel='Minimum price'
												placeholder='Min.'
												onChange={formik.handleChange}
												value={formik.values.minPrice}
											/>
											<InputGroupText>to</InputGroupText>
											<Input
												id='maxPrice'
												ariaLabel='Maximum price'
												placeholder='Max.'
												onChange={formik.handleChange}
												value={formik.values.maxPrice}
											/>
										</InputGroup>
									</FormGroup>
								 
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						New Filter
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch> 
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th>Description</th>
									 
											<th >
												Status 
												 
											</th>
											<th
												 >
												Action 
												 </th>
											<td />
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i,index) => (
											<tr key={i?.name}>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<div
																className='ratio ratio-1x1 me-3'
																style={{ width: 48 }}>
																<div
																	className={`bg-l${
																		darkModeStatus
																			? 'o25'
																			: '25'
																	}-${getColorNameWithIndex(
																		index,
																	)} text-${getColorNameWithIndex(
																		index,
																	)} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(i?.name)}
																	</span>
																</div>
															</div>
														</div>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i?.name}
															</div>
													 	</div>
													</div>
												</td>
											 
												<td>
													{i?.description}
												</td>
												<td>
													{i?.status}
												</td>
												<td>
													<Dropdown>
														<DropdownToggle hasIcon={false}>
															<Button
																icon='MoreHoriz'
																color='dark'
																isLight
																shadow='sm'
																aria-label='More actions'
															/>
														</DropdownToggle>
														<DropdownMenu isAlignmentEnd>
															<DropdownItem>
																<Button
																	icon='Visibility'
																	tag='a'
																	onClick={() => setEditModalStatus(true)}
																	 >
																	Edit
																</Button>
															</DropdownItem>
															
														 
															<DropdownItem>
																<Button
																	icon='Visibility'
																	tag='a'
																	 >
																	Delete
																</Button>
															</DropdownItem>
															
														</DropdownMenu>
													</Dropdown>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			<CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />
		</PageWrapper>
	);
};

export default SearchFilterCustomization;
