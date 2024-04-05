import React, { ReactNode } from "react";
import styles from "./Status.module.scss";
import { BidsStatus, ReverseEnum } from "stores/bidsStrore";
import { ButtonSizeType } from "components/common/ui/Button/Button";

type StatusProps = {
	variant: ReverseEnum[number]
	size?: ButtonSizeType
	variantForw?: BidsStatus | any
	children?: ReactNode
}
const Status = ({ variant, size = ButtonSizeType.sm, variantForw, children}:StatusProps) => {
	console.log(variant);
    return (
        <span className={styles.Status} data-size={size} data-variant={BidsStatus[variant]} data-rev-varian={variantForw}>
            {variantForw ? variantForw : BidsStatus[variant]}
        </span>
    )
}

export default Status;
