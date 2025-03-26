export default function filtredArray(array, period, selectName = "Все") {
  if (selectName !== "Все") {
    array = array.filter((item) => {
      return item.namePerson === selectName;
    });
  }

  const filtredArray = array.filter((item) => {
    if (typeof period === "string") {
      return item.date.slice(3, 5) === period.slice(5, 7);
    }
    if (typeof period === "object") {
      const itemDate = new Date(item.date.split(".").reverse().join("-"));
      const startDate = new Date(period[0].split(".").reverse().join("-"));
      const endDate = new Date(period[1].split(".").reverse().join("-"));

      return itemDate >= startDate && itemDate <= endDate;
    }
  });

  /*  const filtredSumArray = [];

  filtredArray.forEach((item) => {
    const end = Number(item.endTime.slice(0, 2));
    const start = Number(item.startTime.slice(0, 2));
    const diffrenceTime = end - start;
    const sum = Number(item.currentRate) * diffrenceTime;
    const bonusAndFines =
      sum + Number(item.otherData.bonus) - Number(item.otherData.fines);
    const existingEntry = filtredSumArray.find(
      (elem) => elem.name === item.namePerson
    );

    if (existingEntry) {
      existingEntry.hours += diffrenceTime;
      existingEntry.result += sum;
      existingEntry.bonus += Number(item.otherData.bonus);
      existingEntry.fines += Number(item.otherData.fines);
      existingEntry.finalResult += bonusAndFines;
    } else {
      filtredSumArray.push({
        name: item.namePerson,
        hours: diffrenceTime,
        result: sum,
        bonus: Number(item.otherData.bonus),
        fines: Number(item.otherData.fines),
        finalResult: bonusAndFines,
        color: item.color,
      });
    }
  }); */

  const filtredSumArray = [];

  filtredArray.forEach((item) => {
    const end = Number(item.endTime.slice(0, 2));
    const start = Number(item.startTime.slice(0, 2));
    const diffrenceTime = end - start;
    const sum = Number(item.currentRate) * diffrenceTime;
    const bonusAndFines =
      sum + Number(item.otherData.bonus) - Number(item.otherData.fines);

    const existingEntry = filtredSumArray.find(
      (elem) => elem.name === item.namePerson
    );

    if (existingEntry) {
      existingEntry.hours += diffrenceTime;
      existingEntry.result += sum;
      existingEntry.bonus += Number(item.otherData.bonus);
      existingEntry.fines += Number(item.otherData.fines);
      existingEntry.finalResult += bonusAndFines;

      existingEntry.details.push({
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
        rate: item.currentRate,
        hours: diffrenceTime,
        sum: sum,
        bonus: Number(item.otherData.bonus),
        fines: Number(item.otherData.fines),
        total: bonusAndFines,
      });
    } else {
      filtredSumArray.push({
        name: item.namePerson,
        hours: diffrenceTime,
        result: sum,
        bonus: Number(item.otherData.bonus),
        fines: Number(item.otherData.fines),
        finalResult: bonusAndFines,
        color: item.color,
        details: [
          {
            date: item.date,
            startTime: item.startTime,
            endTime: item.endTime,
            rate: item.currentRate,
            hours: diffrenceTime,
            sum: sum,
            bonus: Number(item.otherData.bonus),
            fines: Number(item.otherData.fines),
            total: bonusAndFines,
            namePVZ: item.numberPVZ,
          },
        ],
      });
    }
  });

  const sumHours = filtredSumArray.reduce((acc, item) => {
    return acc + item.hours;
  }, 0);

  const sumOfRubles = filtredSumArray.reduce((acc, item) => {
    return acc + item.result + item.bonus - item.fines;
  }, 0);

  return [sumHours, sumOfRubles, filtredSumArray];
}
