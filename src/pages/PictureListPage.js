import Frame from "../components/ui/Frame";
import H2 from "../components/ui/H2";
import Picture from "../components/Picture";
import {useEffect, useState} from "react";
import {collection, orderBy, query, onSnapshot} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {collections} from "../constants";

function PictureListPage() {
    const [images, setImages] = useState([]);

    useEffect( () => {
        const q = query(collection(db, collections.images)
            , orderBy("timestamp", "desc")
        );

        return onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((snap) => {
                    const doc = snap.data();
                    doc.id = snap.id;
                    return doc;
                }
            )
            setImages(newData);
        });

    }, []);



    return (
        <Frame>
            <H2>Captionator 5000</H2>
            <div className={"md:flex md:flex-row md:flex-wrap md:gap-5"}>
                {images.map(i => <Picture pictureId={i.id} key={i.id} imagePath={i.url} displayName={i.uploadedBy} thumbnail/>)}
            </div>
        </Frame>
    );
}

export default PictureListPage;