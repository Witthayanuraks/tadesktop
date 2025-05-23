import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: '',
    email: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // Improved message state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Fixed toggleForm - properly resets all states
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage({ text: '', type: '' });
    setFormData({
      identifier: '',
      password: '',
      role: '',
      email: '',
      phone: ''
    });
    setShowPassword(false);
  };

  // Improved validation functions
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^[0-9]{10,15}$/.test(value);

  // Fixed handleSubmit with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation before submission
    if (isLogin && !formData.identifier) {
      setMessage({ text: 'Email atau nomor telepon harus diisi', type: 'error' });
      return;
    }
    
    if (!isLogin && (!formData.email || !formData.phone || !formData.role)) {
      setMessage({ text: 'Semua field harus diisi', type: 'error' });
      return;
    }
    
    if (!formData.password) {
      setMessage({ text: 'Password harus diisi', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'Memproses...', type: 'info' });

    try {
      const endpoint = isLogin ? 'login' : 'register';
      let body;

      if (isLogin) {
        body = { password: formData.password };
        
        if (isEmail(formData.identifier)) {
          body.email = formData.identifier;
        } else if (isPhone(formData.identifier)) {
          body.phone = formData.identifier;
        } else {
          throw new Error('Masukkan email atau nomor telepon yang valid');
        }
      } else {
        body = {
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role
        };
      }

      const response = await fetch(`http://127.0.0.1:3001/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Terjadi kesalahan saat memproses permintaan');
      }

      if (isLogin) {
        login({
          username: result.user?.username || formData.identifier,
          role: result.user?.role || result.role,
          email: result.user?.email,
          phone: result.user?.phone,
          token: result.token
        });

        setMessage({ text: `Login berhasil sebagai ${result.user?.role || result.role}`, type: 'success' });

        // Determine redirect path
        const redirectPath = result.data?.redirect || 
          (result.role === 'admin' ? '/admin' :
           result.role === 'guru' ? '/guru' :
           result.role === 'tamu' ? '/tamu' : '/');
        
        setTimeout(() => navigate(redirectPath, { replace: true }), 100);
      } else {
        setMessage({ text: 'Registrasi berhasil! Silakan login', type: 'success' });
        toggleForm(); // This will reset the form and switch to login
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed showPassword implementation in the JSX
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
       <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[10%] md:top-[15%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[5%]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[30%] md:top-[35%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[25%]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-orange-400 rounded-xl top-[50%] md:top-[55%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[45%]" />
          <div className="absolute left-1/2 -translate-x-1/2 w-[150%] rotate-12 h-16 bg-[#1D3D4C] rounded-xl top-[70%] md:top-[75%] max-md:rotate-0 max-md:w-[120%] max-md:h-12 max-md:top-[65%]" />
      </div>
  
      <form onSubmit={handleSubmit} className="relative z-10 space-y-4 bg-white/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-center text-2xl font-bold text-[#1D3D4C]">
          {isLogin ? 'Login' : 'Register'}
        </h2>
  
        {isLogin ? (
          <div>
            <input
              type="text"
              name="identifier"
              placeholder="Email atau Nomor Telepon"
              className="w-full px-4 py-2 rounded-full shadow focus:outline-none"
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              required
            />
          </div>
        ) : (
          <>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-full shadow focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Nomor Telepon"
                className="w-full px-4 py-2 rounded-full shadow focus:outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </>
        )}

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-full shadow focus:outline-none"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
  
        {!isLogin && (
          <select
            name="role"
            className="w-full px-4 py-2 rounded-full shadow focus:outline-none"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          >
            <option value="">Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="guru">Guru</option>
            <option value="tamu">Tamu</option>
          </select>
        )}
  
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${isLoading ? 'bg-orange-300' : 'bg-orange-400 hover:bg-orange-500'} transition text-white py-2 rounded-full font-semibold`}
        >
          {isLoading ? 'Memproses...' : isLogin ? 'Log in' : 'Sign up'}
        </button>
  
        {message.text && (
          <p className={`text-center text-sm ${
            message.type === 'error' ? 'text-red-500' : 
            message.type === 'success' ? 'text-green-600' : 'text-blue-500'
          }`}>
            {message.text}
          </p>
        )}
  
        <button
          type="button"
          onClick={toggleForm}
          className="text-sm text-blue-600 hover:text-blue-800 underline block mx-auto"
        >
          {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;