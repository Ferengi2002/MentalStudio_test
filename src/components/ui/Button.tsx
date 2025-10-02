import React from "react";
import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className = "", ...rest } = props;
    return (
        <button className={`btn-primary ${className}`} {...rest} />
    );
}
