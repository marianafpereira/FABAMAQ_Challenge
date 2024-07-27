import styles from "./ListItem.module.css";
import {CalendarDots} from "@phosphor-icons/react";
import Pill from "./Pill.jsx";
import PropTypes from "prop-types";

export default function ListItem({list, type}) {
    const renderItems = list.map((user, index) => (
        <section className="content-grid delay-fade-in" key={index}>
            <Pill>{`${type}: ${user.name}`}</Pill>
            <div className={styles.cardGrid}>
                <section>
                    <CalendarDots size={32} weight={"duotone"}
                                  color={"var(--primary-color)"}/>
                    {user.timeStamp.split("T")[0]}{" "}
                </section>
            </div>
        </section>
    ));
    return <>{renderItems}</>;
}

ListItem.propTypes = {
    type: PropTypes.string,
    list: PropTypes.array
}