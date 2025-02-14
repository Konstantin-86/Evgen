


export default function getPreviousWeek(serverData, currentStartOfWeek) {
    const startOfPreviousWeek = new Date(currentStartOfWeek);
    startOfPreviousWeek.setDate(currentStartOfWeek.getDate() - 7);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfPreviousWeek);
        date.setDate(startOfPreviousWeek.getDate() + i);
        const formattedDate = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        weekDates.push({ date: formattedDate, data: [] });
    }

    weekDates.forEach(weekDate => {
        const foundData = serverData.filter(data => data.date === weekDate.date);
        if (foundData.length > 0) {
            weekDate.data = foundData;
        }
    });

    return weekDates;
}