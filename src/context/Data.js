import React from "react";
import {db, storage} from "../firebase/firebase";
import {collection, doc, addDoc, serverTimestamp, query, orderBy, getDocs, getDoc, setDoc, where} from "firebase/firestore";
import constants from "../constants";
import {v4 as uuidv4} from "uuid";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {toast} from "react-toastify";

const DataContext = React.createContext();
const collections = {
    images: "images",
    users: "users",
    admins: "admins",
    captions: "captions"

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

function DataProvider({children}) {
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

    const getAllImageMetadata = async () => {
        const q = query(collection(db, collections.images)
            , orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
            const m = doc.data();
            m.id = doc.id;
            result.push(m);
        })

        return result;
    }

    const getImageMetadata = async (id) => {
        const docsnap = await getDoc(doc(db, collections.images, id));
        if (docsnap.exists()) {
            return {...docsnap.data(), id: id}
        } else {
            return null;
        }
    }

    const saveCaption = async (captionData) => {
        if (captionData && captionData.id) {
            //Update Mode
            const docRef = doc(db, collections.captions, captionData.id);
            setDoc(docRef, captionData);
        } else {
            //Insert Mode
            captionData.timestamp = serverTimestamp();
            await addDoc(collection(db, collections.captions), captionData);
        }
    }

    const getCaptionsForPicture = async (pictureId) => {
        const q = query(collection(db, collections.captions), where("pictureId", "==", pictureId)
            , orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
            const m = doc.data();
            m.id = doc.id;
            result.push(m);
        })

        return result;

    }

    const dataObj = {
        saveImage,
        getAllImageMetadata,
        getImageMetadata,
        saveCaption,
        getCaptionsForPicture
    }

    return (
        <DataContext.Provider value={dataObj}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
export {DataContext}