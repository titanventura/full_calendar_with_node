"use strict";

var getHumanizedDate = function getHumanizedDate(date) {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return date.toLocaleDateString(undefined, options);
};

document.addEventListener('DOMContentLoaded', function () {
  var currentDate = Date.now();
  var startDate = new Date(currentDate.valueOf());
  var endDate = new Date(currentDate.valueOf()); // Adjust the start & end dates, respectively

  startDate.setDate(startDate.getDate() - 1); // One day in the past

  endDate.setDate(endDate.getDate() + 2); // Two days into the future

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGrid',
    selectable: true,
    nowIndicator: true,
    visibleRange: {
      start: startDate,
      end: endDate
    },
    slotDuration: "00:15:00",
    selectAllow: function selectAllow(info) {
      return new Date(info.end.toDateString()) - new Date(info.start.toDateString()) === 0;
    },
    select: function select(info) {
      $("#startDate").text(getHumanizedDate(info.start));
      $("#endDate").text(getHumanizedDate(info.end));
      var myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
      myModal.show();
      console.log(info.start, info.end);
    }
  });
  calendar.render();
});