import {useState} from "react";

function FileChooser({label, fileHandlerCallback}) {
    const [value, setValue] = useState();
    const changeHandler = (evt) => {
        if (evt.currentTarget.files.length > 0) {
            fileHandlerCallback(evt.currentTarget.files[0])
        } else {
            fileHandlerCallback(null);
        }
        setValue(evt.currentTarget.value)
    }

    return (
        <>  <div>{label}:</div>
            <input type={"file"} value={value} onChange={changeHandler}
                   className={"file:border-green-900 file:p-2 file:rounded-2xl file:bg-slate-100" +
                       " file:drop-shadow-2xl file:mr-5 mb-10"}
            />
        </>
    );
}

export default FileChooser;