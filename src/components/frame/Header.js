import Icon from './images/logo.png'
function Header() {
    return (
        <div className={"p-2 flex flex-row justify-between items-baseline"}>
            <div>
                <img src={Icon} className={"h-10 inline"} alt={"logo"}/>
                <h1 className={"inline ml-2 font-bold"}>Captionator-5000</h1>
            </div>
            <div>
                Login Goes Here
            </div>
        </div>
    );
}

export default Header;