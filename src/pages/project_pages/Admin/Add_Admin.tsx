import React, { FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useField, useFormik } from "formik";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../../../components/bootstrap/Modal";
import data from "../../../common/data/dummyCustomerData";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Input from "../../../components/bootstrap/forms/Input";
import img from "../../../assets/img/user6.png";
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from "../../../components/bootstrap/Card";
import Button from "../../../components/bootstrap/Button";
import Label from "../../../components/bootstrap/forms/Label";
import Checks, {
  ChecksGroup,
} from "../../../components/bootstrap/forms/Checks";
import PAYMENTS from "../../../common/data/enumPaymentMethod";
import {
  createUser,
  fetchUser,
} from "../../../redux/Slice/UserManagement_slice";
import Avatar from "../../../components/Avatar";
import Select from "../../../components/bootstrap/forms/Select";
import Wizard, { WizardItem } from "../../../components/Wizard";
import { getAllInterest } from "../../../redux/Slice/IntersetSlice";
import { fetchRoles } from "../../../redux/Slice/role_Slice";
import getAllroles from "../../../redux/Api/role";
import { getAll_Service } from "../../../redux/Slice/Services_Slice";

interface IPreviewItemProps {
  title: string;
  value: any | any[];
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
  return (
    <>
      <div className="col-3 text-end">{title}</div>
      <div className="col-9 fw-bold">{value || "-"}</div>
    </>
  );
};
interface ICustomerEditModalProps {
  id: string;
  isOpen: boolean;
  setIsOpen(...args: unknown[]): unknown;
}

const Add: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
  const store = useSelector((state: any) => state);
  const role = store.role.roles.data?.data ? store.role.roles.data?.data : []
  const itemData = id
    ? data.filter((item) => item.id.toString() === id.toString())
    : {};
  const item = id && Array.isArray(itemData) ? itemData[0] : {};
  const modeid = localStorage.getItem("modeid");
  const [avatarFil, setAvatarFile] = useState<any>();
  const [isProfileUploaded, setisProfileUploaded] = useState<boolean>(false);
  const [intersetArray, setIntersetArray] = useState<any>([]);
  const Service_Data = store.Service.services?.data?.data
  console.log("new4387423",Service_Data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const dispatch = useDispatch();
  const [errorHandling, setErrorHandling] = useState(false);
  const heightArray = [];
  for (let i = 3; i <= 6.6; i += 0.1) {
    heightArray.push(parseFloat(i.toFixed(1)));
  }

  const WeightArray = [];


  useEffect(() => {
    dispatch(fetchRoles(modeid) as any);
      dispatch(getAll_Service("") as any)
  }, [dispatch, modeid]);


  for (let i = 20; i < 120; i += 1) {
    WeightArray.push(i);
  }


  const userValidation = Yup.object().shape({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),


    password: Yup.string().required("Password is required"),

    role: Yup.string().required("Role is required"),

    contact_number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  // -------------------------------

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      dob: "", // Should be in the format "YYYY-MM-DDTHH:MM:SS.MSSZ"
      gender: "", // Assuming it's either "Male" or "Female" or "Other"
      mode: modeid, // Example: "modeid"
      role: "", // Example: "iAm" or "looking"
      service:"",
      contact_number: "",
      default_admin: true,
      is_activated: true, // Assuming this is a boolean indicating activation status
    },

    validationSchema: userValidation,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async(values) => {
      setIsLoading(true);
      setErrorHandling(true);
      console.log("Form values:", values); // Log form values to ensure they are captured correctly
      try {
        // dispatch(createUser({ values, avatarFil }) as any)
        //   .then(() => {
        //     console.log("User created successfully."); // Log success message
        //   })
        //   .catch((error: any) => {
        //     console.error("Error creating user:", error); // Log error if createUser action fails
        //   });
         const response = await dispatch(createUser({ values, avatarFil }) as any)
        
                if (response?.payload?.statusCode === 400) {
                  console.error("Validation Error:", response.payload.message);
                  alert(`Error: ${response.payload.message.join(", ")}`);
                } else {
                  await  dispatch(fetchUser({ modeid }) as any);
                  console.log("Service created successfully.");
                  setIsOpen(false);
                }
      } catch (error) {
        console.error("Error submitting form:", error); // Log error if any other error occurs
      } finally {
        // dispatch(fetchUser({ modeid }) as any);
        setIsOpen(false);
        setIsLoading(false);
        showNotification(
          <span className="d-flex align-items-center">
            <Icon icon="Info" size="lg" className="me-1" />
            <span>Added Successfully</span>
          </span>,
          "User has been Added successfully"
        );
      }
    },
  });
  const [ApiTrue, setApiTrue] = useState(false);
  const handleAvatarChang = (e: any) => {
    setApiTrue(true);

    console.log(e.target.files[0]);
    setAvatarFile(e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      setisProfileUploaded(true);
      setAvatarFile(e.target.files[0]);
    }
  };
  const handleActiveInteset = (idd: any) => {
    const data2 = intersetArray.includes(idd);
    if (data2) {
      const updatedArray = intersetArray.filter((item2: any) => item2 !== idd);
      setIntersetArray(updatedArray);
    } else {
      setIntersetArray([...intersetArray, idd]);
      formik.setFieldValue("interest", intersetArray);
    }
  };

  if (id || id === "0") {
    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="lg"
        titleId={id.toString()}
      >
        <ModalHeader setIsOpen={setIsOpen} className="p-4">
          <ModalTitle id={id}>{item?.name || "New User"}</ModalTitle>
        </ModalHeader>
        <ModalBody className="px-4 user-modal-body">
          <form onSubmit={formik.handleSubmit} >
            <div className="row g-4 align-items-center" style={{}}>
              <FormGroup id="fullname" label="Name" className="col-md-6">
                <Input
                  name="fullname"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                {errorHandling && formik.errors.fullname ? (
                  <div className="errorMassage">{formik.errors.fullname}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="email" label="Email" className="col-md-6">
                <Input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                {errorHandling && formik.errors.email ? (
                  <div className="errorMassage">{formik.errors.email}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="password" label="Password" className="col-md-12">
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {errorHandling && formik.errors.password ? (
                  <div className="errorMassage">{formik.errors.password}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="dob" label="Birthday" className="col-md-6">
                <Input
                  name="dob"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                />
                {errorHandling && formik.errors.dob ? (
                  <div className="errorMassage">{formik.errors.dob}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="gender" label="Gender" className="col-md-6">
                <select
                  id="gender"
                  className="form-select"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    ...Select...
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errorHandling && formik.errors.gender ? (
                  <div className="errorMassage">{formik.errors.gender}</div>
                ) : (
                  <div />
                )}
              </FormGroup>



              <FormGroup id="role" label="Role" className="col-md-6">
                <select
                  id="role"
                  className="form-select"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    ...Select...
                  </option>
                  {Array.isArray(role) &&
                    role.map((Roleitem: any, index: any) => {

                      return <option value={Roleitem?._id} key={Roleitem?._id}>{Roleitem?.name}</option>


                    })}

                </select>
                {errorHandling && formik.errors.gender ? (
                  <div className="errorMassage">{formik.errors.gender}</div>
                ) : (
                  <div />
                )}
              </FormGroup>
              <FormGroup id="service" label="Service" className="col-md-6">
                <select
                  id="service"
                  className="form-select"
                  name="service"
                  value={formik.values.service}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    ...Select...
                  </option>
                  {Array.isArray(Service_Data) &&
                    Service_Data.map((items: any, index: number) => (
                      <option key={index} value={items._id}>
                        {items.name}
                      </option>
                    ))}

                </select>
                {errorHandling && formik.errors.gender ? (
                  <div className="errorMassage">{formik.errors.gender}</div>
                ) : (
                  <div />
                )}
              </FormGroup>


              <FormGroup
                id="contact_number"
                label="Phone No *"
                className="col-md-6"
              >
                <Input
                  name="contact_number"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.contact_number}
                />
                {errorHandling && formik.errors.contact_number ? (
                  <div className="errorMassage">
                    {formik.errors.contact_number}
                  </div>
                ) : (
                  <div />
                )}
              </FormGroup>


              <FormGroup
                id="is_activated"
                label="Is Activated"
                className="col-md-12"
              >
                <select
                  id="is_activated"
                  className="form-select"
                  name="is_activated"
                  value={formik.values.is_activated as any}
                  onChange={formik.handleChange}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                {errorHandling && formik.errors.is_activated ? (
                  <div className="errorMassage">{formik.errors.is_activated}</div>
                ) : (
                  <div />
                )}
              </FormGroup>
              <FormGroup
                id="default_admin"
                label="Default Admin"
                className="col-md-12"
              >
                <select
                  id="default_admin"
                  className="form-select"
                  name="default_admin"
                  value={formik.values.default_admin as any}
                  onChange={formik.handleChange}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                {errorHandling && formik.errors.default_admin ? (
                  <div className="errorMassage">{formik.errors.default_admin}</div>
                ) : (
                  <div />
                )}
              </FormGroup>
              <div className="col-md-12 text-center ">
                <Button
                  type="submit"
                  color="info"
                  className="col-6  "
                  onClick={() => {
                    formik.handleSubmit() as any;
                    setErrorHandling(true);
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
  return null;
};
Add.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Add;
