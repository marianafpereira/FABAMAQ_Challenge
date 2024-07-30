import { UserCircle } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const TitleHeading = ({ title = "", subtitle = "" }) => {
    useEffect(() => {
        const length = subtitle ?
            subtitle.replace(" ", "").length :
            title.replace(/ +/g, "").length;
        document.documentElement.style
            .setProperty('--custom-underline-width', `${length - 1}ch`);
    }, [subtitle, title]);

    return (
        <>
            {title === "Welcome," && (
                <UserCircle weight="duotone" color="var(--primary-color)" size={30} />
            )}
            <h1>{title}</h1>
        </>
    );
};

TitleHeading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
}

export default TitleHeading;
