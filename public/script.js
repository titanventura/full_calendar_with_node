
const getHumanizedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
    return date.toLocaleDateString(undefined, options)
}

const setElement = (elem_id, boolean) => {
    console.log(`setting ${elem_id} as ${boolean}`)
    $(`#${elem_id}`).css("display", boolean ? "block" : "none")
}

$("#createEventBtn").click(function () {
    let eventName = $("#eventName").val()
    let eventUrl = $("#eventUrl").val()
    let startDate = $("#startDateInput").val()
    let endDate = $("#endDateInput").val()


    let backend_object = {
        name: eventName,
        url: eventUrl,
        start_dt: startDate,
        end_dt: endDate
    }

    console.log(backend_object)
    setElement("eventForm", false)
    setElement("spinner", true)
    setElement("spinner_elem", true)
    fetch("/events", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(backend_object)
    }).then(res => {
        return res.json()
    }).then(json_res => {

        setElement("spinner", false)
        setElement("spinner_elem", false)

        const container_name = json_res.success ? "success_container" : "failure_container"
        $(`#${container_name}`).text(json_res.text)
        setElement(container_name, true)

        window.location.reload()
    })

})

document.addEventListener('DOMContentLoaded', function () {
    var currentDate = Date.now()

    var startDate = new Date(currentDate.valueOf());
    var endDate = new Date(currentDate.valueOf());

    // Adjust the start & end dates, respectively
    startDate.setDate(startDate.getDate() - 1); // One day in the past
    endDate.setDate(endDate.getDate() + 2); // Two days into the future


    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: '650px',
        initialView: 'timeGrid',
        selectable: true,
        nowIndicator: true,
        visibleRange: { start: startDate, end: endDate },
        slotDuration: "00:15:00",
        selectAllow: function (info) {
            return new Date(info.end.toDateString()) - new Date(info.start.toDateString()) === 0
        },
        select: function (info) {
            $("#startDate").text(getHumanizedDate(info.start))
            $("#startDateInput").val(info.start.toISOString())

            $("#endDate").text(getHumanizedDate(info.end))
            $("#endDateInput").val(info.end.toISOString())

            var myModal = new bootstrap.Modal(document.getElementById('myModal'), {})
            myModal.show()
            console.log(info.start, info.end)
        }
    });


    fetch('/events').then(res => { return res.json() }).then(json_res => {
        console.log(json_res.message)
        calendar.addEventSource(json_res.message)
        calendar.render();
    })


});