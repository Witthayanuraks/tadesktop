import { useState } from "react";
import Kalender from "./Kalender";
import GuruSidebar from "../GuruSidebar";
import Sidebar from "../Sidebar";

export default function MyAppointment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="container-form-janji">
        <Sidebar/>
      <Kalender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="form-tamu">
        <h3>TAMBAH JANJI TEMU</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // submit();
          }}
        >
          <div className="form-group">
            <label htmlFor="nama">Nama Tamu</label>
            <input
              type="text"
              id="nama"
              placeholder="Masukan Nama Tamu"
              name="nama_tamu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telepon">No Telepon</label>
            <input
              type="number"
              id="telepon"
              placeholder="08123456789"
              name="no_hp"
              required
            />
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
            <select id="time" name="waktu">
              <option value="-">-- Pilih Waktu Pertemuan --</option>
              <option value="08:00:00">08:00</option>
              <option value="09:00:00">09:00</option>
              <option value="10:00:00">10:00</option>
              <option value="11:00:00">11:00</option>
              <option value="12:00:00">12:00</option>
              <option value="13:00:00">13:00</option>
              <option value="14:00:00">14:00</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="keterangan">Keterangan</label>
            <textarea
              required
              id="keterangan"
              placeholder="Contoh: Keperluan dengan Bu Dian terkait LKS"
              name="keterangan"
            ></textarea>
          </div>
          <button
            // disabled={disabledSubmit}
            className="submit-btn"
            type="submit"
          >
            Buat Janji Temu
          </button>
        </form>
      </div>
    </div>
  );
}
