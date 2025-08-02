import React, { useState, useEffect, useMemo } from "react";
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
import { dashboardPagesMenu, demoPagesMenu } from "../../../../menu";
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
import { Auth_Login_With_Modes } from "../../../../redux/Slice/AuthSlice";
import Spinner from "../../../../components/bootstrap/Spinner";
import { getAll_Tag_categorys, getbyID_Tag_Categorys } from "../../../../redux/Slice/Tag_Category_Slice ";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { darkModeStatus } = useDarkMode();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT["10"]);

  const Login_RoleData = JSON.parse(localStorage.getItem("RoleData") as any)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [editId, setEditId] = useState<any>('')
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>('')
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteid] = useState<any>("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchModes({}) as any);
    dispatch(getAll_Tag_categorys({}) as any);
    // dispatch(getbyID_Tag_Categorys({ ID: id }) as any);
    // dispatch(all_mode_with_Admins({}) as any);

  }, [dispatch]);

  // const stateCategory: any = useSelector((state: any) => state.TagCategory);
  // // const CategoryData = stateCategory?.modes?.data
  // const CategoryData = Array.isArray(stateCategory?.modes?.data?.data) ? stateCategory.modes.data?.data : [];

  const stateCategory: any = useSelector((state: any) => state.TagCategory);

  const CategoryData = useMemo(() => {
    return Array.isArray(stateCategory?.modes?.data?.data)
      ? stateCategory.modes.data.data
      : [];
  }, [stateCategory]);  

  const Tag_CategoryData = stateCategory?.modes?.data?.data?.[0]?._id || 'Default Value';
  const id = Tag_CategoryData;

  const stateUser: any = useSelector((state: any) => state.mode);
  const modesData = stateUser?.modes?.data;
  // const modesDatas = stateUser?.modesWithAdmin?.data
  console.log(Tag_CategoryData)

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

  // const storedCategoryId = localStorage.getItem("categoryid")

  const defaultCatId = CategoryData
    ?._id;
  localStorage.setItem("TagCatID", defaultCatId);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(localStorage.getItem("Tagcatid") || null);

  // Fetch categories data...
  
  useEffect(() => {
    // Set selectedCategoryId from localStorage if exists
    const storedCategoryId = localStorage.getItem("Tagcatid");
    if (storedCategoryId) {
      setSelectedCategoryId(storedCategoryId);
    }
  }, [CategoryData]); // Only run if CategoryData changes

  const handleCategoryChange = async (categoryId: string) => {
    setIsLoading(true);
    try {
      const res = await dispatch(getbyID_Tag_Categorys({ id: categoryId }) as any);
      
      if (res?.payload) {
        localStorage.setItem("Tagcatid", categoryId);
        setSelectedCategoryId(categoryId);
        showNotification(
          <span className="d-flex align-items-center">
            <span>Category changed to {res.payload.name}</span>
          </span>,
          `Successfully changed to ${res.payload.name}`
        );
        window.location.reload();
      } else {
        const errorMessage = res?.error?.message || "Failed to change category. Please try again.";
        showNotification(
          <span className="d-flex align-items-center">
            <span>Error changing category: {errorMessage}</span>
          </span>,
          "Try again"
        );
      }
    } catch (error :any) {
      showNotification(
        <span className="d-flex align-items-center">
          <span>Error changing category: {error.message}</span>
        </span>,
        "Try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const modeChange = async (itemss: any) => {

    setIsLoading(true)

    const res = await dispatch(getbyID_Tag_Categorys({ id: itemss?._id }) as any)


    if (res?.payload) {
      localStorage.setItem('facit_authUsername', res?.payload?.fullname)
      localStorage.setItem('login', JSON.stringify(res?.payload))
      localStorage.setItem('roleid', res?.payload?.role?._id)
      localStorage.setItem('RoleData', JSON.stringify(res?.payload?.role))
      localStorage.setItem("modeid", itemss?._id);
      // localStorage.setItem("categoryid",res?.payload?.Ctag?._id)
      setIsLoading(false)
      // showNotification(
      //   <span className="d-flex align-items-center">
      //     <Icon
      //       icon="Info"
      //       size="lg"
      //       className="me-1"
      //     />
      //     <span> {itemss?.name} Service Active</span>
      //   </span>,
      //   `The ${itemss?.name}  details have been successfully updated.`
      // );
      window.location.reload();

      // handlemode(itemss?._id);

    }
    else {

    }

  }

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>

      <div className="row">
        <div className="col-md-8">



          <span className="display-5 fw-bold my-3 mx-3 "> Tag Categories</span>
        </div>

        <div className="col-md-4 my-3">
          {Login_RoleData?.name !== "Default Admin" ?
            <Button
              icon='PersonAdd'
              color='primary'
              isLight
              onClick={() => setEditModalStatus(true)}>
              New Service Category
            </Button> : <></>}
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
                        Tag Category Name{" "}
                        <Icon
                          size="lg"
                          className={getClassNamesFor("name")}
                          icon="FilterList"
                        />
                      </th>
                      <th>Note</th>
                      {/* <th>Admin Name</th> */}
                      {/* here be change the tag category */}
                      {/* <th>Tag Categories</th> */}
                      {Login_RoleData?.name !== "Default Admin" ?
                        <th>Action</th> : null}


                      <td />
                    </tr>
                  </thead>
                  <tbody>
                    {CategoryData?.map((item: any, index: any) => {
                      return (
                        <tr key={item?._id}>
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
                                    <span className="fw-bold">
                                      {getFirstLetter(item?.name)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="fs-6 fw-bold">
                                  {item?.name}
                                </div>
                                <div className="text-muted">
                                  <Icon icon="Label" />{" "}
                                  <small>{item?.is_activated}</small>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td> {item?.description}</td>
                          {/* <td> {item?.fullname}</td> */}

                          {/* <td className="ms-5">
                            {isLoading ? (
														<>
                            	<Spinner isSmall inButton isGrow /> <p>Loading....</p></>
														):
                            
                           }
                          </td> */}
                            {/* <td className="ms-5">
      {isLoading ? (
        <Spinner isSmall inButton isGrow />
      ) : (
        <select
          className="form-select form-select-sm"
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategoryId || ''} // Controlled component
        >
          <option value="" disabled>Select a category</option>
          {CategoryData.map((category: any) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </td> */}

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
                                      setEditData(item)
                                      setEditModal(true)
                                      setEditId(item?._id)
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
                                      setDeleteid(item?._id)
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
              <PaginationButtons
                data={CategoryData || []}
                label="customers"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
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

export default Services;

