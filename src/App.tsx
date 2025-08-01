import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewCheck from './components/NewCheck';
import Processing from './components/Processing';
import Results from './components/Results';
import Watchlist from './components/Watchlist';
import Alerts from './components/Alerts';
import SuspiciousRegistry from './components/SuspiciousRegistry';
import ERPIntegration from './components/ERPIntegration';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<ThemeProvider>
			<Router basename="/sanction-watch">
				<div
					className="min-h-screen"
					style={{ backgroundColor: 'var(--bg-primary)' }}
				>
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
						<Route
							path="/watchlist"
							element={
								isAuthenticated ? (
									<Watchlist />
								) : (
									<Navigate to="/login" replace />
								)
							}
						/>
						<Route
							path="/alerts"
							element={
								isAuthenticated ? (
									<Alerts />
								) : (
									<Navigate to="/login" replace />
								)
							}
						/>
						<Route
							path="/registry"
							element={
								isAuthenticated ? (
									<SuspiciousRegistry />
								) : (
									<Navigate to="/login" replace />
								)
							}
						/>
						<Route
							path="/integrations"
							element={
								isAuthenticated ? (
									<ERPIntegration />
								) : (
									<Navigate to="/login" replace />
								)
							}
						/>
						<Route path="/" element={<Navigate to="/login" replace />} />
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
