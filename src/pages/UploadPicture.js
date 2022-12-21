import H2 from "../components/ui/H2";
import Frame from "../components/ui/Frame";
import Button from "../components/ui/Button";
import constants from "../constants";
import FileChooser from "../components/ui/FileChooser";
import {useState} from "react";
import {storage} from "../firebase/firebase";
import {ref, uploadBytes} from "firebase/storage"
import {toast} from "react-toastify";

function UploadPicture() {
    const [file, setFile] = useState();

    const changeHandler = (fileData) => {
        setFile(fileData);
    }

    const handleUpload = () => {
        if (file != null) {
            const storageRef = ref(storage, 'images/testfile.png');
            uploadBytes(storageRef, file).then(() => {
                toast.success("File uploaded!!")
            });
        }
    }

    return (
        <Frame>
            <H2>Upload A Picture</H2>
            <FileChooser label={"Select File"} fileHandlerCallback={changeHandler}/>
            <Button label={"Save"} style={constants.buttons.GREEN} onClick={handleUpload}/>
        </Frame>
    );
}

export default UploadPicture;