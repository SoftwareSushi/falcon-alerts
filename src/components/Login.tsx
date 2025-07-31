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
		<div
			className="min-h-screen flex"
			style={{ backgroundColor: 'var(--color-gray-50)' }}
		>
			{/* Left Side - Branding */}
			<div
				className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
				style={{ backgroundColor: 'var(--color-gray-900)' }}
			>
				<div className="text-center text-white max-w-md">
					<div
						className="mx-auto h-20 w-20 rounded-2xl flex items-center justify-center mb-8"
						style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
					>
						<svg
							className="h-12 w-12 text-white"
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
					<h1 className="text-4xl font-semibold mb-6">Sanction Watch</h1>
					<p
						className="text-lg leading-relaxed mb-12"
						style={{ color: 'var(--color-gray-300)' }}
					>
						Smart Background Intelligence for Smarter Business Decisions
					</p>
					<div className="space-y-4 text-left">
						<div className="flex items-center space-x-3">
							<div
								className="w-6 h-6 rounded-full flex items-center justify-center"
								style={{ backgroundColor: 'var(--color-green-500)' }}
							>
								<svg
									className="h-3 w-3 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<span style={{ color: 'var(--color-gray-300)' }}>
								Real-time background screening
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<div
								className="w-6 h-6 rounded-full flex items-center justify-center"
								style={{ backgroundColor: 'var(--color-green-500)' }}
							>
								<svg
									className="h-3 w-3 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<span style={{ color: 'var(--color-gray-300)' }}>
								Comprehensive data sources
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<div
								className="w-6 h-6 rounded-full flex items-center justify-center"
								style={{ backgroundColor: 'var(--color-green-500)' }}
							>
								<svg
									className="h-3 w-3 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<span style={{ color: 'var(--color-gray-300)' }}>
								Instant reporting & alerts
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Login Form */}
			<div
				className="flex-1 lg:w-1/2 flex items-center justify-center p-8"
				style={{ backgroundColor: 'var(--color-gray-50)' }}
			>
				<div className="max-w-md w-full space-y-8">
					{/* Mobile Logo */}
					<div className="text-center lg:hidden">
						<div
							className="mx-auto h-14 w-14 rounded-lg flex items-center justify-center mb-6"
							style={{ backgroundColor: 'var(--color-gray-900)' }}
						>
							<svg
								className="h-8 w-8 text-white"
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
						<h2
							className="text-2xl font-semibold mb-3"
							style={{ color: 'var(--color-gray-900)' }}
						>
							Sanction Watch
						</h2>
						<p style={{ color: 'var(--color-gray-600)' }}>
							Smart Background Intelligence for Smarter Business Decisions
						</p>
					</div>

					{/* Welcome Text */}
					<div className="text-center">
						<h2
							className="text-2xl font-semibold mb-2"
							style={{ color: 'var(--color-gray-900)' }}
						>
							Welcome back
						</h2>
						<p style={{ color: 'var(--color-gray-600)' }}>
							Sign in to your account to continue
						</p>
					</div>

					<form
						className="card space-y-6"
						style={{ padding: '32px' }}
						onSubmit={handleSubmit}
					>
						<div>
							<label htmlFor="email" className="form-label">
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
								className="form-input"
								placeholder="Enter your email address"
							/>
						</div>

						<div>
							<label htmlFor="password" className="form-label">
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
								className="form-input"
								placeholder="Enter your password"
							/>
						</div>

						<div>
							<button
								type="submit"
								className="w-full btn btn-primary"
								style={{ padding: '16px 24px', fontSize: '16px' }}
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
