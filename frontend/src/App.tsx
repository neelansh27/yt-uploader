// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import Protected from './components/Protected';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/home"
                            element={
                                <Protected>
                                    <Home />
                                </Protected>
                            }
                        />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;