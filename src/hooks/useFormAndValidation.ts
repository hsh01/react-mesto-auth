import {useCallback, useState} from 'react';

export function useFormAndValidation() {
    const [values, setValues] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };


    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return {values, handleChange, errors, isValid, resetForm, setValues, setIsValid};
}

