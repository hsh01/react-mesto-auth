import React, {ElementType, FunctionComponent, useEffect} from 'react';

type Props = {
    isOpen: boolean;
    name: string;
    onClose: () => void;
    children: JSX.Element;
    as?: ElementType;
};

export const Popup: FunctionComponent<Props> = ({isOpen, name, onClose, children, as: Tag = 'div'}) => {
    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
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

    const handleOverlay = (e: any) => {
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
