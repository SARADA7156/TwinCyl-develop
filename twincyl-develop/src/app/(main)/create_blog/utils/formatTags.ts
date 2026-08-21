export const formatTags = (input?: string): string[] => {
    if (!input) return [];

    return input
        .split(/[,、\s]+/)
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
};