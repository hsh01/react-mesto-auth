import * as React from 'react';

type Props = {
    title: string,
    name: string,
    type?: string,
    min?: number,
    max?: number,
    required?: boolean,
    onChange: (arg: any) => void
};

export const Input = (props: Props) => {

    return (
        <label className="form__field">
            <input className="form__input" name={props.name} type={props.type ?? "text"} minLength={props.min} maxLength={props.max}
                   required onChange={props.onChange}/>
            <span className="form__placeholder profile-name-input-placeholder">{props.title}</span>
            <span className="form__input-error profile-name-input-error"/>
        </label>
    );
};