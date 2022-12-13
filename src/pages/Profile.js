import H2 from "../components/ui/H2";
import {useState} from "react";
import StyledInput from "../components/ui/StyledInput";
import Button from "../components/ui/Button";
import Frame from "../components/ui/Frame";
import ReadOnlyField from "../components/ui/ReadOnlyField";

function Profile() {
    const [editMode, setEditMode] = useState(true);
    const [displayName, setDisplayName] = useState("Dummy Name");
    const emailAddress = "foo@bar.com";

    let name = <ReadOnlyField label={"name"} value={displayName}/>
    if (editMode) {
        name = <StyledInput type={"text"} placeholder={"Display Name"} value={displayName}
                            onChange={(evt) => setDisplayName(evt.currentTarget.value)}/>
    }

    const saveChanges = () => {
        setEditMode(false);
    }

    return (
        <div>
            <H2>Profile Page</H2>
            <Frame>
                <div>{name}</div>
                <ReadOnlyField label={"email"} value={emailAddress}/>
                {   editMode ? <Button onClick={() => {saveChanges()}} label={"Save"}/> :
                    <Button onClick={() => {setEditMode(true)}} label={"Update"}/>
                }
            </Frame>
        </div>
    );
}

export default Profile;