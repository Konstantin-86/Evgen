

export default function getCurrentWeek(serverData) {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1));

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
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

