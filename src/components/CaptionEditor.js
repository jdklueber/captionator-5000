import StyledInput from "./ui/StyledInput";
import {useEffect, useState} from "react";
import Button from "./ui/Button";
import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {collections} from "../constants";

function buildNewCaptionObject(pictureId, userId, caption) {
    return {
        pictureId,
        userId,
        caption,
        upvotes: [],
        downvotes: []
    }
}
function CaptionEditor({initialCaption, pictureId, userId}) {
    const [captionBuffer, setCaptionBuffer] = useState(buildNewCaptionObject(pictureId, userId, ""));

    useEffect(() => {
        if (initialCaption) {
            setCaptionBuffer(initialCaption);
        }
    }, [initialCaption, pictureId, userId]);

    const onChange = (evt) => {
        const newData = {...captionBuffer};
        newData.caption = evt.currentTarget.value;
        setCaptionBuffer(newData);
    }

    const saveCaption =  async () => {
        if (captionBuffer && captionBuffer.id) {
            //Update Mode
            const docRef = doc(db, collections.captions, captionBuffer.id);
            setDoc(docRef, captionBuffer);
        } else {
            //Insert Mode
            captionBuffer.timestamp = serverTimestamp();
            await addDoc(collection(db, collections.captions), captionBuffer);
        }
        setCaptionBuffer(buildNewCaptionObject(pictureId, userId, ""))
    }

    return (
        <div>
            <StyledInput type={"text"}
                placeholder={"Enter a funny caption here"}
                onChange={onChange}
                value={captionBuffer.caption}
            />
            <Button label={"Save Caption"} onClick={saveCaption}/>
        </div>
    );
}

export default CaptionEditor;
