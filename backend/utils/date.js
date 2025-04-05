function getCurrentMonthYear() {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  return `${month}/${year}`;
}

function isDateAfterCurrentMonthYear(dateString) {
  const currentDateMMYYYY = getCurrentMonthYear();

  const [currentMonth, currentYear] = currentDateMMYYYY.split('/').map(Number);
  const [inputMonth, inputYear] = dateString.split('/').map(Number);

  if (inputMonth > 12) return false;

  // Compare years first
  if (inputYear > currentYear) {
    return true;
  } else if (inputYear === currentYear) {
    // If years are the same, compare months
    return inputMonth > currentMonth;
  } else {
    // Input year is before current year
    return false;
  }
}

export { isDateAfterCurrentMonthYear };