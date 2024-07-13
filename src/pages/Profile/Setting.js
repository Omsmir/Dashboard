import { Box, Typography, useMediaQuery, Paper,Card ,CardMedia,CardContent, Badge as MiBadge} from "@mui/material";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect, useContext, useRef,createContext } from "react";
import {  Descriptions, Divider,Badge } from "antd";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { FuncContext } from "../../components/PrimaryPage";
import { DrawerItem } from "./ListComponent";
import {
  Toast,
  Tag,
  Tooltip,
  Button,
  ProgressBar,
  FileUpload,
} from "primereact";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc} from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import "../../css/userProfile.css";

const MainContext = createContext()
const Settings = () => {
  const [ButtonState,SetButtonState] = useState(false)
  const [user] = useAuthState(auth);

  const storage = getStorage();

  const storageRef = ref(storage, "UsersImages/" + user?.uid);

  const [Image, SetImages] = useState("");

  const DownloadImage = async () => {
    try {
      await getDownloadURL(storageRef).then((url) => {
        SetImages(url);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MainContext.Provider value={{Image,SetImages,DownloadImage,ButtonState,SetButtonState}}>
    <motion.section
      className="Account"
      id="Account"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <DrawerItem component={<SettingComponent />} />
    </motion.section>
    </MainContext.Provider>
  );
};

// Specific File Uploader Setting In Profile Section
const FileUploadComponent = () => {
  const MediaMed = useMediaQuery("(max-width:767px)");

  const toast = useRef(null);

  const [totalSize, setTotalSize] = useState(0);

  const fileUploadRef = useRef(null);

  const {  SetButtonState,DownloadImage} = useContext(MainContext)


  const [user] = useAuthState(auth);

  const UploadFilesToFireBase = (e) => {
    const storage = getStorage();

    const storageRef = ref(storage, "UsersImages/" + user?.uid);

    const metadata = {
      contentType: "image/jpeg",
    };

    const myFile = e.files[0];


    uploadBytes(storageRef, myFile, metadata)
      .then(() => {
        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: "Please Click The Change Button",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.code,
        });
      }).finally(() =>{
        DownloadImage()
        SetButtonState(true)

      })


    e.options.clear();
  };

  
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };
  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          {MediaMed ? (
            ""
          ) : (
            <span className="flex flex-column text-left ml-3">
              {file.name}
              <small>{new Date().toLocaleDateString()}</small>
            </span>
          )}
        </div>
        {MediaMed ? (
          ""
        ) : (
          <Tag
            value={props.formatSize}
            severity="warning"
            className="px-3 py-2"
          />
        )}
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined rounded-pill p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          {MediaMed ? "Choose Picture To Upload": "Drag and Drop Image Here"}
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success rounded-pill p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger rounded-pill p-button-outlined",
  };

  return (
    <Box>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        customUpload
        uploadHandler={UploadFilesToFireBase}
        name="demo[]"
        url="/gs://cart-61241.appspot.com/UsersImages"
        accept="image/*"
        maxFileSize={1000000}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </Box>
  );
};

const SettingComponent = () => {
  const isMediumScreen = useMediaQuery("(max-width:998px)");

  const [user] = useAuthState(auth);

  const { Image, ButtonState,SetButtonState} = useContext(MainContext)


  const {getUsersFromCollection,userEmail,userImage } = useContext(FuncContext)


  const visible = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1 },
  };




  const sendEmailVerify = async () => {
    try{
      await sendEmailVerification(user).then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })

    }
    catch(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    }
  }

  const addImageToUserCollection = async () => {
    try {
      const RolesReference = doc(db, "usersCollection/", user?.uid);

      await updateDoc(RolesReference, {
        photoURL: Image,
      });
      getUsersFromCollection()
      SetButtonState(false)
    } catch (err) {
      console.log(err);
    } finally {
      Swal.fire({
        icon: "success",
        title: "Picture Changed Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };


return (
<motion.div
      variants={{ hidden: { opacity: 0, y: -50 }, visible }}
    >
      <Container fluid>
        <Row className="my-3">
          <Col xs={12}>
            <Typography component="h4">Settings</Typography>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{ marginBottom: isMediumScreen ? "1rem" : 0 }}>
            <Paper className="UserDetails">
              <Container fluid>
                <Row>
                  <Col lg={6} xs={12}>
                    <Card sx={{ display: 'flex' }} className="UserProfileCard">
                      <CardMedia
                        component="img"
                        className="rounded-pill"
                        sx={{ width: 151, height: 151, maxWidth: 151, maxHeight: 151 }}
                        image={userImage[0]}
                        alt="Profile Picture"
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto',  }} className={isMediumScreen && "px-0" }>
                          <Typography component="h4">
                            {user?.displayName}
                          </Typography>
                          <Typography variant="subtitle1" className="UserEmail" color="text.secondary">
                            <Typography component="h6">{userEmail}</Typography>
                            {user?.emailVerified
                              ? <MiBadge sx={{ marginLeft: 4 }} color="success" badgeContent="Verified" />
                              : <MiBadge sx={{ marginLeft: 6 }} className="DangerBadge" badgeContent="Not Verified" />}
                          </Typography>
                          {ButtonState
                            ? <Badge dot><Button onClick={addImageToUserCollection}>Change Picture</Button></Badge>
                            : <Badge><Button disabled>Change Picture</Button></Badge>}
                        </CardContent>
                      </Box>
                    </Card>
                    <Divider />
                    <Box className="UserAdditional">
                      <Descriptions title="User Info">
                        <Descriptions.Item label="IsEmailVerified">
                          {user?.emailVerified
                            ? <p className="text-success fw-bold">Verified</p>
                            : <p className="text-danger fw-bold">Not Verified</p>}
                        </Descriptions.Item>
                        {!user?.emailVerified && (
                          <Descriptions.Item className="d-flex justify-content-end">
                            <Button className="VerifyEmail" onClick={sendEmailVerify}>Verify Email</Button>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Box>
                  </Col>
                  <Col lg={6} xs={12}>
                    <FileUploadComponent />
                  </Col>
                </Row>
              </Container>
              <Divider />
              <Box className="UserAdditional">
                <Descriptions title="User Info">
                  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                  <Descriptions.Item label="Role">User</Descriptions.Item>
                  <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                  </Descriptions.Item>
                </Descriptions>
              </Box>
            </Paper>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Settings;
