import HandThumbUpIcon from "@heroicons/react/24/solid/esm/HandThumbUpIcon";
import HandThumbDownIcon from "@heroicons/react/24/solid/esm/HandThumbDownIcon";
function Caption({caption, user}) {
    const votingActions = <span>
                            <HandThumbDownIcon className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
                            <HandThumbUpIcon className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
                        </span>

    return (
        <div className={"my-2 flex flex-row justify-between"}>
            <span className={"mr-5 text-xl"}>{caption.caption}</span>

            <span>
                <span>
                    <span className={"italic"}>(+10)</span>
                </span>

                {user ? votingActions : ""}
            </span>
        </div>
    );
}

export default Caption;