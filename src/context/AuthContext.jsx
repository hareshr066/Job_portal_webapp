import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mocking API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@jobportal.com' && password === 'admin123') {
          const userData = { id: 1, email, name: 'Admin User', role: 'admin' };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else if (email && password) {
          const userData = { id: 2, email, name: 'Job Seeker', role: 'user' };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = { id: Date.now(), name, email, role: 'user' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
