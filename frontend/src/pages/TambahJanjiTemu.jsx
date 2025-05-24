import { useEffect, useState } from "react";
import Kalender from "../../Components/Guru/Kalender";
import { useNavigate } from "react-router-dom";
import Auth from "../../context/AuthContext";
import apiAuth from "../../api/apiAuth";
import NavbarGuru from "../../Components/Guru/NavbarGuru";

export default function TambahJanjiTemu() {
  const navigate = useNavigate();
  const { getToken } = Auth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate] = useState(new Date());
  const [waktu, setWaktu] = useState("-");
  const [dataTamu, setDataTamu] = useState([]);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    nama_tamu: "",
    no_hp: "",
    tanggal: "",
    keterangan: "",
  });

  // Fetch appointment data when component mounts and when selectedDate changes
  useEffect(() => {
    const fetchDataTamu = async () => {
      try {
        const response = await apiAuth(getToken()).get("/janji");
        setDataTamu(response.data.data);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchDataTamu();
  }, [getToken, selectedDate]); // Add selectedDate as dependency to refetch when date changes

  // Format date to YYYY-MM-DD
  const formatToYMD = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle input changes with validation
  const setChange = (e) => {
    const { name, value } = e.target;
    
    // Clear previous errors
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    if (name === "waktu") {
      setWaktu(value);
      setData(prev => ({
        ...prev,
        tanggal: `${formatToYMD(selectedDate)} ${value}`
      }));
    } else if (name === "no_hp") {
      // Validate phone number
      if (!/^[0-9]*$/.test(value)) return;
      if (value.length > 15) return;
      
      setData(prev => ({ ...prev, [name]: value }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Check if time slot is available
  const checkWaktuTamu = (time) => {
    const selectedDay = formatToYMD(selectedDate);
    
    // Check if time is in the past for current day
    if (formatToYMD(currentDate) === selectedDay) {
      const currentHour = currentDate.getHours();
      const selectedHour = parseInt(time.split(":")[0]);
      if (selectedHour < currentHour) return true;
    }
    
    // Check if time is already booked
    return dataTamu.some(item => {
      const [date, itemTime] = item.tanggal.split(" ");
      return date === selectedDay && itemTime === time;
    });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!data.nama_tamu.trim()) {
      newErrors.nama_tamu = "Nama tamu harus diisi";
    }
    
    if (!data.no_hp.trim()) {
      newErrors.no_hp = "Nomor telepon harus diisi";
    } else if (data.no_hp.length < 10) {
      newErrors.no_hp = "Nomor telepon terlalu pendek";
    }
    
    if (waktu === "-") {
      newErrors.waktu = "Pilih waktu pertemuan";
    }
    
    if (!data.keterangan.trim()) {
      newErrors.keterangan = "Keterangan harus diisi";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setDisabledSubmit(true);
      const response = await apiAuth(getToken()).post("/janji", data);
      alert(response.data.message);
      setSelectedDate(new Date());
      setWaktu("-");
      setData({
        nama_tamu: "",
        no_hp: "",
        tanggal: "",
        keterangan: "",
      });
      
      // Refresh appointment data after successful submission
      const newData = await apiAuth(getToken()).get("/janji");
      setDataTamu(newData.data.data);
      
      navigate("/dashboard-guru");
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setDisabledSubmit(false);
    }
  };

  return (
    <>
      <NavbarGuru />
      <div className="container-calender">
        <Kalender
          setData={setData}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          dataTamu={dataTamu}
          waktu={waktu}
        />
        <div className="form-tamu">
          <h3>TAMBAH JANJI TEMU</h3>
          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="nama">Nama Tamu</label>
              <input
                type="text"
                id="nama"
                placeholder="Masukan Nama Tamu"
                name="nama_tamu"
                value={data.nama_tamu}
                onChange={setChange}
                className={errors.nama_tamu ? "error" : ""}
              />
              {errors.nama_tamu && <span className="error-message">{errors.nama_tamu}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="telepon">No Telepon</label>
              <input
                type="tel"
                id="telepon"
                placeholder="08123456789"
                name="no_hp"
                value={data.no_hp}
                onChange={setChange}
                className={errors.no_hp ? "error" : ""}
              />
              {errors.no_hp && <span className="error-message">{errors.no_hp}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="waktu">Tanggal</label>
              <input
                type="text"
                id="waktu"
                name="tanggal"
                placeholder="Contoh: 2025-05-10"
                value={new Intl.DateTimeFormat("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(selectedDate)}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Waktu Pertemuan</label>
              <select 
                id="time" 
                onChange={setChange} 
                name="waktu"
                value={waktu}
                className={errors.waktu ? "error" : ""}
              >
                <option value="-">-- Pilih Waktu Pertemuan --</option>
                {["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00"].map(time => (
                  <option 
                    key={time} 
                    value={time} 
                    disabled={checkWaktuTamu(time)}
                  >
                    {time.split(":")[0]}:00
                  </option>
                ))}
              </select>
              {errors.waktu && <span className="error-message">{errors.waktu}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="keterangan">Keterangan</label>
              <textarea
                id="keterangan"
                placeholder="Contoh: Keperluan dengan Bu Dian terkait LKS"
                name="keterangan"
                value={data.keterangan}
                onChange={setChange}
                className={errors.keterangan ? "error" : ""}
              />
              {errors.keterangan && <span className="error-message">{errors.keterangan}</span>}
            </div>
            <button
              disabled={disabledSubmit}
              className={`submit-btn ${disabledSubmit ? "disabled" : ""}`}
              type="submit"
            >
              {disabledSubmit ? "Memproses..." : "Buat Janji Temu"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}