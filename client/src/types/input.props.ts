import React from "react";

export interface CustomInputElement extends HTMLElement {
    name: string;
    value: any;
}

export interface InputOptions {
    [key: string]: any;
}

export interface InputObj {
    currentTarget: {
        name: string;
        value: any;
    }
}

export type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | CustomInputElement;

export type InputProps = InputOptions & {
    name: string;
    value: any;
    label: string;
    onChange: (input: InputObj | React.ChangeEvent<InputElement>) => void;
    error: string | null;
}

export interface SelectOption {
    id: number | string;
    name: number | string;
}
