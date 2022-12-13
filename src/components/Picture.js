const fullSize = "w-fit";
const thumbnailSize = "w-fit md:max-w-xs"
function Picture({imagePath, displayName, thumbnail, alt}) {
    const size = thumbnail ? thumbnailSize : fullSize;

    return (
        <div className={"my-5"}>
            <img className={`${size} mx-auto`} src={imagePath} alt={alt}/>
            <div className={`text-sm mx-auto ${size} italic mt-2`}>Uploaded by {displayName}</div>
        </div>
    );
}

export default Picture;