import SolidThumbsUp from "@heroicons/react/24/solid/esm/HandThumbUpIcon";
import SolidThumbsDown from "@heroicons/react/24/solid/esm/HandThumbDownIcon";
import OutlineThumbsUp from "@heroicons/react/24/outline/esm/HandThumbUpIcon";
import OutlineThumbsDown from "@heroicons/react/24/outline/esm/HandThumbDownIcon";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import DeleteCaption from "./DeleteCaption";
function Caption({caption, user, updateCaption}) {
    const authContext = useContext(AuthContext);

    const upvote = () => {
        const newCaption = {...caption};

        if (newCaption.downvotes) {
            newCaption.downvotes = newCaption.downvotes.filter(c => c !== user.uid); //Get rid of a prior downvote
        } else{
            newCaption.downvotes = []; //Just in case it didn't get set up before
        }

        if (newCaption.upvotes) {
            if (newCaption.upvotes.filter(c => c === user.uid).length === 0) {
                newCaption.upvotes.push(user.uid);
            }
        } else {
            newCaption.upvotes = [user.uid]
        }

        updateCaption(newCaption);
    }

    const downvote = () => {
        const newCaption = {...caption};
        if (newCaption.upvotes) {
            newCaption.upvotes = newCaption.upvotes.filter(c => c !== user.uid); //Get rid of a prior upvote
        } else{
            newCaption.upvotes = []; //Just in case it didn't get set up before
        }

        if (newCaption.downvotes) {
            if (newCaption.downvotes.filter(c => c === user.uid).length === 0) {
                newCaption.downvotes.push(user.uid);
            }
        } else {
            newCaption.upvotes = [user.uid]
        }

        updateCaption(newCaption);
    }

    const unvoteUpvote = () => {
        const newCaption = {...caption};
        if (newCaption.upvotes) {
            newCaption.upvotes = newCaption.upvotes.filter(c => c !== user.uid); //Get rid of a prior upvote
        }
        updateCaption(newCaption);
    }

    const unvoteDownvote = () => {
        const newCaption = {...caption};
        if (newCaption.downvotes) {
            newCaption.downvotes = newCaption.downvotes.filter(c => c !== user.uid); //Get rid of a prior upvote
        }
        updateCaption(newCaption);
    }

    let upVoteIcon = <OutlineThumbsUp onClick={upvote} className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>

    if (caption.upvotes && caption.upvotes.filter(e => e === user.uid).length > 0) {
        upVoteIcon = <SolidThumbsUp onClick={unvoteUpvote} className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
    }

    let downVoteIcon = <OutlineThumbsDown onClick={downvote} className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
    if (caption.downvotes && caption.downvotes.filter(e => e === user.uid).length > 0) {
        downVoteIcon = <SolidThumbsDown onClick={unvoteDownvote} className="h-6 w-6 text-blue-500 inline ml-4 cursor-pointer"/>
    }


    const votingActions = <span>{downVoteIcon} {upVoteIcon}</span>

    const score = caption && caption.upvotes && caption.downvotes ?
        caption.upvotes.length - caption.downvotes.length
        : 0;

    return (
        <div className={"my-2 flex flex-row justify-between"}>
            <span className={"mr-5 text-xl"}>
                {authContext.isAdmin || authContext.user.uid === caption.userId ?
                    <span className={"mr-5 cursor-pointer"}><DeleteCaption caption={caption}/></span>
                    : ""}
                {caption.caption}
            </span>
            <span>
                <span>
                    <span className={"italic"}>({score})</span>
                </span>

                {user ? votingActions : ""}

            </span>
        </div>
    );
}

export default Caption;