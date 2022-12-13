function ReadOnlyField({label, value}) {
    return (
        <div className={"w-full border-2 border-gray-300 my-2 p-2 rounded-lg"}>
            {label.toUpperCase()}: {value}
        </div>
    );
}

export default ReadOnlyField;