import React from 'react';

export const Input = (props) => {
    return (<label className="form__field">
        <input className={`form__input${props.error ? ' form__input_type_error' : ''}`} name={props.name}
               type={props.type ?? "text"} minLength={props.minLength} maxLength={props.maxLength} required
               onChange={props.onChange} value={props.value}/>
        <span className={`form__placeholder ${props.value ? ' form__placeholder_is-fixed' : ''}`}>{props.title}</span>
        <span className={`form__input-error ${props.error ? 'form__input-error_active' : ''}`}>{props.error}</span>
    </label>);
};
