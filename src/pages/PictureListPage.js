import Frame from "../components/ui/Frame";
import H2 from "../components/ui/H2";
import Picture from "../components/Picture";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../context/Data";

function PictureListPage() {
    const data = useContext(DataContext);
    const [images, setImages] = useState([]);

    useEffect( () => {
        const loadImageMetadata = async () => {
            const metadata = await data.getAllImageMetadata();
            setImages(metadata);
        }

        loadImageMetadata();
    }, [data]);

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