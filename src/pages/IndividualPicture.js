import Frame from "../components/ui/Frame";
import Picture from "../components/Picture";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../context/Data";
import HorizontalRule from "../components/ui/HorizontalRule";
import CaptionEditor from "../components/CaptionEditor";
import {AuthContext} from "../context/AuthContext";
import Caption from "../components/Caption";

function IndividualPicture() {
    const parms = useParams();
    const db = useContext(DataContext);
    const auth = useContext(AuthContext);
    const [metadata, setMetadata] = useState();
    const [captions, setCaptions] = useState();

    useEffect(() => {
        const loadPicture = async () => {
            const metadata = await db.getImageMetadata(parms.id)
            setMetadata(metadata);
        }

        const loadCaptions = async () => {
            const captions = await db.getCaptionsForPicture(parms.id)
            setCaptions(captions)
        }

        loadPicture();
        loadCaptions();
    }, [parms, db])

    const captionEditor = auth && auth.user && metadata
        ? <CaptionEditor pictureId={metadata.id} userId={auth.user.uid}/>
        : ""

    const caps = auth && auth.user && captions
        ? captions.map(c => <Caption caption={c}/> )
        : "";

    return (
        <Frame>
            {metadata ? <Picture imagePath={metadata.url} displayName={metadata.uploadedBy} alt={metadata.alt}/> : ""}
            <HorizontalRule/>
            {captionEditor}
            {caps}
            {/*<Caption caption={"This is a caption"} score={10}/>*/}
            {/*<Caption caption={"This one sucked"} score={-100}/>*/}
            {/*<Caption caption={"This one is new"} score={0}/>*/}
        </Frame>
    );
}

export default IndividualPicture;