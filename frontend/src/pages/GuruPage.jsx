import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DashboardGuru = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      navigate('/login');
    }
  };

  const guests = [
    {
      id: 1,
      name: "Windah Basudara",
      phone: "085765325342",
      description: "Koordinasi kerjasama",
      status: "waiting",
      date: "29/05/2025"
    },
    {
      id: 2,
      name: "Dr Tirta",
      phone: "087678744323",
      description: "Konsultasi",
      status: "waiting",
      date: "30/05/2025"
    },
    {
      id: 3,
      name: "Reza arab",
      phone: "089632457676",
      description: "Koordinasi event",
      status: "completed",
      date: "10/06/2025"
    },
    {
      id: 4,
      name: "Deddy Corbuzier",
      phone: "081234567890",
      description: "Wawancara",
      status: "canceled",
      date: "15/06/2025"
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'waiting':
        return <Clock className="w-4 h-4 mr-1 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 mr-1 text-green-500" />;
      case 'canceled':
        return <AlertCircle className="w-4 h-4 mr-1 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'waiting':
        return "Sedang Menunggu";
      case 'completed':
        return "Selesai";
      case 'canceled':
        return "Dibatalkan";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FF7E43] py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <button 
            className="md:hidden text-white mr-4"
            onClick={toggleSidebar}
          >
            {sidebarVisible ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl text-white font-bold">Dashboard Guru</h1>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png" 
            alt="Logo Sekolah" 
            className="w-12 h-12" 
          />
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-[#183F55] text-white h-screen py-8 px-6 flex flex-col fixed left-0 top-0 transition-all duration-300 z-40 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-10 mt-4 flex justify-center">
          <img 
            src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png" 
            alt="Logo Sekolah" 
            className="w-16 h-16" 
          />
        </div>
        
        <nav className="flex-1 space-y-2">
          <a 
            href="/dashboard" 
            className="flex items-center py-3 px-4 text-white rounded-lg mb-2 bg-[#FF894E] hover:bg-[#FF7E43] transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </a>
          <a 
            href="/janji-temu" 
            className="flex items-center py-3 px-4 text-white rounded-lg mb-2 hover:bg-[#FF894E] transition-colors"
          >
            <CalendarCheck className="w-5 h-5 mr-3" />
            <span>Janji Temu</span>
          </a>
          <a 
            href="/notifikasi" 
            className="flex items-center py-3 px-4 text-white rounded-lg mb-2 hover:bg-[#FF894E] transition-colors"
          >
            <Bell className="w-5 h-5 mr-3" />
            <span>Notifikasi</span>
          </a>
          <a 
            href="/profile" 
            className="flex items-center py-3 px-4 text-white rounded-lg mb-2 hover:bg-[#FF894E] transition-colors"
          >
            <User className="w-5 h-5 mr-3" />
            <span>Profile Guru</span>
          </a>
        </nav>

        <button 
          className="flex items-center justify-center bg-[#FF894E] text-white py-3 px-4 rounded-lg font-medium mt-auto mb-4 hover:bg-[#FF7E43] transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Keluar</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className={`p-6 transition-all duration-300 ${
        sidebarVisible ? 'ml-64' : 'ml-0 md:ml-64'
      }`}>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Daftar Tamu</h2>
            <div className="flex space-x-3">
              <button className="bg-[#FF7E43] text-white px-4 py-2 rounded-lg hover:bg-[#FF6E33] transition-colors">
                + Tambah Janji
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-semibold text-gray-700">No</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Nama Tamu</th>
                  <th className="p-3 text-left font-semibold text-gray-700">No. HP</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Keterangan</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-left border-b border-gray-200">{guest.id}</td>
                    <td className="p-3 text-left border-b border-gray-200 font-medium">{guest.name}</td>
                    <td className="p-3 text-left border-b border-gray-200">{guest.phone}</td>
                    <td className="p-3 text-left border-b border-gray-200">{guest.description}</td>
                    <td className="p-3 text-left border-b border-gray-200">
                      <div className="flex items-center">
                        {getStatusIcon(guest.status)}
                        <span className={`${
                          guest.status === 'waiting' ? 'text-yellow-500' :
                          guest.status === 'completed' ? 'text-green-500' :
                          'text-red-500'
                        }`}>
                          {getStatusText(guest.status)}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-left border-b border-gray-200">{guest.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Menampilkan 1 sampai {guests.length} dari {guests.length} entri
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                Sebelumnya
              </button>
              <button className="px-3 py-1 rounded border border-[#FF7E43] bg-[#FFEEE5] text-[#FF7E43]">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardGuru;