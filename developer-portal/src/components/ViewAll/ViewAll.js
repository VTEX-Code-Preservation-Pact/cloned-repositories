import React from 'react'
import styles from './ViewAll.module.css'
import Link from '@docusaurus/Link'

const ViewAll = ({message, linkTo}) => {
    return (
        <Link to={linkTo} className={styles.viewAll}>
            {message}
            <svg
                transform="rotate(270)"
                id="arrow"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 16 16"
            >
                <g fill="#f71963">
                    <path d="M14,4.586l-6,6-6-6L.586,6l6.707,6.707a1,1,0,0,0,1.414,0L15.414,6Z"></path>
                </g>
            </svg>
        </Link>
    );
};


export default ViewAll;
