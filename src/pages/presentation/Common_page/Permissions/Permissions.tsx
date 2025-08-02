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

import { getColorNameWithIndex } from "../../../../common/data/enumColors";
// import {IPermission} from "../../../../common/data/permissionDummyData"
import useDarkMode from "../../../../hooks/useDarkMode";
// import add_user_management from './ADD'

import permissionsData from "../../../../common/data/permissionDummyData";

import showNotification from "../../../../components/extras/showNotification";
import { fetchRoles } from "../../../../redux/Slice/role_Slice";
import EditModal from "./Edit";
import Addmodal from "./Add";
import DeleteModal from "./Delete";
import { tr } from "date-fns/locale";

type Role = "super_admin" | "admin" | "finance_admin" | "service_admin";

type Permission = {
  menu: string;
  roles: Role[];
};

const Roles = () => {
  const { darkModeStatus } = useDarkMode();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT["10"]);
  const Login_RoleData = JSON.parse(localStorage.getItem("RoleData") as any)
  const [editId, setEditId] = useState<any>('')
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>('')
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteid] = useState<any>("");

  const [moodeId, setMoodeId] = useState(localStorage.getItem("modeid") || "");

  //  const Store: any = useSelector((state: any) => state.role);
  //   const roleid = Store?.roles?.data?.data;
  // const [roleeId, setRoleeId] = useState(localStorage.getItem("roleid") || "");

  const dispatch = useDispatch();
  const stateUser: any = useSelector((state: any) => state.role);
  const roleData = stateUser?.roles?.data?.data;
  console.log(roleData, "check roledata for permissions")
  const formik = useFormik({
    initialValues: {
      searchInput: "",
      payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
      minPrice: "",
      maxPrice: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {

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
  const [permissions, setPermissions] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchRoles({ modeid: moodeId }) as any);
  }, [dispatch, moodeId]);

  useEffect(() => {
    if (roleData && Array.isArray(roleData)) {
      setPermissions(roleData);
      console.log("dddddddd:", roleData);
    }
  }, [roleData]);

  const permissionKeys = Array.from(
    new Set(
      permissions.flatMap((role: any) =>
        role.permissions ? Object.keys(role.permissions) : []
      )
    )
  );

  const permissionValues = permissions.flatMap((role: any) =>
    role.permissions ? Object.values(role.permissions) : []
  );

  console.log(permissionValues, "permissionValuespermissionValues");


  // const handleToggle = (roleIndex: number, permissionKey: string) => {
  //   setPermissions((prevPermissions) =>
  //     prevPermissions.map((role, index) =>
  //       index === roleIndex
  //         ? {
  //           ...role,
  //           permissions: {
  //             ...role.permissions,
  //             [permissionKey]: !role.permissions[permissionKey], // Toggle True/False
  //           },
  //         }
  //         : role
  //     )
  //   );
  // };

  const displayedRoles = permissions.slice(0, 4);
  const handleToggle = (roleIndex: number, permissionKey: any, actionType: any) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((role, index) =>
        index === roleIndex
          ? {
            ...role,
            permissions: {
              ...role.permissions,
              [permissionKey]: {
                ...role.permissions[permissionKey],
                [actionType]: !role.permissions[permissionKey][actionType], // Toggle read/write/delete
              },
            },
          }
          : role
      )
    );
  };





  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
      <div className="row">
        <div className="col-md-8">

          <span className="display-5 fw-bold my-3 mx-3 ">Permissions</span>
        </div>
        {/* {Login_RoleData?.name !== "Default Admin" ?
          <div className="col-md-4 my-3">

            <Button
              icon='PersonAdd'
              color='primary'
              isLight
              onClick={() => setEditModalStatus(true)}>
              Add	New
            </Button>
          </div> : <></>} */}
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
                        Name{" "}
                        <Icon
                          size="lg"
                          className={getClassNamesFor("name")}
                          icon="FilterList"
                        />
                      </th>
                      {/* {Array.isArray(roleData) &&
                        roleData.slice(0, 4).map((itemss: any, index: number) => ( */}
                      {displayedRoles.map((role, index) => (
                        <th key={index}>{role?.name}</th>
                      ))}
                      {/* {Login_RoleData?.name !== "Default Admin" ? <th>Active</th> : null} */}
                      <td />
                    </tr>

                  </thead>
                  <tbody>
                    {Array.isArray(permissionKeys) &&
                      permissionKeys.map((permKey: any, index: number) => (
                        <tr key={index}>
                          <th>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <div className="ratio ratio-1x1 me-3" style={{ width: 48 }}>
                                  <div
                                    className={`bg-l${darkModeStatus ? "o25" : "25"
                                      }-${getColorNameWithIndex(index)} text-${getColorNameWithIndex(
                                        index
                                      )} rounded-2 d-flex align-items-center justify-content-center`}
                                  >
                                    <span className="fw-bold">
                                      {getFirstLetter(permKey)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="fs-6 fw-bold">{permKey}</div>
                                <div className="text-muted">
                                  <Icon icon="Label" /> <small>{permKey?.is_activated}</small>
                                </div>
                              </div>
                            </div>
                          </th>

                          {displayedRoles.map((role: any, roleIndex: number) => (
                            // <tr key={roleIndex}>
                              <td key={`${roleIndex}-${index}`}>
                                  {["read", "write", "delete"].map((action)=> (
                                  <div key={action} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                                    {/* Capitalized permission name */}
                                    <span style={{ minWidth: "60px", fontWeight: "bold" }}>
                                      {action.charAt(0).toUpperCase() + action.slice(1)}:
                                    </span>

                                    {/* Dropdown button */}
                                    <Dropdown>
                                      <DropdownToggle hasIcon={false}>
                                        <Button
                                         key={action}
                                         className={`badge ${
                                           role.permissions[permKey]?.[action] ? "bg-success" : "bg-secondary"
                                         }`}
                                         onClick={() => handleToggle(roleIndex, permKey, action)}
                                        >
                                           {/* {action.charAt(0).toUpperCase() + action.slice(1)} */}
                                           {role.permissions?.[permKey]?.[action] ? "True" : "False"}
                                        </Button>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <></>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </div>
                                ))}
                              </td>
                            // </tr>
                          ))
                          }


                          {/* {Login_RoleData?.name !== "Default Admin" && (
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
                                  <DropdownItem>
                                    <Button
                                      icon="Edit"
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
                          )} */}
                        </tr>



                      ))}
                  </tbody>

                </table>
              </CardBody>
              <PaginationButtons
                data={Array.isArray(permissionKeys) ? permissionKeys : []}
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

export default Roles;

