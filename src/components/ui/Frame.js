function Frame({children}) {
    return (
        <div className={"w-full border-2 rounded-lg border-gray-300 mx-auto my-5 p-5"}>
            {children}
        </div>
    );
}

export default Frame;