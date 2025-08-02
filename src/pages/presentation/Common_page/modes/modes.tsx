import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../../../layout/PageWrapper/PageWrapper";
import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
  SubheaderSeparator,
} from "../../../../layout/SubHeader/SubHeader";
import Page from "../../../../layout/Page/Page";
import { demoPagesMenu } from "../../../../menu";
import Card, { CardBody } from "../../../../components/bootstrap/Card";
import { getFirstLetter, priceFormat } from "../../../../helpers/helpers";
import data from "../../../../common/data/dummyCustomerData";
import PaginationButtons, {
  dataPagination,
  PER_COUNT,
} from "../../../../components/PaginationButtons";
import Button from "../../../../components/bootstrap/Button";
import Icon from "../../../../components/icon/Icon";
import Input from "../../../../components/bootstrap/forms/Input";
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "../../../../components/bootstrap/Dropdown";
import FormGroup from "../../../../components/bootstrap/forms/FormGroup";
import Checks, {
  ChecksGroup,
} from "../../../../components/bootstrap/forms/Checks";
import PAYMENTS from "../../../../common/data/enumPaymentMethod";
import useSortableData from "../../../../hooks/useSortableData";
import InputGroup, {
  InputGroupText,
} from "../../../../components/bootstrap/forms/InputGroup";
import Popovers from "../../../../components/bootstrap/Popovers";
// import CustomerEditModal from './CustomerEditModal';
import { getColorNameWithIndex } from "../../../../common/data/enumColors";
import useDarkMode from "../../../../hooks/useDarkMode";
// import add_user_management from './ADD'

import {
  fetchUser,
  fetchsearchUser,
} from "../../../../redux/Slice/UserManagement_slice";
import { all_mode_with_Admins, fetchModes } from "../../../../redux/Slice/Modes_Slice";
import showNotification from "../../../../components/extras/showNotification";
import Addmodal from "./Add";
import EditModal from "./Edit";
import DeleteModal from "./Delete";
// import { Auth_Login_With_Modes } from "../../../../redux/Slice/AuthSlice";
import Spinner from "../../../../components/bootstrap/Spinner";

const Modes = () => {
  const { darkModeStatus } = useDarkMode();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT["10"]);
 
	const Login_RoleData =JSON.parse(localStorage.getItem("RoleData") as any)
	const [isLoading, setIsLoading] = useState<boolean>(false);

  const [editId, setEditId] = useState<any>('')
	const [editModal, setEditModal] = useState<boolean>(false);
	const [editData, setEditData] = useState<any>('')
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteid] = useState<any>("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchModes({}) as any);
    dispatch(all_mode_with_Admins({}) as any);

  }, [dispatch]);

  const stateUser: any = useSelector((state: any) => state.mode);
  const modesData = stateUser?.modes?.data?.data;
  const modesDatas = stateUser?.modesWithAdmin?.data
console.log(modesData);


  const formik = useFormik({
    initialValues: {
      searchInput: "",
      payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
      minPrice: "",
      maxPrice: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const filteredData = data.filter(
    (f) =>
      // Name
      f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
      // Price
      (formik.values.minPrice === "" ||
        f.balance > Number(formik.values.minPrice)) &&
      (formik.values.maxPrice === "" ||
        f.balance < Number(formik.values.maxPrice)) &&
      // Payment Type
      formik.values.payment.includes(f.payout)
  );
  const { items, requestSort, getClassNamesFor } = useSortableData(
    filteredData
  );

  
  const storedModeId = localStorage.getItem("modeid");
  


  // const modeChange =async (itemss:any) => {
 
  //   setIsLoading(true)
    
  //   const res = await dispatch(Auth_Login_With_Modes({modeID:itemss?._id})as any)
 
    
  //   if (res?.payload) {
  //     localStorage.setItem('facit_authUsername',res?.payload?.fullname)
  //     localStorage.setItem('login',JSON.stringify(res?.payload))
  //     localStorage.setItem('roleid',res?.payload?.role?._id)
  //     localStorage.setItem('RoleData',JSON.stringify(res?.payload?.role))
  //     localStorage.setItem("modeid", itemss?._id);
  //     // localStorage.setItem("categoryId",itemss?.id);
  //   setIsLoading(false)
  //   showNotification(
  //     <span className="d-flex align-items-center">
  //       <Icon
  //         icon="Info"
  //         size="lg"
  //         className="me-1"
  //       />
  //       <span> {itemss?.name} Mode Active</span>
  //     </span>,
  //     `The ${itemss?.name}  details have been successfully updated.`
  //   );
  //     window.location.reload();

  //     // handlemode(itemss?._id);
 
  // }
  // else {
  //   showNotification(
  //     <span className="d-flex align-items-center">
  //       <Icon
  //         icon="Info"
  //         size="lg"
  //         className="me-1"
  //       />
  //       <span> {itemss?.name} Not change</span>
  //     </span>,
  //     `Try again`
  //   );
  // }
  // }

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
 
<div className="row">
  <div className="col-md-8">



<span className="display-5 fw-bold my-3 mx-3 ">Mode Management</span>
  </div>

  <div className="col-md-4 my-3">
  {Login_RoleData?.name !== "Default Admin" ? 
<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						New Mode
					</Button>:<></>}
              </div>
              </div>
     
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
                        className="cursor-pointer text-decoration-underline"
                      >
                        Mode Name{" "}
                        <Icon
                          size="lg"
                          className={getClassNamesFor("name")}
                          icon="FilterList"
                        />
                      </th>
                      <th>Note</th>
                      <th>Admin Name</th>

                      <th>Change Mode</th>
                      {Login_RoleData?.name !== "Default Admin" ? 
                      <th>Action</th>:null}


                      <td />
                    </tr>
                  </thead>
                  <tbody>
                    {modesData?.map((itemss: any, index: any) => {
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
                                    className={`bg-l${
                                      darkModeStatus ? "o25" : "25"
                                    }-${getColorNameWithIndex(
                                      index
                                    )} text-${getColorNameWithIndex(
                                      index
                                    )} rounded-2 d-flex align-items-center justify-content-center`}
                                  >
                                    <span className="fw-bold">
                                      {getFirstLetter(itemss?.name ?? "")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="fs-6 fw-bold">
                                  {itemss?.name}
                                </div>
                                <div className="text-muted">
                                  <Icon icon="Label" />{" "}
                                  <small>{itemss?.is_activated}</small>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td> {itemss?.description}</td>
                          <td> {itemss?.note}</td>
                    
                          <td className="ms-5">
                          {isLoading ? (
														<>
                            	<Spinner isSmall inButton isGrow /> <p>Loading....</p></>
														):
                            
                            <input
                            className="ms-5"
                              style={{ color: "green" }}
                              type="radio"
                              id="html"
                              name="fav_language"
                              // onChange={()=>modeChange(itemss)}
                              value="HTML"
                              checked={
                                itemss?._id === localStorage.getItem("modeid")
                              }
                            />}
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
																		icon='Edit'
																		tag='a'
																		// to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
																		onClick={() => {
																			setEditData(itemss)
																			setEditModal(true)
																			setEditId(itemss?._id)
																		}
																		}
																	>
																		Edit
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Delete'
																		tag='a'
                                    // isDisable
																		// to={`../${demoPagesMenu.crm.subMenu.customerID.path}/${i.id}`}
																		onClick={() => {
																			setDeleteModal(true)
																			setDeleteid(itemss?._id)
																		}
																		}
																	>
																		Delete
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>  
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
              {modesData && (
              <PaginationButtons
                data={modesData || []}
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
      {<Addmodal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />}
			{editId && <EditModal setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId} id="0" />}
      {deleteId && (
        <DeleteModal
          setIsOpen={setDeleteModal}
          isOpen={deleteModal}
          deleteId={deleteId}
          id="0"
        />
      )}
    </PageWrapper>
  );
};

export default Modes;
