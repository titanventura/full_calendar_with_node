


fetch('/events').then(res => res.json()).then(json_res => {
    renderCalendar(json_res.message)
})

const renderCalendar = (events) => {
    var Calendar = tui.Calendar;
    var calendar = new Calendar('#tui-calendar', {
        // defaultView: 'month',
        // useCreationPopup: true,
        useDetailPopup: true,
        taskView: true,
        template: {
            monthDayname: function (dayname) {
                // return 'halo'
                return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
            }
            //   ...
        }
    });


    calendar.createSchedules(events.map((event, idx) => {
        return {
            id: idx,
            calendarId: '1',
            title: event.title,
            body: `Please join via <a href='${event.url}'>link</a>`,
            category: 'time',
            bgColor: "#47BE90",
            dueDateClass: '',
            // start: new Date(Date.now()).toISOString(),
            start: event.start,
            end: event.end
            // end: new Date(Date.now() + 10000000).toISOString()
        }
    }));


    calendar.render()
}

