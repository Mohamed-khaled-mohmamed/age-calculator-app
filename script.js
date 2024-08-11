const cardButton = document.querySelector('.card__button');

const validate = function (type, value) {
  const currentYear = new Date().getFullYear();
  if (type === 'day' && value > 0 && value <= 31) return true;
  if (type === 'month' && value > 0 && value <= 12) return true;
  if (type === 'year' && value > 0 && value <= currentYear) return true;
  return false;
};

const getValue = function (value) {
  const content = document.querySelector(`[name="${value}"]`);
  if (!validate(value, content.value)) {
    content.classList.add('card__input--error');
    return;
  }
  content.classList.remove('card__input--error');
  return content.value;
};

const calculateAge = function (day, month, year) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  if (!day || !month || !year) {
    console.log("'we con't calculate the age because in valid data");
    return;
  }

  const age = currentYear - year;
  const monthDiff = currentMonth - month;
  const dayDiff = currentDay - day;
  if (age <= 0) {
    if (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)) {
      return `${Math.abs(monthDiff)} month${Math.abs(monthDiff) !== 1 ? 's' : ''}`;
    } else {
      return `0 month`;
    }
  } else if (currentMonth > month) {
    console.log('month', age);
    return age;
  } else if (currentMonth == month && currentDay >= day) {
    console.log('day', age);
    return age;
  }
  console.log(age - 1);
  return age - 1;
};

const getAge = function () {
  const day = getValue('day');
  const month = getValue('month');
  const year = getValue('year');
  const age = calculateAge(day, month, year);
  const resultValue = document.querySelector('.card__resultValue');
  resultValue.textContent = '--';

  if (age) {
    resultValue.textContent = age;
  }
};

cardButton.addEventListener('click', () => {
  getAge();
});
window.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  getAge();
});
