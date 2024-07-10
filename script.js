document.addEventListener("DOMContentLoaded", () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentDate = new Date();

    const calendarHeaderText = document.querySelector('.header-text');
    const datesContainer = document.querySelector('.dates ul');
    const prevButton = document.querySelector('.fa-angle-left');
    const nextButton = document.querySelector('.fa-angle-right');

    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const today = new Date();

        calendarHeaderText.textContent = `${monthNames[month]} ${year}`;

        // Clear previous dates
        datesContainer.innerHTML = '';

        // Get first and last day of the month
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Get last day of the previous month
        const lastDatePrevMonth = new Date(year, month, 0).getDate();

        // Fill dates of the previous month
        for (let i = firstDay; i > 0; i--) {
            const prevDateCell = document.createElement('li');
            prevDateCell.textContent = lastDatePrevMonth - i + 1;
            prevDateCell.classList.add('prev-month');
            datesContainer.appendChild(prevDateCell);
        }

        // Fill dates of the current month
        for (let date = 1; date <= lastDate; date++) {
            const dateCell = document.createElement('li');
            dateCell.textContent = date;
            dateCell.classList.add('current-month');
            if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                dateCell.classList.add('today');
            }
            datesContainer.appendChild(dateCell);
        }

        // Fill dates of the next month
        const totalCells = firstDay + lastDate;
        const nextMonthDays = 7 - (totalCells % 7);
        if (nextMonthDays < 7) {
            for (let i = 1; i <= nextMonthDays; i++) {
                const nextDateCell = document.createElement('li');
                nextDateCell.textContent = i;
                nextDateCell.classList.add('next-month');
                datesContainer.appendChild(nextDateCell);
            }
        }
    }

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    updateCalendar()
})
