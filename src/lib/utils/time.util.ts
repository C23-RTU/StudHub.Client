const defaultLocalDateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};

const defaultLocalTimeOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
};

export const parseLocalDate = (date: number | string | Date, options?: Intl.DateTimeFormatOptions) => {
    return new Date(date).toLocaleDateString('ru-RU', options || defaultLocalDateOptions);
};

export const parseLocalTime = (date: number | string | Date, options?: Intl.DateTimeFormatOptions) => {
    return new Date(date).toLocaleString('ru-RU', options || defaultLocalTimeOptions);
};
