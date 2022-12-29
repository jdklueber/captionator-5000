import {useNavigate} from "react-router-dom";
import {pages} from "../constants";

const fullSize = "max-h-96";
const thumbnailSize = "w-fit md:max-w-xs"
function Picture({imagePath, displayName, thumbnail, alt, pictureId}) {
    const size = thumbnail ? thumbnailSize : fullSize;
    const navigate = useNavigate();

    const clickHandler = () => {
        if (pictureId) {
            navigate(pages.PICTURE + "/" + pictureId)
        }
    }

    return (
        <div className={"my-5"} onClick={clickHandler}>
            <img className={`${size} mx-auto`} src={imagePath} alt={alt}/>
            <div className={`text-sm mx-auto ${size} italic mt-2`}>Uploaded by {displayName}</div>
        </div>
    );
}

export default Picture;