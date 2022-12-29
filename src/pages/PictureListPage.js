import Frame from "../components/ui/Frame";
import H2 from "../components/ui/H2";
import Picture from "../components/Picture";
import {useEffect, useState} from "react";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {collections} from "../constants";

function PictureListPage() {
    const [images, setImages] = useState([]);

    useEffect( () => {
        const loadImageMetadata = async () => {
            const metadata = await getAllImageMetadata();
            setImages(metadata);
        }

        loadImageMetadata();
    }, []);

    const getAllImageMetadata = async () => {
        const q = query(collection(db, collections.images)
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