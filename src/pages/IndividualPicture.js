import Frame from "../components/ui/Frame";
import Picture from "../components/Picture";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import HorizontalRule from "../components/ui/HorizontalRule";
import CaptionEditor from "../components/CaptionEditor";
import {AuthContext} from "../context/AuthContext";
import Caption from "../components/Caption";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    where
} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {collections} from "../constants";

function IndividualPicture() {
    const parms = useParams();
    const auth = useContext(AuthContext);
    const [metadata, setMetadata] = useState();
    const [captions, setCaptions] = useState();

    useEffect(() => {
        const loadPicture = async () => {
            const metadata = await getImageMetadata(parms.id)
            setMetadata(metadata);
        }

        const loadCaptions = async () => {
            const captions = await getCaptionsForPicture(parms.id)
            setCaptions(captions)
        }

        loadPicture();
        loadCaptions();
    }, [parms]);

    const getImageMetadata = async (id) => {
        const docsnap = await getDoc(doc(db, collections.images, id));
        if (docsnap.exists()) {
            return {...docsnap.data(), id: id}
        } else {
            return null;
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

    const updateCaption = (caption) => {
        const newData = [...captions];

        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === caption.id) {
                newData[i] = caption;
                const docRef = doc(db, collections.captions, caption.id);
                setDoc(docRef, caption);
            }
        }

        setCaptions(newData);
    }

    const captionEditor = auth && auth.user && metadata
        ? <CaptionEditor pictureId={metadata.id} userId={auth.user.uid}/>
        : ""

    const caps = captions
        ? captions.map(c => <Caption key={c.id} caption={c} user={auth.user} updateCaption={updateCaption}/> )
        : "";

    return (
        <Frame>
            {metadata ? <Picture imagePath={metadata.url} displayName={metadata.uploadedBy} alt={metadata.alt}/> : ""}
            <HorizontalRule/>
            {auth.user ? captionEditor : ""}
            {caps}
        </Frame>
    );
}

export default IndividualPicture;