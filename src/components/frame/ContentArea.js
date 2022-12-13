function ContentArea({children}) {
    return (
        <div className={"w-full md:max-w-6xl mx-auto px-5 my-5"}>
            {children}
        </div>
    );
}

export default ContentArea;