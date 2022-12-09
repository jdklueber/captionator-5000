function StyledInput({type, value, onChange, className, placeholder}) {
    const classes = "w-full rounded-lg focus:border-gray-500 " +
                    "focus:ring-1 focus:ring-gray-500 ring-inset " +
                    "my-2" +
                    " " + className;

    return (
        <>
            <input type={type} value={value} onChange={onChange} className={classes}
                   placeholder={placeholder}
            />
        </>
    );
}

export default StyledInput;