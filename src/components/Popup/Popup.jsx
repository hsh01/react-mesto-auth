import React, {useEffect} from 'react';
export const Popup = ({isOpen, name, onClose, children, as: Tag = 'div'}) => {
    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            };
        }
    }, [isOpen, onClose]);
    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`} onClick={handleOverlay}>
            <Tag className={`popup__container popup__container_${name}`}>
                {children}
                <button className='popup__close' type='button' title='закрыть' aria-label='закрыть' onClick={onClose} />
            </Tag>
        </div>
    );
};
