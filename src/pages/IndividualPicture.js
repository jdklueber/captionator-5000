import Frame from "../components/ui/Frame";
import Picture from "../components/Picture";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../context/Data";

function IndividualPicture() {
    const parms = useParams();
    const db = useContext(DataContext);
    const [metadata, setMetadata] = useState()

    useEffect(() => {
        const loadPicture = async () => {
            const metadata = await db.getImageMetadata(parms.id)
            setMetadata(metadata);
        }

        loadPicture()
    }, [parms, db])

    return (
        <Frame>
            {metadata ? <Picture imagePath={metadata.url} displayName={metadata.uploadedBy} alt={metadata.alt}/> : ""}
            {/*<HorizontalRule/>*/}
            {/*<Caption caption={"This is a caption"} score={10}/>*/}
            {/*<Caption caption={"This one sucked"} score={-100}/>*/}
            {/*<Caption caption={"This one is new"} score={0}/>*/}
        </Frame>
    );
}

export default IndividualPicture;