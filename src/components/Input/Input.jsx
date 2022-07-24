import * as React from 'react';
export const Input = (props) => {
    return (<label className="form__field">
            <input className="form__input" name={props.name} type={props.type ?? "text"} minLength={props.min} maxLength={props.max} required onChange={props.onChange}/>
            <span className="form__placeholder profile-name-input-placeholder">{props.title}</span>
            <span className="form__input-error profile-name-input-error"/>
        </label>);
};
