import H2 from "../components/ui/H2";
import Frame from "../components/ui/Frame";
import Button from "../components/ui/Button";
import constants, {collections, pages} from "../constants";
import FileChooser from "../components/ui/FileChooser";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../firebase/firebase";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {toast} from "react-toastify";

function UploadPicture() {
    const [file, setFile] = useState();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const changeHandler = (fileData) => {
        setFile(fileData);
    }

    async function buildMetadata(filename, user, ref) {
        const url = await getDownloadURL(ref);
        return {
            image: filename,
            url: url,
            userId: user.uid,
            uploadedBy: user.displayName,
            alt: "User generated photo",
            timestamp: serverTimestamp()
        };
    }

    const saveImage = async (file, user) => {
        if (file) {
            const fileName = uuidv4();
            const fullPath = constants.storage_paths.IMAGES + fileName;

            const storageRef = ref(storage, fullPath);
            await uploadBytes(storageRef, file);
            const metadata = await buildMetadata(fullPath, user, storageRef);
            const docRef = await addDoc(collection(db, collections.images), metadata)
            if (docRef) {
                toast.success("File uploaded");
                return true;
            } else {
                toast.error("Upload failed");
                return false;
            }
        }
    }

    const handleUpload = async () => {
        if (file != null) {
            const result = await saveImage(file, authContext.user);
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