const constants = {
    oauth: {
        SIGN_UP: "signup",
        SIGN_IN: "signin",
        FORGOT_PASSWORD: "forgotpassword"
    },
    buttons: {
        GREEN: "green",
        RED: "red",
        BLUE: "blue",
        PLAIN: "plain"
    },
    storage_paths: {
        IMAGES: "images/"
    }
};

const pages = {
    HOME: "/",
    UPLOAD: "/upload",
    PICTURE: "/picture",
    PROFILE: "/profile",
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
    FORGOT_PASSWORD: "/forgot-password"
}

const collections = {
    images: "images",
    users: "users",
    admins: "admins",
    captions: "captions"

}
export default constants;
export {pages, collections};