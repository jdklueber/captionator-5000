import {useEffect, useState} from "react";
import Frame from "../components/ui/Frame";
import H2 from "../components/ui/H2";
import Table from "../components/ui/Table";
import ToggleButton from "../components/ui/ToggleButton";
import {db} from "../firebase/firebase"
import {collection, onSnapshot, setDoc, doc, query} from "firebase/firestore";
import {collections} from "../constants";

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([])

    useEffect(() => {
        const q = query(collection(db, collections.permissions)
        );

        return onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((snap) => {
                    const doc = snap.data();
                    doc.id = snap.id;
                    return doc;
                }
            )
            setPermissions(newData);
        });
    }, []);

    useEffect(() => {
        const q = query(collection(db, collections.users)
        );

        return onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((snap) => {
                    const doc = snap.data();
                    doc.id = snap.id;
                    return doc;
                }
            )
            setUsers(newData);
        });
    }, []);

    const makeAdminToggle = (row) => {
        return (<ToggleButton value={row.isAdmin} setValue={(isAdmin) => {
                setDoc(doc(db, collections.permissions, row.id), {...row.fullPermissions, isAdmin: isAdmin});
            }
        }/>
        );
    }

    const userData = users.map(u => {
            u.fullPermissions = null;
            u.isAdmin = false;

            for (let i = 0; i < permissions.length; i++) {
                const rec = permissions[i];
                if (rec.id === u.id) {
                    u.fullPermissions = rec;
                    u.isAdmin = rec.isAdmin;
                }
            }

            u.adminToggleControl = makeAdminToggle(u);
            return u;
        }
    )

    return (
        <Frame>
            <H2 className={"text-2xl"}>Admin Management</H2>
            <Table headers={["User Name", "Email", "Admin Status"]}
                   fieldNames={["displayName", "email", "adminToggleControl"]}
                   keyFieldName={"id"}
                   data={userData}
                   />
        </Frame>
    );
}

export default AdminPage;