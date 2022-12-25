/* eslint-disable */ // This is a scratch file that will never be executed
// pictures collection

const picture = {
    image: "filename",
    url: "url",
    userId: "user.uid",
    uploadedBy: "user.displayName",
    alt: "User generated photo",
    timestamp: "serverTimestamp()"
};

// Queries

// Most Recent Pictures (paginated)
// query(collection(db, "pictures"), orderBy("timestamp", "desc"), limit(10));  //Initial query
// query(collection(db, "pictures"), orderBy("timestamp", "desc"), limit(10), startAfter(last_picture_document));

// All pictures for a user
// query(collection(db, "pictures"), where("userId", "==", userId), orderBy("timestamp", "desc"), limit(10));  //Initial query
// query(collection(db, "pictures"), where("userId", "==", userId), orderBy("timestamp", "desc"), limit(10), startAfter(last_picture_document));

// captions collection
// eslint-disable-next-line no-unused-vars
const caption = {
    id: "",
    pictureId: "",
    userId: "",
    caption: "",
    votes: []
}

// eslint-disable-next-line no-unused-vars
const vote = {
    id: "",
    pictureId: "",
    captionId: "",
    userId: "",
    isUpVote: ""
}

// Queries

// All captions for one picture
// query(collection(db, "captions"), where("pictureId", "==", pictureId), orderBy("timestamp", "desc"), limit(100));  //Initial query
// query(collection(db, "captions"), where("pictureId", "==", pictureId), orderBy("timestamp", "desc"), limit(100), startAfter(last_caption_document));

// All captions for a user
// query(collection(db, "captions"), where("userId", "==", userId), orderBy("timestamp", "desc"), limit(100));  //Initial query
// query(collection(db, "captions"), where("userId", "==", userId), orderBy("timestamp", "desc"), limit(100), startAfter(last_caption_document));

