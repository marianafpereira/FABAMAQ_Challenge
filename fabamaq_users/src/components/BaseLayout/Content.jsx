import SectionHeading from "../Headings/SectionHeading.jsx";
import PropTypes from "prop-types";

const Content = ({ title = "", children }) => {
    return (
        <section className="content">
            <div className="content-buttons delay-fade-down">
                <SectionHeading text={title}/>
            </div>
            {children}
        </section>
    );
};

Content.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

export default Content;
