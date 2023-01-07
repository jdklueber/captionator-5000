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
    onSnapshot,
    orderBy,
    query,
    setDoc,
    where
} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {collections} from "../constants";

function scoreCaption(caption) {
    return caption && caption.upvotes && caption.downvotes ?
        caption.upvotes.length - caption.downvotes.length
        : 0;
}
function captionSortFn(a,b) {
    const aScore = scoreCaption(a);
    const bScore = scoreCaption(b);
    if (aScore > bScore) return 1;
    if (aScore < bScore) return -1;
    return 0;
}

function IndividualPicture() {
    const parms = useParams();
    const auth = useContext(AuthContext);
    const [metadata, setMetadata] = useState();
    const [captions, setCaptions] = useState();

    useEffect(() => {
        const id = parms.id;
        const loadPicture = async () => {
            const docsnap = await getDoc(doc(db, collections.images, id));
            if (docsnap.exists()) {
                setMetadata({...docsnap.data(), id: id});
            } else {
                return null;
            }
        }
        loadPicture();
    }, [parms]);

    useEffect(() => {
        const id = parms.id;
        const q = query(collection(db, collections.captions), where("pictureId", "==", id)
            , orderBy("timestamp", "desc")
        );

        return onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((snap) => {
                    const doc = snap.data();
                    doc.id = snap.id;
                    return doc;
                }
            )
            newData.sort(captionSortFn).reverse();
            setCaptions(newData);
        });
    }, [parms]);



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
            <div className={"transition-all duration-200 ease-in-out"}>
                {metadata ? <Picture metadata={metadata} imagePath={metadata.url} displayName={metadata.uploadedBy} alt={metadata.alt}/> : ""}
                <HorizontalRule/>
                {auth.user ? captionEditor : ""}
                {caps}
            </div>
        </Frame>
    );
}

export default IndividualPicture;