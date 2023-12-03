import './styles.css'
import React, {useEffect, useState} from "react";
import {editUserInformation, fetchUserInformation} from "../apiCalls";
import {useUser} from "../components/UserContext";
import {Button, TextField,} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";
import {SaveAlt} from "@mui/icons-material";

const Settings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentlyEditingField, setCurrentlyEditingField] = useState(null);
    const [currentlyLoadingField, setCurrentlyLoadingField] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const {currentUser} = useUser();

    const fetchAndSetUserInfo = async () => {
        setIsLoading(true);
        const fetchedUserInfo = await fetchUserInformation(currentUser.uid);
        console.log("fetchedUserInfo", fetchedUserInfo)
        if (fetchedUserInfo) {
            setUserInfo(fetchedUserInfo);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchAndSetUserInfo().then(r => console.log("r", r));
    }, []);


    const handleEdit = async (editedContent, fieldId) => {
        console.log("editedContent", editedContent);
        console.log("fieldId", fieldId);
        setCurrentlyLoadingField(fieldId);
        const newUserData = {
            ...userInfo,
            [fieldId]: editedContent
        }
        const result = await editUserInformation(currentUser.uid, newUserData);
        if (result) {
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                [fieldId]: editedContent
            }));
        }
        setCurrentlyLoadingField(null);
        setCurrentlyEditingField(null);
    };

    return (
        (!isLoading) ?
            <div className="settingsWrapper">
                <h1>My Information</h1>
                <List className="myInformationWrapper">
                    <MyInformationRow fieldId={"email"} title={"Email Address"} content={userInfo.email}/>
                    <Divider/>
                    <MyInformationRow fieldId={"organizationName"} title={"Organization Name"}
                                      content={userInfo.organizationName} isEditable={true}
                                      currentlyEditingField={currentlyEditingField}
                                      setCurrentlyEditingField={setCurrentlyEditingField}
                                      handleEdit={handleEdit}
                    />
                </List>
            </div> : <div>Loading...</div>
    )
}

const MyInformationRow = ({
                              fieldId,
                              title,
                              content,
                              isEditable,
                              currentlyEditingField,
                              setCurrentlyEditingField,
                              handleEdit,
                              currentlyLoadingField
                          }) => {
    const [editedContent, setEditedContent] = useState(content);
    return (
        <div className="myInformationRow">
            <p>{title}</p>
            {
                currentlyLoadingField === fieldId
                    ? <div>Loading...</div>
                    : currentlyEditingField === title
                        ? <div style={{display: "flex", alignContent: "center"}}>
                            <TextField id="outlined-basic" defaultValue={content} onChange={(event) => {
                                setEditedContent(event.target.value);
                            }}></TextField>
                            <Button onClick={() => {
                                handleEdit(editedContent, fieldId)
                            }}>Save</Button>
                            <Button onClick={() => {
                                setCurrentlyEditingField(null)
                            }}>Cancel</Button>
                        </div>
                        : (<div style={{display: "flex", flexDirection: "row"}}>
                            <p>{content}</p>
                            {(isEditable)
                                ? <Button onClick={() => {
                                    setCurrentlyEditingField(title)
                                }}><EditIcon/></Button>
                                : <></>
                            }</div>)
            }
        </div>
    );
}


export default Settings