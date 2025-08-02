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
import { create_Service, getAll_Service } from "../../../redux/Slice/Services_Slice";

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

const AddServices: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
  const store = useSelector((statee: any) => statee);
  const role = store.role.roles.data ? store.role.roles.data : []
  const itemData = id
    ? data.filter((item) => item.id.toString() === id.toString())
    : {};
  const item = id && Array.isArray(itemData) ? itemData[0] : {};
  const modeid = localStorage.getItem("modeid");
  const [avatarFil, setAvatarFile] = useState<any>();
  const [isProfileUploaded, setisProfileUploaded] = useState<boolean>(false);
  const [intersetArray, setIntersetArray] = useState<any>([]);
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
  }, [dispatch, modeid]);


  for (let i = 20; i < 120; i += 1) {
    WeightArray.push(i);
  }


  const userValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Email is required"),
    // Category: Yup.string().required("Category is required"),
    // mode: Yup.string().required("mode is required"),
  });

  // -------------------------------

  const formik = useFormik({
    initialValues: {
      name: "",
      display_name: "",
      description: "",
      note: "",
      admin_note: "",
      mode: '',
      service:'',
      is_activated: true, // Assuming this is a boolean indicating activation status
    },

    validationSchema: userValidation,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      console.log("Form values:", values); // Log form values to ensure they are captured correctly
      setIsLoading(true)
      try {
        setErrorHandling(true);
        dispatch(create_Service({ values }) as any)
          .then(() => {
            console.log("Service created successfully."); // Log success message
          })
          .catch((error: any) => {
            console.error("Error creating service:", error); // Log error if createUser action fails
          });
      } catch (error) {
        console.error("Error submitting form:", error); // Log error if any other error occurs
      }
			setIsOpen(false);

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
              <FormGroup id="name" label="Name" className="col-md-6">
                <Input
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {errorHandling && formik.errors.name ? (
                  <div className="errorMassage">{formik.errors.name}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="display_name" label="Display Name" className="col-md-6">
                <Input
                  name="display_name"
                  onChange={formik.handleChange}
                  value={formik.values.display_name}
                />
                {errorHandling && formik.errors.display_name ? (
                  <div className="errorMassage">{formik.errors.display_name}</div>
                ) : (
                  <div />
                )}
              </FormGroup>
              <FormGroup id="description" label="Description" className="col-md-12">
                <Input
                  name="description"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />

                {errorHandling && formik.errors.description ? (
                  <div className="errorMassage">{formik.errors.description}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="note" label="Note" className="col-md-12">
                <Input
                  name="note"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.note}
                />
                {errorHandling && formik.errors.note ? (
                  <div className="errorMassage">{formik.errors.note}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              <FormGroup id="admin_note" label="Admin_note" className="col-md-12">
                <Input
                  name="admin_note"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.admin_note}
                />
                {errorHandling && formik.errors.admin_note ? (
                  <div className="errorMassage">{formik.errors.admin_note}</div>
                ) : (
                  <div />
                )}
              </FormGroup>


              <FormGroup id="mode" label="Mode" className="col-md-6">
                <select
                  id="mode"
                  className="form-select"
                  name="mode"
                  value={formik.values.mode}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    ...Select...
                  </option>
                  <option value="male">Male</option>

                </select>
                {errorHandling && formik.errors.mode ? (
                  <div className="errorMassage">{formik.errors.mode}</div>
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
                  <option value="male">Male</option>

                </select>
                {errorHandling && formik.errors.service ? (
                  <div className="errorMassage">{formik.errors.service}</div>
                ) : (
                  <div />
                )}
              </FormGroup>

              {/* <FormGroup
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
              </FormGroup> */}


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
AddServices.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddServices;
