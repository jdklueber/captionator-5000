function Frame({children}) {
    return (
        <div className={"md:w-full border-2 rounded-lg border-gray-300 mx-auto my-5 p-5 md:shadow-2xl"}>
            {children}
        </div>
    );
}

export default Frame;