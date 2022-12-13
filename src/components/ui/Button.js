import constants from "../../constants";

function Button({label, onClick, style, className}) {
    let style_classes = "bg-green-600 text-white border-green-900 hover:bg-green-800";
    if (style === constants.buttons.RED) {
        style_classes = "bg-red-600 text-white border-red-900 hover:bg-red-800";
    } else if (style === constants.buttons.BLUE) {
        style_classes = "bg-blue-600 text-white border-blue-900 hover:bg-blue-800";
    }

    const general_classes = "rounded drop-shadow-xl px-2 w-full border-2 my-2 cursor-pointer";

    const classes = style_classes + " " + general_classes
                                  + " " + className;


    return (
        <button onClick={onClick}
                className={classes}
        >{label}
        </button>
    );
}

export default Button;