import H2 from "../components/ui/H2";
import Frame from "../components/ui/Frame";
import Button from "../components/ui/Button";
import constants, {pages} from "../constants";
import FileChooser from "../components/ui/FileChooser";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {DataContext} from "../context/Data";
import {useNavigate} from "react-router-dom";

function UploadPicture() {
    const [file, setFile] = useState();
    const dataContext = useContext(DataContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const changeHandler = (fileData) => {
        setFile(fileData);
    }

    const handleUpload = async () => {
        console.log(dataContext)
        if (file != null) {
            const result = await dataContext.saveImage(file, authContext.user);
            if (result) {
                setFile(null);
                navigate(pages.HOME);
            }
        }
    }

    return (
        <Frame>
            <H2>Upload A Picture</H2>
            <FileChooser label={"Select File"} fileHandlerCallback={changeHandler}/>
            <Button value="file" label={"Save"} style={constants.buttons.GREEN} onClick={handleUpload}/>
        </Frame>
    );
}

export default UploadPicture;