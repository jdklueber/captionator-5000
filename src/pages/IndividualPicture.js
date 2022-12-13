import Frame from "../components/ui/Frame";
import sampleImage from "../samples/angel.jpg";
import HorizontalRule from "../components/ui/HorizontalRule";
import Caption from "../components/Caption";
import Picture from "../components/Picture";

function IndividualPicture() {
    return (
        <Frame>
            <Picture imagePath={sampleImage} displayName={"User McDisplayName"}/>
            <HorizontalRule/>
            <Caption caption={"This is a caption"} score={10}/>
            <Caption caption={"This one sucked"} score={-100}/>
            <Caption caption={"This one is new"} score={0}/>
        </Frame>
    );
}

export default IndividualPicture;