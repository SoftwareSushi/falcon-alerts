import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
	onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Mock authentication - in real app would validate credentials
		onLogin();
		navigate('/dashboard');
	};

	return (
		<div className="min-h-screen flex">
			{/* Left Side - Branding */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 items-center justify-center p-12">
				<div className="text-center text-white max-w-md">
					<div className="mx-auto h-24 w-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-8">
						<svg
							className="h-14 w-14 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h1 className="text-5xl font-bold mb-6">Falcon Alerts</h1>
					<p className="text-xl text-indigo-100 leading-relaxed mb-8">
						Smart Background Intelligence for Smarter Business Decisions
					</p>
					<div className="space-y-4 text-left">
						<div className="flex items-center space-x-3">
							<svg
								className="h-6 w-6 text-green-300"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-indigo-100">
								Real-time background screening
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<svg
								className="h-6 w-6 text-green-300"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-indigo-100">
								Comprehensive data sources
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<svg
								className="h-6 w-6 text-green-300"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-indigo-100">
								Instant reporting & alerts
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Login Form */}
			<div className="flex-1 lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
				<div className="max-w-md w-full space-y-8">
					{/* Mobile Logo */}
					<div className="text-center lg:hidden">
						<div className="mx-auto h-16 w-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
							<svg
								className="h-10 w-10 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-3">
							Falcon Alerts
						</h2>
						<p className="text-gray-600">
							Smart Background Intelligence for Smarter Business Decisions
						</p>
					</div>

					{/* Welcome Text */}
					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Welcome back
						</h2>
						<p className="text-gray-600">
							Sign in to your account to continue
						</p>
					</div>

					<form
						className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
						onSubmit={handleSubmit}
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
								placeholder="Enter your email address"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
								placeholder="Enter your password"
							/>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
							>
								Sign In
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
