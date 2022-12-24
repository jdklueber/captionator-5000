import React from "react";
import {db, storage} from "../firebase/firebase";
import {collection, addDoc, serverTimestamp, query, orderBy, getDocs} from "firebase/firestore";
import constants from "../constants";
import {v4 as uuidv4} from "uuid";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {toast} from "react-toastify";

const DataContext = React.createContext();
const collections = {
    images: "images",
    users: "users",
    admins: "admins"

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
            result.push(doc.data());
        })

        return result;
    }

    const dataObj = {
        saveImage,
        getAllImageMetadata
    }

    return (
        <DataContext.Provider value={dataObj}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
export {DataContext}