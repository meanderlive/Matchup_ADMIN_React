import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../../../layout/PageWrapper/PageWrapper";
import Button from "../../../../components/bootstrap/Button";
import Card, { CardBody } from "../../../../components/bootstrap/Card";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "../../../../components/bootstrap/Dropdown";
import Spinner from "../../../../components/bootstrap/Spinner";
import {

  getAll_Tag_SubCategorys,
  upload_tag_Images,
} from "../../../../redux/Slice/Tag_Slice  ";
import PaginationButtons, {
  dataPagination,
  PER_COUNT,
} from "../../../../components/PaginationButtons";
import { Auth_Login_With_Modes } from "../../../../redux/Slice/AuthSlice";
import showNotification from "../../../../components/extras/showNotification";
import Addmodal from "./AddTag";
import EditTagModal from "./Tag_Edit";
import DeleteModal from "./Delete";
import { getColorNameWithIndex } from "../../../../common/data/enumColors";
import useDarkMode from "../../../../hooks/useDarkMode";
// import { Icon } from "../../../../components/icon/Icon";
import { getAll_Tag_categorys } from "../../../../redux/Slice/Tag_Category_Slice ";
import { getFirstLetter } from "../../../../helpers/helpers";
import useSortableData from "../../../../hooks/useSortableData";


const ServicesRole = () => {
  const { darkModeStatus } = useDarkMode();
  const dispatch = useDispatch();
  const [currentUploadId, setCurrentUploadId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<any>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);
  const [editId, setEditId] = useState<any>(null);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT["10"]);


  useEffect(() => {
    dispatch(getAll_Tag_categorys({}) as any);
    dispatch(getAll_Tag_SubCategorys({}) as any);

    // Load stored image from local storage
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setPreviewImage(storedImage);
    }
  }, [dispatch]);



  const stateSubcategory: any = useSelector((state: any) => state.Tag);
  // const SUBCategoryData = stateSubcategory?.modes?.data;
  const SUBCategoryData = Array.isArray(stateSubcategory?.modes?.data?.data) ? stateSubcategory.modes.data?.data : [];

  console.log(SUBCategoryData, "ioioioio");

  const handleImageUpload = async (item: any, file: File) => {
    if (!file) return;

    const id = item._id;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tagId", id);

    setIsUploading(true);
    setPreviewImage(URL.createObjectURL(file)); // Immediate preview

    try {
      const res = await dispatch(upload_tag_Images({ id, formData }) as any);
    dispatch(getAll_Tag_SubCategorys({}) as any);

      if (res.payload.isSuccess) {
        localStorage.setItem("uploadedImage", res.payload.imageUrl);
        setPreviewImage(res.payload.imageUrl); // Update preview after upload success
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false); // Hide loading indicator
    }
  };

  const formik = useFormik({
		initialValues: {
			searchInput: '',
			// payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});


  const filteredData = SUBCategoryData ? SUBCategoryData.filter((f: any) =>
		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) 
	) : [];
	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData.reverse());

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file && currentUploadId) {
  //     handleImageUpload(currentUploadId, file);
  //   }
  // };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentUploadId) {
      await handleImageUpload(currentUploadId, file);
      // You can add any additional logic here that should run after the upload is complete
    }
  };

  return (
    <PageWrapper title="Tags">
      <div className="row">
        <div className="col-md-8">
          <span className="display-5 fw-bold my-3 mx-3">Tags</span>
        </div>
        <div className="col-md-4 my-3">
          <Button
            icon='PersonAdd'
            color='primary'
            isLight
            onClick={() => setEditModalStatus(true)}>
            New Tag
          </Button>
        </div>
      </div>

      <Card stretch>
        <CardBody isScrollable className="table-responsive">
          <table className="table table-modern table-hover">
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>Tags Name</th>
                <th>Discription</th>
                <th>Tag Category</th>
                <th> Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {SUBCategoryData && dataPagination(items, currentPage, perPage).map((item: any, index: any) => (
                <tr key={item?._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="ratio ratio-1x1 me-3" style={{ width: 48 }}>
                          <div className={`bg-l${darkModeStatus ? "o25" : "25"}-${getColorNameWithIndex(index)} text-${getColorNameWithIndex(index)} rounded-2 d-flex align-items-center justify-content-center`}>
                            <span
                              className="fw-bold"
                              onClick={() => {
                                if (fileInputRef.current) {
                                  setCurrentUploadId(item);
                                  fileInputRef.current.click();
                                }
                              }}
                            >
                              {item?.avatar ? (
                                <img src={`https://servicesapi.meander.software/${item.avatar}`} style={{ width: "50px", borderRadius: "15px" }} />
                              ) : (
                                getFirstLetter(item?.name)
                              )}
                            </span>
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </div>
                          {isUploading && <Spinner isSmall />}

                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fs-6 fw-bold">{item?.name}</div>
                        <div className="text-muted">
                          <small>{item?.is_activated}</small>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item?.description}</td>
                  <td> {item?.tagcategories_ids[0]?.name || ""}</td>

                  <td>
                    {item?.mode?.name}
                  </td>
                  <td>
                    <Dropdown>
                      <DropdownToggle hasIcon={false}>
                        <Button icon='MoreHoriz' color='dark' isLight shadow='sm' aria-label='More actions' />
                      </DropdownToggle>
                      <DropdownMenu isAlignmentEnd>
                        <DropdownItem>
                          <Button
                            icon='Edit'
                            onClick={() => {
                              setEditData(item);
                              setEditModal(true);
                              setEditId(item?._id);
                            }}
                          >
                            Edit
                          </Button>
                        </DropdownItem>
                        <DropdownItem>
                          <Button
                            icon='Delete'
                            onClick={() => {
                              setDeleteModal(true);
                              setDeleteId(item?._id);
                            }}
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
        {SUBCategoryData &&<PaginationButtons
          data={items || []}
          label="Tags"
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          perPage={perPage}
          setPerPage={setPerPage}
        />}
      </Card>

      {<Addmodal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />}
      {editId && <EditTagModal setIsOpen={setEditModal} isOpen={editModal} editData={editData} editId={editId} id="0" />}
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

export default ServicesRole;

