import {collection, deleteDoc, doc, getDocs, orderBy, query, where} from "firebase/firestore";
import {db, storage} from "../firebase/firebase";
import {deleteObject} from "firebase/storage"
import {collections, pages} from "../constants";
import TrashIcon from "./ui/TrashIcon";
import {ref} from "firebase/storage";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function DeletePicture({image}) {
    const navigate = useNavigate();
    const handleDelete = () => {
        const imageDoc = doc(db, collections.images, image.id);
        const fileRef = ref(storage, image.image);
        navigate(pages.HOME);

        deleteObject(fileRef)
            .catch((error) => toast.error(error.message));

        const q = query(collection(db, collections.captions), where("pictureId", "==", image.id)
            , orderBy("timestamp", "desc")
        );
        getDocs(q).then((snap) => {
            const docs = [];
            snap.forEach((d) => {
                docs.push(doc(db, collections.captions, d.id));
            });
            docs.map(d => deleteDoc(d)
                .catch(e => toast.error(e.message))
            );
        });

        deleteDoc(imageDoc).then(() => toast.success("Picture deleted"));
    }

    return (
        <span onClick={handleDelete}>
            <TrashIcon/>
        </span>
    );
}

export default DeletePicture;