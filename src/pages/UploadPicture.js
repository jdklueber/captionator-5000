import H2 from "../components/ui/H2";
import Frame from "../components/ui/Frame";
import StyledInput from "../components/ui/StyledInput";
import Button from "../components/ui/Button";
import constants from "../constants";

function UploadPicture() {
    return (
        <Frame>
            <H2>Upload A Picture</H2>
            <StyledInput type="file" className={"file:border-green-900 file:p-2 file:rounded-2xl file:bg-slate-100" +
                " file:drop-shadow-2xl file:mr-5 mb-10"}/>
            <Button label={"Save"} style={constants.buttons.GREEN}/>
        </Frame>
    );
}

export default UploadPicture;