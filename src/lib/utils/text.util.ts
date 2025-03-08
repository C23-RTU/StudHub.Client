export const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    const words = text.split(' ');
    let truncated = '';
    for (const word of words) {
        if ((truncated + (truncated ? ' ' : '') + word).length > limit) break;
        truncated += (truncated ? ' ' : '') + word;
    }
    return truncated;
};
