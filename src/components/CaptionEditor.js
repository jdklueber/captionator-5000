import StyledInput from "./ui/StyledInput";
import {useContext, useEffect, useState} from "react";
import Button from "./ui/Button";
import {DataContext} from "../context/Data";

function buildNewCaptionObject(pictureId, userId, caption) {
    return {
        pictureId,
        userId,
        caption,
        votes: []
    }
}
function CaptionEditor({initialCaption, pictureId, userId}) {
    const [captionBuffer, setCaptionBuffer] = useState(buildNewCaptionObject(pictureId, userId, ""));
    const db = useContext(DataContext)

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

    const saveCaption = () => {
        db.saveCaption(captionBuffer);
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
