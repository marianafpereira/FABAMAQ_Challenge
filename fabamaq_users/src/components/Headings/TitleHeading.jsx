import { UserCircle, ChatText } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import './TitleHeading.css';

const TitleHeading = ({ title = "", subtitle = "", showUserIcon = false, showChatIcon = false }) => {
    useEffect(() => {
        const length = subtitle ?
            subtitle.replace(" ", "").length :
            title.replace(/ +/g, "").length;
        document.documentElement.style
            .setProperty('--custom-underline-width', `${length + 20}ch`); // Increase length by 20 characters
    }, [subtitle, title]);

    return (
        <div className="title-container">
            {(showUserIcon || showChatIcon) && (
                <div className="icon-container">
                    {showUserIcon && <UserCircle weight="duotone" color="var(--primary-color)" size={70} />}
                    {showChatIcon && <ChatText weight="duotone" color="var(--primary-color)" size={70} />}
                </div>
            )}
            <div>
                {title && <h1 className="title-animation">{title}</h1>}
                {subtitle && (
                    <div className="subtitle-container subtitle-animation">
                        <h2>{subtitle}</h2>
                        <div className="thick-underline"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

TitleHeading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showUserIcon: PropTypes.bool,
    showChatIcon: PropTypes.bool,
}

export default TitleHeading;
