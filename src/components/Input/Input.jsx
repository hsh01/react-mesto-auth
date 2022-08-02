import React, {useEffect, useState} from 'react';
export const Input = ({title, name, value, error, type, minLength, maxLength, required, onChange, dark = false}) => {
    const [isFixed, setIsFixed] = useState(false);
    const [focused, setFocused] = React.useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    useEffect(() => {
        setIsFixed(value !== undefined && value.length > 0);
    }, [value]);
    return (
        <label className='form__field'>
            <input
                className={`form__input${dark ? ' form__input_dark' : ''} ${error && 'form__input_type_error'}`}
                name={name}
                type={type ?? 'text'}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                onChange={onChange}
                value={value ?? ''}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <span className={`form__placeholder ${isFixed && 'form__placeholder_is-fixed'}`}>{title}</span>
            <span className={`form__input-error ${error && !focused && 'form__input-error_active'}`}>{error}</span>
        </label>
    );
};
