import HandThumbUpIcon from "@heroicons/react/24/solid/esm/HandThumbUpIcon";
import HandThumbDownIcon from "@heroicons/react/24/solid/esm/HandThumbDownIcon";
function Caption({caption, score}) {
    return (
        <div className={"my-2 flex flex-row justify-between"}>
            <span className={"mr-5 text-xl"}>{caption}</span>

            <span>
                <span>
                    <span className={"italic"}>({score})</span>
                </span>
                <span>
                    <HandThumbDownIcon className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
                    <HandThumbUpIcon className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
                </span>
            </span>
        </div>
    );
}

export default Caption;