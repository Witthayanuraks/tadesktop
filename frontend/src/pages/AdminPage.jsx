import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function AdminDashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [stats] = useState({
    totalGuests: 125,
    todayVisits: 12,
    monthlyVisits: 84,
    weeklyVisits: 36
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Selamat datang, <span className="text-orange-600">Admin</span>
          </h1>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">
              {currentDateTime.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            <p className="text-xl font-bold text-gray-800">
              {currentDateTime.toLocaleTimeString('id-ID')}
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            title="Total Tamu" 
            value={stats.totalGuests} 
            icon="👥"
            color="from-blue-50 to-blue-100"
            textColor="text-blue-600"
            trend="up"
            trendValue="5%"
          />
          <StatCard 
            title="Kunjungan Hari Ini" 
            value={stats.todayVisits} 
            icon="📅"
            color="from-green-50 to-green-100"
            textColor="text-green-600"
            trend="up"
            trendValue="12%"
          />
          <StatCard 
            title="Kunjungan Mingguan" 
            value={stats.weeklyVisits} 
            icon="📆"
            color="from-purple-50 to-purple-100"
            textColor="text-purple-600"
            trend="down"
            trendValue="3%"
          />
          <StatCard 
            title="Kunjungan Bulanan" 
            value={stats.monthlyVisits} 
            icon="🗓️"
            color="from-orange-50 to-orange-100"
            textColor="text-orange-600"
            trend="up"
            trendValue="8%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Visits Chart */}
          <div className="bg-white p-5 rounded-xl shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Statistik Kunjungan</h2>
              <select className="bg-gray-100 text-sm rounded-md px-3 py-1">
                <option>60 Hari Terakhir</option>
                <option>Hari Ini</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
              <p className="text-gray-400">Visualisasi grafik akan muncul di sini</p>
            </div>
          </div>

          {/* Recent Activities */}
          {/* <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terkini</h2>
            <div className="space-y-4">
              <ActivityItem 
                time="10:30"
                name="Ahmad Nutella"
                action="Check-in"
                status="success"
              />
              <ActivityItem 
                time="09:45"
                name="Rian Biji Gantung"
                action="Check-out"
                status="success"
              />
              <ActivityItem 
                time="08:15"
                name="Ismail Gerigi"
                group="5 orang"
                action="Check-in"
                status="success"
              />
              <ActivityItem 
                time="Kemarin"
                name="Haris Administrator"
                action="Check-in"
                status="pending"
              />
            </div>
            <button className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
              Lihat Semua Aktivitas →
            </button> */}
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color, textColor, trend, trendValue }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-5 rounded-xl shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
          <div className={`flex items-center mt-2 text-xs font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {trendValue} dari bulan lalu
          </div>
        </div>
        <span className="text-4xl opacity-80">{icon}</span>
      </div>
    </div>
  );
}

function ActivityItem({ time, name, action, status, group }) {
  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0 mt-1 w-2 h-2 rounded-full ${
        status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
      }`}></div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-800">{name} {group && <span className="text-gray-500">({group})</span>}</p>
        <p className="text-xs text-gray-500">{action} • {time}</p>
      </div>
    </div>
  );
}