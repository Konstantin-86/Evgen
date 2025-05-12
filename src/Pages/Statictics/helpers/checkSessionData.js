import getCurrentMonthAndYear from "./getCurrentMonthAndYear.js";
export default function checkSessionData() {
  const storedValue = sessionStorage.getItem("checkPVZ");
  const checkMonth = sessionStorage.getItem("curMonth");
  const checkPeriod = sessionStorage.getItem("selectPeriod");

  if (checkPeriod === "period") {
    const startDate = sessionStorage.getItem("startPeriod");
    const endDate = sessionStorage.getItem("endPeriod");
    return [startDate, endDate];
  } else {
    if (checkMonth) {
      return checkMonth;
    } else {
      return getCurrentMonthAndYear();
    }
  }
}
