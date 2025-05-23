// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';

// function GuruPage() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const currentDate = new Date().toLocaleDateString('id-ID', {
//     weekday: 'long', 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric'
//   });

//   // Sample guest data - replace with real data from your API
//   const guestEntries = [
//     { 
//       id: 1,
//       name: 'Budi Santoso', 
//       institution: 'PT. Maju Jaya', 
//       purpose: 'Meeting with principal',
//       timeIn: '08:30',
//       timeOut: '10:15',
//       date: '12 Mei 2023'
//     },
//     { 
//       id: 2,
//       name: 'Ani Wijaya', 
//       institution: 'Dinas Pendidikan', 
//       purpose: 'School inspection',
//       timeIn: '10:00',
//       timeOut: '12:45',
//       date: '12 Mei 2023'
//     },
//     { 
//       id: 3,
//       name: 'Rudi Hermawan', 
//       institution: 'SMKN 1 Malang', 
//       purpose: 'Teacher exchange program',
//       timeIn: '13:30',
//       timeOut: '',
//       date: '12 Mei 2023'
//     }
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
      
//       <main className="flex-1 p-6 overflow-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//               Buku Tamu <span className="text-orange-600">Digital</span>
//             </h1>
//             <p className="text-gray-600 mt-1">{currentDate}</p>
//           </div>
//           <div className="flex space-x-3 mt-4 md:mt-0">
//             <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-orange-600 transition-colors flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Tambah Tamu
//             </button>
//             <button
//               onClick={logout}
//               className="bg-white text-red-500 px-4 py-2 rounded-lg shadow-sm hover:bg-red-50 transition-colors border border-red-100 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Keluar
//             </button>
//           </div>
//         </div>

//         {/* Guest Book Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Tamu Hari Ini</p>
//                 <p className="text-2xl font-bold">12</p>
//               </div>
//               <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Sedang Berkunjung</p>
//                 <p className="text-2xl font-bold">3</p>
//               </div>
//               <div className="bg-green-100 text-green-600 p-3 rounded-full">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Semua Tamu</p>
//                 <p className="text-2xl font-bold">247</p>
//               </div>
//               <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Guest Entries Table */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Daftar Tamu Terkini</h2>
//             <div className="flex space-x-2">
//               <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
//                 Hari Ini
//               </button>
//               <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
//                 7 Hari Terakhir
//               </button>
//               <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
//                 Bulan Ini
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asal Instansi</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keperluan</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {guestEntries.map((guest) => (
//                   <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="font-medium text-gray-900">{guest.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                       {guest.institution}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                       {guest.purpose}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                       <div className="flex flex-col">
//                         <span>Masuk: {guest.timeIn}</span>
//                         {guest.timeOut && <span>Keluar: {guest.timeOut}</span>}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         guest.timeOut ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {guest.timeOut ? 'Selesai' : 'Sedang Berkunjung'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       {!guest.timeOut && (
//                         <button className="text-orange-600 hover:text-orange-900 mr-3">
//                           Check Out
//                         </button>
//                       )}
//                       <button className="text-blue-600 hover:text-blue-900">
//                         Detail
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between mt-6">
//             <div className="text-sm text-gray-500">
//               Menampilkan 1 sampai 3 dari 12 entri
//             </div>
//             <div className="flex space-x-1">
//               <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
//                 Previous
//               </button>
//               <button className="px-3 py-1 rounded border border-orange-300 bg-orange-50 text-orange-600">
//                 1
//               </button>
//               <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
//                 2
//               </button>
//               <button className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default GuruPage;








// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';


// function GuruPage() {

//   const currentDate = new Date().toLocaleDateString('id-ID', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//   });

//   return (
//     <div className="flex min-h-screen p-8">
//     <Sidebar />
//     <div className="min-h-screen bg-white font-sans p-6 relative overflow-hidden">
//       <div className="flex items-start justify-between mb-8">
//         <div>
//           {/* <img src="" alt="Logo" className="w-16 mb-2" /> */}
//           <h1 className="text-2xl font-bold text-black">
//             Selamat datang, <span className="text-orange-600">[Nama Guru]</span>!
//           </h1>
//           <p className="text-gray-700">{currentDate}</p>
//         </div>
//         {/* <img src="" alt="Maskot" className="w-28" /> */}
//       </div>

//       {/* Konten */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Jadwal */}
//         <div className="bg-gray-700 text-white p-6 rounded-lg shadow">
//           <h2 className="font-bold text-lg mb-4">Jadwal Hari ini:</h2>
//           <ul className="space-y-2">
//             {/* <li className="bg-gray-500 h-4 rounded w-3/4"></li>
//             <li className="bg-gray-500 h-4 rounded w-2/3"></li>
//             <li className="bg-gray-500 h-4 rounded w-5/6"></li>
//             <li className="bg-gray-500 h-4 rounded w-1/2"></li> */}
//           </ul>
//         </div>

//         {/* Pertemuan/Janji */}
//         <div className="bg-gray-700 text-white p-6 rounded-lg shadow">
//           <h2 className="font-bold text-lg mb-4">Pertemuan/Janji:</h2>
//           <ul className="space-y-2">
//             {/* <li className="bg-gray-500 h-4 rounded w-3/4"></li>
//             <li className="bg-gray-500 h-4 rounded w-2/3"></li>
//             <li className="bg-gray-500 h-4 rounded w-5/6"></li>
//             <li className="bg-gray-500 h-4 rounded w-1/2"></li> */}
//           </ul>
//         </div>
//       </div>

//       {/* Pengajuan */}
//       <div className="mt-6 bg-gray-700 text-white p-6 rounded-lg shadow">
//         <h2 className="font-bold text-lg mb-4">Pengajuan:</h2>
//         <ul className="space-y-2">
//           {/* <li className="bg-gray-500 h-4 rounded w-11/12"></li>
//           <li className="bg-gray-500 h-4 rounded w-10/12"></li>
//           <li className="bg-gray-500 h-4 rounded w-9/12"></li>
//           <li className="bg-gray-500 h-4 rounded w-8/12"></li>
//           <li className="bg-gray-500 h-4 rounded w-7/12"></li> */}
//         </ul>
//       </div>


//     </div>
//     </div>

//   );
// }

// export default GuruPage;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      status: "Sedang Menunggu",
      date: "29/05/2025"
    },
    {
      id: 2,
      name: "Dr Tirta",
      phone: "087678744323",
      description: "Konsultasi",
      status: "Sedang Menunggu",
      date: "30/05/2025"
    },
    {
      id: 3,
      name: "Reza arab",
      phone: "089632457676",
      description: "Koordinasi event",
      status: "Sedang Menunggu",
      date: "10/06/2025"
    }
  ];

  return (
    <div className="min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: "url(backgroundbasic.png)" }}>
      {/* Header */}
      <header className="bg-[#FF7E43] py-5 px-10 flex justify-between items-center">
        <h1 className="text-lg text-white font-bold text-center ml-[550px]">Dashboard</h1>
      </header>

      {/* Sidebar Toggle Button */}
      <div 
        className="fixed top-1 left-[90px] z-50 cursor-pointer p-1"
        onClick={toggleSidebar}
      >
        <img src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/logo.png" alt="Logo Sekolah" className="w-15 h-15 block" />
      </div>

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-[#183F55] text-white h-screen py-20 px-8 flex flex-col fixed left-0 top-0 transition-all duration-300 z-40 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-3xl text-center mb-5">Guru</h2>
        
        <nav className="mt-5 flex-1">
          <a href="/dashboard" className="block py-2 px-4 text-white no-underline rounded mb-2 bg-[#FF894E]">Dashboard</a>
          <a href="/janji-temu" className="block py-2 px-4 text-white no-underline rounded mb-2 hover:bg-[#FF894E]">Janji Temu</a>
          <a href="/notifikasi" className="block py-2 px-4 text-white no-underline rounded mb-2 hover:bg-[#FF894E]">Notifikasi</a>
          <a href="/profile" className="block py-2 px-4 text-white no-underline rounded mb-2 hover:bg-[#FF894E]">Profile Guru</a>
        </nav>

        <button 
          className="flex items-center bg-[#FF894E] text-black py-2 px-3 rounded-xl font-bold no-underline mt-auto mb-4"
          onClick={handleLogout}
        >
          <img src="BoxArrowRight.png" alt="Keluar Icon" className="w-4 mr-1" />
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
      <main className="p-10 text-center">
        <div className="mx-auto border-2 border-white/75 bg-white/75 rounded-xl p-10 max-w-[1000px] shadow-md">
          <h2 className="font-bold text-center mb-5">Daftar Tamu</h2>
          
          <div className="mt-0">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left bg-gray-100 font-semibold">No</th>
                  <th className="p-3 text-left bg-gray-100 font-semibold">Nama Tamu</th>
                  <th className="p-3 text-left bg-gray-100 font-semibold">No. Hp</th>
                  <th className="p-3 text-left bg-gray-100 font-semibold">Keterangan</th>
                  <th className="p-3 text-left bg-gray-100 font-semibold">Status</th>
                  <th className="p-3 text-left bg-gray-100 font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id}>
                    <td className="p-3 text-left bg-[#fdfafa] border-b border-gray-300">{guest.id}</td>
                    <td className="p-3 text-left bg-[#fdfafa] border-b border-gray-300">{guest.name}</td>
                    <td className="p-3 text-left bg-[#fdfafa] border-b border-gray-300">{guest.phone}</td>
                    <td className="p-3 text-left bg-[#fdfafa] border-b border-gray-300">{guest.description}</td>
                    <td className="p-3 text-left bg-[#fdfafa] border-b border-gray-300 text-red-500 font-semibold text-center">{guest.status}</td>
                    <td className="p-3 text-left bg-[#fdfafa] border-b border-gray-300">{guest.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardGuru;