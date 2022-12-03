import dayjs from "dayjs";
function Footer() {
    return (
        <div className={"mt-10 ml-2 text-xs italic"}>
            Copyright {dayjs().year()} Jason Klueber
        </div>
    );
}

export default Footer;