import TrashIcon from "./ui/TrashIcon";
import {db} from "../firebase/firebase";
import {doc, deleteDoc} from "firebase/firestore";
import {collections} from "../constants";

function DeleteCaption({caption}) {
    const handleDelete = () => {
        const captionDoc = doc(db, collections.captions, caption.id);
        deleteDoc(captionDoc);
    }

    return (
        <span onClick={handleDelete}>
            <TrashIcon/>
        </span>
    );
}

export default DeleteCaption;