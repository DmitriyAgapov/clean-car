import React from "react";
import styles from "./Status.module.scss";
import { BidsStatus, ReverseEnum } from "stores/bidsStrore";
import { ButtonSizeType } from "components/common/ui/Button/Button";

type StatusProps = {
	variant: ReverseEnum[number]
	size?: ButtonSizeType
}
const Status = ({ variant, size = ButtonSizeType.sm }:StatusProps) => {

    return (
        <span className={styles.Status} data-size={size} data-variant={BidsStatus[variant]}>
            {BidsStatus[variant]}
        </span>
    )
}

export default Status;
