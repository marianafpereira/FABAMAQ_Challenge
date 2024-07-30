import React from 'react';
import styles from "./status.module.css";
import Loading from "../../components/Loading/Loading.jsx";
import PropTypes from "prop-types";

const LoadingPage = () => {
    return (
        <main className={`${styles.center}`}>
            <Loading />
        </main>
    );
};

export default LoadingPage;

LoadingPage.propTypes = {
    customError: PropTypes.string
}