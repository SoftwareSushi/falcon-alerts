import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewCheck from './components/NewCheck';
import Processing from './components/Processing';
import Results from './components/Results';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<Router basename="/falcon-alerts">
			<div className="min-h-screen bg-gray-50">
				<Routes>
					<Route
						path="/login"
						element={
							isAuthenticated ? (
								<Navigate to="/dashboard" replace />
							) : (
								<Login onLogin={() => setIsAuthenticated(true)} />
							)
						}
					/>
					<Route
						path="/dashboard"
						element={
							isAuthenticated ? (
								<Dashboard onLogout={() => setIsAuthenticated(false)} />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route
						path="/new-check"
						element={
							isAuthenticated ? (
								<NewCheck />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route
						path="/processing"
						element={
							isAuthenticated ? (
								<Processing />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route
						path="/results"
						element={
							isAuthenticated ? (
								<Results />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route path="/" element={<Navigate to="/login" replace />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
