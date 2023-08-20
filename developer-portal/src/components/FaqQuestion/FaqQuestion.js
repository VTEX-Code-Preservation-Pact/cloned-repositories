import React from "react";
import styles from "./FaqQuestion.module.css";

const FaqQuestion = ({ title, paragraph }) => {
    return (
        <details className={styles.FaqDetails}>
            <summary>{title}</summary>
            <p>
                {paragraph}
            </p>
        </details>
    );
};

export default FaqQuestion;
