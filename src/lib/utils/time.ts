export const generateTime = (props: {
    days?: number;
    hours?: number;
}): number => {
    const { days, hours } = props;
    return 1000 * 60 * 60 * (hours || 24 * (days || 7));
};
