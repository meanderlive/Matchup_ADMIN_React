import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
  SubheaderSeparator,
} from "../../../layout/SubHeader/SubHeader";
import Page from "../../../layout/Page/Page";
import { demoPagesMenu } from "../../../menu";
import Card, { CardBody } from "../../../components/bootstrap/Card";
import { getFirstLetter, priceFormat } from "../../../helpers/helpers";
import data from "../../../common/data/dummyCustomerData";
import PaginationButtons, {
  dataPagination,
  PER_COUNT,
} from "../../../components/PaginationButtons";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";
import Input from "../../../components/bootstrap/forms/Input";
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "../../../components/bootstrap/Dropdown";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Checks, {
  ChecksGroup,
} from "../../../components/bootstrap/forms/Checks";
import PAYMENTS from "../../../common/data/enumPaymentMethod";
import useSortableData from "../../../hooks/useSortableData";
import InputGroup, {
  InputGroupText,
} from "../../../components/bootstrap/forms/InputGroup";
import Popovers from "../../../components/bootstrap/Popovers";
// import CustomerEditModal from './CustomerEditModal';
import { getColorNameWithIndex } from "../../../common/data/enumColors";
import useDarkMode from "../../../hooks/useDarkMode";
// import add_user_management from './ADD'
import Add from "./Add_Subscriptions";

import Edit_User from "./Edit_Subscriptions";
import OrderDeleteModal from "./Delete_Subscriptions";
import * as Yup from "yup";
import {
  fetchUser,
  fetchsearchUser,
  fetchsortUser,
  fetchupdateUser,
  searchUserbyAges,
  setPage,
} from "../../../redux/Slice/UserManagement_slice";

import ActiveUser from "./ActiveSubscription";
import { getAllroles } from "../../../redux/Api/role";
import { updatestatus } from "../../../redux/Api/UserManagement";
import Label from "../../../components/bootstrap/forms/Label";
import Select from "../../../components/bootstrap/forms/Select";
import imgback from "../../../assets/back (3).png";
import { Role, Plan } from "../../../InterFace/InterFace";
import { getAll_Subscription, upload_Subscriptions_Images } from "../../../redux/Slice/Subscriptions_Slice";
import { log } from "console";

const Plans = () => {
  const { darkModeStatus } = useDarkMode();
  const [searchUser, setSearcUser] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT["10"]);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteid] = useState<any>("");
  const [editId, setEditId] = useState<any>("");
  const [previewImage, setPreviewImage] = useState<any>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentUploadId, setCurrentUploadId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const Store: any = useSelector((state: any) => state.Plan);
  const [SelectedPlan, setSelectPlan] = useState(localStorage.getItem("planid") || "")

  const PlanData = Store?.modes?.data;
  const modeid = localStorage.getItem("modeid");

  const [viewUser, setViewUser] = useState<any>(false);
  const [viewData, setViewdata] = useState<any>("");
  const [filterData, setFilterData] = useState<any>({
    gender: "",
    minAge: "",
    maxAge: "",
  });

  const handleFilterData = (e: any) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const handleStatus = async (idedi: any, status: any) => {
    await updatestatus({ editId: idedi, status });
    await dispatch(getAll_Subscription({}) as any);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(currentPage) as any);
    dispatch(getAll_Subscription({}) as any);

    // dispatch(fetchUser({ modeid, SelectedRole }) as any);
  }, [dispatch, currentPage]);

  const stateUser: any = useSelector((state: any) => state.SubScriptions);
  console.log(stateUser, "stateUserstateUserstateUserstateUser");

  const reversedDataa = stateUser?.modes?.data?.data;



  const handleImageUpload = async (item: any, file: File) => {
    if (!file) return;

    const id = item._id;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tagId", id);

    setIsUploading(true); // Start loading

    try {
      const res = await dispatch(upload_Subscriptions_Images({ id, formData }) as any);
      dispatch(getAll_Subscription({}) as any);

      if (res.payload.isSuccess) {
        setPreviewImage(res.payload.imageUrl); // Update the preview image
        localStorage.setItem("uploadedImage", res.payload.imageUrl); // Persist the image
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentUploadId) {
      handleImageUpload(currentUploadId, file);
    }
  };

  const formik = useFormik({
    initialValues: {
      searchInput: "",
      name: "",
      Service: "",
      mode: "",
    },
    validationSchema: Yup.object().shape({
      gender: Yup.string()
        .required("Gender is required")
        .oneOf(["male", "female", "other"], "Invalid gender"),

    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("Form submitted with values:", values);
    },
  });

  const filteredData = Array.isArray(reversedDataa)
  ? reversedDataa.filter((f: any) =>
      f.name?.toLowerCase().includes(formik.values.searchInput.toLowerCase())
    )
  : [];

  const { items, requestSort, getClassNamesFor } = useSortableData(
    filteredData.reverse()
  );

  const handleSearch = (e: any) => {
    const inputValue = e.target.value;
    setSearcUser(inputValue);
    if (inputValue.trim() === "") {
      dispatch(getAll_Subscription({ SelectedPlan }) as any);
    } else {
      dispatch(fetchsearchUser(inputValue) as any);
    }
  };

  const handleFilter = () => {
    dispatch(searchUserbyAges(filterData) as any);
  };

  const calculateAge = (dobString: any) => {
    const today = new Date();
    const birthDate = new Date(dobString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1; // Alternative to age--
    }
    ;
    return age;
  };


  const PlanOptions = Array.isArray(PlanData)
  ? PlanData.map((item: Plan) => ({
      value: item?._id,
      text: item?.name
    }))
  : [];




  const ChangePlan = async (e: any) => {
    setSelectPlan(e.target.value)
    localStorage.setItem('roleid', e.target.value)

    //  image uploading -------------------




  }
  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
      <div className="row  justify-content-around">
        <div className="display-5 col-md-7 fw-bold my-3 ">Subscriptions</div>
        <div className="col-md-4">
          <FormGroup>
            <Label htmlFor="role">Change Subscriptions</Label>
            <Select
              id="plan"
              name="plan"
              ariaLabel="Plans"
              placeholder="Subscriptions"
              list={PlanOptions}
              onChange={ChangePlan}
              value={SelectedPlan}
            />
          </FormGroup>
        </div>
      </div>

      <SubHeader>
        <SubHeaderLeft>
          <label
            className="border-0 bg-transparent cursor-pointer me-0"
            htmlFor="searchInput"
          >
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search customer..."
            onChange={(e) => handleSearch(e)}
            value={searchUser}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          {/* <Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
            <DropdownToggle hasIcon={false}>
              <Button icon="FilterAlt" color="primary" isLight>
                Filter
              </Button>
            </DropdownToggle>
            <DropdownMenu isAlignmentEnd size="lg" isCloseAfterLeave={false}>
              <div className="container py-2">
                <form className="row g-3" onSubmit={formik.handleSubmit}>
                  <div className="col-12">
                    <FormGroup>
                      <Label htmlFor="minAge">Age</Label>
                      <InputGroup>
                        <Input
                          id="minAge"
                          name="minAge"
                          ariaLabel="Minimum age"
                          placeholder="Min."
                          onChange={handleFilterData}
                          value={filterData.minAge}
                        />
                        <InputGroupText>to</InputGroupText>
                        <Input
                          id="maxAge"
                          name="maxAge"
                          ariaLabel="Maximum age"
                          placeholder="Max."
                          onChange={handleFilterData}
                          value={filterData.maxAge}
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        id="gender"
                        name="gender"
                        ariaLabel="Gender"
                        placeholder="Gender Name"
                        list={[
                          { value: "male", text: "Male" },
                          { value: "female", text: "Female" },
                          { value: "other", text: "Other" },
                        ]}
                        onChange={handleFilterData}
                        value={filterData.gender}
                      />
                    </FormGroup>
                  </div>

                  <div className="col-6">
                    <Button
                      color="primary"
                      isOutline
                      className="w-100"
                      onClick={formik.resetForm}
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="col-6">
                    <Button
                      color="primary"
                      onClick={handleFilter}
                      className="w-100"
                      type="submit"
                    >
                      Filter
                    </Button>
                  </div>
                </form>
              </div>
            </DropdownMenu>
          </Dropdown> */}

          {/* <SubheaderSeparator /> */}
          <Button
            icon="PersonAdd"
            color="primary"
            isLight
            onClick={() => setEditModalStatus(true)}
          >
            New Subscriptions
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th
                        onClick={() => requestSort("name")}
                        // onClick={()=> {aaa(data, 'name', 'ascending')}}

                        className="cursor-pointer text-decoration-underline"
                      >
                        Name{" "}
                        <Icon
                          size="lg"
                          className={getClassNamesFor("name")}
                          icon="FilterList"
                        />
                      </th>
                      <th
                        onClick={() => requestSort("email")}
                        className="cursor-pointer text-decoration-underline"
                      >
                        Description
                        <Icon
                          size="lg"
                          className={getClassNamesFor("email")}
                          icon="FilterList"
                        />
                      </th>
                      {/* <th
                        onClick={() => requestSort("age")}
                        className="cursor-pointer text-decoration-underline"
                      >
                        Photo
                        <Icon
                          size="lg"
                          className={getClassNamesFor("age")}
                          icon="FilterList"
                        />
                      </th> */}
                      {/* <th
                        onClick={() => requestSort("role")}
                        className="cursor-pointer text-decoration-underline"
                      >
                        Mode
                        <Icon
                          size="lg"
                          className={getClassNamesFor("role")}
                          icon="FilterList"
                        />
                      </th> */}
                      <th
                        onClick={() => requestSort("gender")}
                        className="cursor-pointer text-decoration-underline"
                      >
                        {" "}
                        Services
                        <Icon
                          size="lg"
                          className={getClassNamesFor("gender")}
                          icon="FilterList"
                        />
                      </th>
                      {/* <th
                        onClick={() => requestSort("marital")}
                        className="cursor-pointer text-decoration-underline"
                      >
                        {" "}
                        Marital status
                        <Icon
                          size="lg"
                          className={getClassNamesFor("marital")}
                          icon="FilterList"
                        />
                      </th> */}
                      <th
                        onClick={() => requestSort("status")}
                        className="cursor-pointer text-decoration-underline"
                      >
                        {" "}
                        Status
                        <Icon
                          size="lg"
                          className={getClassNamesFor("status")}
                          icon="FilterList"
                        />
                      </th>
                      <th> Action</th>
                      {/* <th
												onClick={() => requestSort('balance')}
												className='cursor-pointer text-decoration-underline'>
												Gender
												<Icon
													size='lg'
													className={getClassNamesFor('balance')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('payout')}
												className='cursor-pointer text-decoration-underline'>
												Marital status{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('payout')}
													icon='FilterList'
												/>
											</th> */}
                      <td />
                    </tr>
                  </thead>
                  <tbody>
                    {reversedDataa &&
                      dataPagination(items, currentPage, perPage).map(
                        (itemss: any, index: any) => {
                          return (
                            <tr key={itemss?._id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0">
                                    <div
                                      className="ratio ratio-1x1 me-3"
                                      style={{ width: 48 }}
                                    >
                                      <div
                                        className={`bg-l${darkModeStatus ? "o25" : "25"
                                          }-${getColorNameWithIndex(
                                            index
                                          )} text-${getColorNameWithIndex(
                                            index
                                          )} rounded-2 d-flex align-items-center justify-content-center`}
                                      >
                                        {/* <span className="fw-bold">
                                            {getFirstLetter(itemss?.name)}
                                          </span> */}

                                        <span
                                          className="fw-bold"
                                          onClick={() => {
                                            if (fileInputRef.current) {
                                              setCurrentUploadId(itemss);
                                              fileInputRef.current.click();
                                            }
                                          }}
                                        >
                                          {itemss.avatar ? (
                                            <img src={`https://servicesapi.meander.software/${itemss.avatar}`} style={{ width: "50px", borderRadius: "15px" }} />
                                          ) : (
                                            getFirstLetter(itemss?.name)
                                          )}
                                        </span>
                                        <input
                                          type="file"
                                          ref={fileInputRef}
                                          style={{ display: "none" }}
                                          onChange={handleFileChange}
                                        />
                                      </div>

                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <div className="fs-6 fw-bold">
                                      {itemss?.name}
                                    </div>
                                    <div className="text-muted">
                                      {/* <Icon icon="MyLocation" />{" "} */}
                                      {/* <small>{itemss?.address}</small> */}
                                    </div>
                                  </div>
                                </div>
                              </td>


                              {/* <td>
                                <Button
                                  isLink
                                  color="light"
                                  icon="Email"
                                  className="text-lowercase"
                                  tag="a"
                                  href={`mailto:${itemss?.email}`}
                                >
                                  {itemss?.email}
                                </Button>
                              </td> */}
                              {/* <td> */}
                              {/* <p>{itemss?.age}</p> */}

                              {/* <p>{calculateAge(itemss?.dob) || "00"}</p> */}

                              {/* </td> */}
                              <td>{itemss?.description}</td>
                              <td>{itemss?.mode?.name}</td>
                              {/* <td>{itemss?.gender}</td> */}

                              {/* <td>{itemss?.marital}</td> */}
                              <td>
                                <Dropdown>
                                  <DropdownToggle hasIcon={false}>
                                    <Button
                                      isLink
                                    // color={item.status.color}
                                    // icon='Circle'
                                    // className="bn6"
                                    >
                                      {itemss?.is_activated === true ? (
                                        <span className="badge bg-success">
                                          Active
                                        </span>
                                      ) : (
                                        <span className="badge bg-secondary">
                                          Inactive
                                        </span>
                                      )}
                                    </Button>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    {Object.keys(ActiveUser).map((key) => (
                                      <DropdownItem key={key}>
                                        <div
                                          onClick={() =>
                                            handleStatus(
                                              itemss._id,
                                              ActiveUser[key].value
                                            )
                                          }
                                          onKeyDown={(e) => {
                                            if (
                                              e.key === "Enter" ||
                                              e.key === "Space"
                                            ) {
                                              handleStatus(
                                                itemss._id,
                                                ActiveUser[key].value
                                              );
                                            }
                                          }}
                                          role="button"
                                          tabIndex={0}
                                        >
                                          {ActiveUser[key].name}
                                        </div>
                                      </DropdownItem>
                                    ))}
                                  </DropdownMenu>
                                </Dropdown>
                              </td>
                              {/* <td>
								<select name="cars" id="cars" 
								         style={{
									            outline:'none',
												border:'none',
												backgroundColor:'transparent',
												padding:'5px',
												appearance: 'none', 
												color:`${itemss?.status === 'active'? 'green':'red'}`,
												fontSize:'18px'
												}}
												// value={itemss?.status}

												onChange={(e:any)=>handleStatus(e,itemss?._id)}
												>
											
                                                     {itemss?.status === 'active' ? (
            <>
                <option value="active" style={{ color: 'green' }}>
                    Active
                </option>
                <option value="inactive" style={{ color: 'red' }}>
                    Inactive
                </option>
            </>
        ) : (
            <>
                <option value="inactive" style={{ color: 'red' }}>
                    Inactive
                </option>
                <option value="active" style={{ color: 'green' }}>
                    Active
                </option>
            </>
        )}
                                   
    
                                     

                               </select>
								
							</td> */}
                              {/* <td>
								 <Icon
									 size='lg'
									 icon={`custom ${i.payout.toLowerCase()}`}
								 />{' '}
								 {i.payout}
							 </td> */}
                              <td>
                                <Dropdown>
                                  <DropdownToggle hasIcon={false}>
                                    <Button
                                      icon="MoreHoriz"
                                      color="dark"
                                      isLight
                                      shadow="sm"
                                      aria-label="More actions"
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu isAlignmentEnd>
                                    {/* <DropdownItem>
                                      <Button
                                        icon="Visibility"
                                        // isDisable
                                        tag="a"
                                        to={`/profile_management/view/${itemss._id}`}
                                        onClick={() => {
                                          const serializedData = JSON.stringify(
                                            itemss
                                          );

                                          // Save the serialized data to session storage
                                          sessionStorage.setItem(
                                            "Viewed_User_Data",
                                            serializedData
                                          );

                                          setViewUser(true)
                                          setViewdata(itemss);
                                        }}
                                      >
                                        View
                                      </Button>
                                    </DropdownItem> */}
                                    <DropdownItem>
                                      <Button
                                        icon="Edit"
                                        tag="a"
                                        // to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
                                        onClick={() => {
                                          setEditData(itemss);
                                          setEditModal(true);
                                          setEditId(itemss?._id);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <Button
                                        icon="Delete"
                                        tag="a"
                                        // to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
                                        onClick={() => {
                                          setDeleteModal(true);
                                          setDeleteid(itemss?._id);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </CardBody>
              {reversedDataa && (
                <PaginationButtons
                  data={items}
                  label="customers"
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              )}
            </Card>
          </div>
        </div>
      </Page>


      {<Add setIsOpen={setEditModalStatus} isOpen={editModalStatus} id="0" />}

      {editId && (
        <Edit_User
          setIsOpen={setEditModal}
          isOpen={editModal}
          editData={editData}
          editId={editId}
          id="0"
        />
      )}
      {deleteId && (
        <OrderDeleteModal
          setIsOpen={setDeleteModal}
          isOpen={deleteModal}
          deleteId={deleteId}
          id="0"
        />
      )}
    </PageWrapper>
  );
};

export default Plans;
