import Frame from "../components/ui/Frame";
import H2 from "../components/ui/H2";
import sampleImage from "../samples/angel.jpg";
import sampleImage2 from "../samples/ride.jpg";
import Picture from "../components/Picture";

function PictureListPage() {

    return (
        <Frame>
            <H2>Captionator 5000</H2>
            <div className={"md:flex md:flex-row md:flex-wrap md:gap-5"}>
                    <Picture imagePath={sampleImage} displayName={"User McDisplayName"} thumbnail/>
                    <Picture imagePath={sampleImage2} displayName={"User McDisplayName"} thumbnail/>
                    <Picture imagePath={sampleImage} displayName={"User McDisplayName"} thumbnail/>
                    <Picture imagePath={sampleImage2} displayName={"User McDisplayName"} thumbnail/>
                    <Picture imagePath={sampleImage} displayName={"User McDisplayName"} thumbnail/>
                    <Picture imagePath={sampleImage2} displayName={"User McDisplayName"} thumbnail/>
            </div>
        </Frame>
    );
}

export default PictureListPage;