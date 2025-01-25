export const parseDate = (date: number | string | Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
