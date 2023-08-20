import React from "react";
import clsx from "clsx";
import styles from "./StartCreating.module.css";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import shoppingExperiences from '../../../static/img/cart-simple-add.png'
import apps from '../../../static/img/puzzle-toy.png'

function Topic({ title, description, linkTo, img }) {
    return (
        <Link to={useBaseUrl(linkTo)} className={clsx(styles.tool)}>
            <img className={styles.tool__icon} src={img} alt="Store Framework sample" />
            <h3>{title}</h3>
            <p className={styles.topic__description}>{description}</p>
        </Link>

    );
}

const StartBuilding = () => {
    return (

        <div className={styles.options}>
            <Topic
                title="Shopping Experiences"
                description="Start running a store by combining themes, checkout, authentication, and user profile."
                linkTo="/shopping-experiences/overview"
                img={shoppingExperiences}
            />
            <Topic
                title="Apps & Integrations"
                description="Create and sell your own solutions at VTEX App Store by using our APIs and developer tools."
                linkTo="/apps/overview"
                img={apps}
            />
        </div>

    );
};

export default StartBuilding;