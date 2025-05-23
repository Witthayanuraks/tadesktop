import { useEffect, useState } from "react";

export default function kalender({
  setSelectedDate,
  selectedDate,
  dataTamu,
  waktu,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    generateCalendar(currentDate); // Buat kalender berdasarkan bulan aktif
  }, [currentDate]);
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const tempDays = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      tempDays.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      tempDays.push({
        day: i,
        currentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    // Next month days (padding to 6 weeks)
    const totalCells = tempDays.length;
    const nextPadding = 42 - totalCells;
    for (let i = 1; i <= nextPadding; i++) {
      tempDays.push({
        day: i,
        currentMonth: false,
      });
    }

    setDays(tempDays);
  };
  function formatToYMD(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handlePrev = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  const handleNext = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3); // 3 bulan ke depan

    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );

    if (nextMonth <= maxDate) {
      setCurrentDate(nextMonth);
    }
  };
  const monthNames = [
    "Januari",
    "Februari",
    "Meret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // untuk filter data tamu sesuai tanggal yang dipilih
  function filterDataTamu() {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const fil = dataTamu.filter((item) => {
      return item.tanggal.split(" ")[0] == `${year}-${month}-${day}`;
    });
    return fil;
  }

  return (
    <div className="datepicker">
      <div className="datepicker-top">
        <div className="month-selector">
          <button onClick={handlePrev}>
            <i className="material-icons">chevron_left</i>
          </button>
          <span className="month-name">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={handleNext}>
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </div>
      <div className="datepicker-calendar">
        {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
          <span className="day" key={d}>
            {d}
          </span>
        ))}
        {days.map((d, index) => (
          <button
            disabled={
              currentDate.getFullYear() < new Date().getFullYear()
                ? true
                : currentDate.getMonth() < new Date().getMonth() &&
                  currentDate.getFullYear() <= new Date().getFullYear()
                ? true
                : d.day < new Date().getDate() &&
                  currentDate.getMonth() <= new Date().getMonth()
                ? true
                : false
            }
            key={index}
            className={`date ${!d.currentMonth ? "faded" : ""} ${
              d.isToday ? "current-day" : ""
            } ${
              selectedDate &&
              selectedDate.toDateString() ===
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  d.day
                ).toDateString()
                ? "selected"
                : ""
            }
            `}
            onClick={() => {
              if (d.currentMonth) {
                const selected = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  d.day
                );
                setSelectedDate(selected);
              }
            }}
          >
            {d.day}
          </button>
        ))}
      </div>
      <div className="container-daftar-tamu">
        {/* {filterDataTamu().map((v, i) => (
          <div className="daftar-tamu" key={i}>
            <p>{v.tanggal.split(" ")[1].split(":").slice(0, 2).join(":")}</p>
            <p>
              Ada Jadwal Bertemu Dengan Atas Nama <strong>{v.tamu.nama}</strong>
            </p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
