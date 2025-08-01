import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import heroVideo from '../assets/hero-video.mp4';

export default function LandingPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	const handleStartTrial = () => {
		navigate('/login');
	};

	const handleGetStarted = () => {
		navigate('/login');
	};

	const handleEmailSignup = (e: React.FormEvent) => {
		e.preventDefault();
		// In production, this would submit to email service
		alert(
			`Thank you! We'll send the FTO Compliance Checklist to ${email}`
		);
		setEmail('');
	};

	const features = [
		{
			icon: (
				<svg
					className="w-8 h-8"
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
			),
			title: 'Entity Risk Scanner',
			description:
				'Comprehensive screening against OFAC SDN, DEA, UN Sanctions, FTO lists, and known cartel front companies with AI-powered pattern recognition.',
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 17h5l-5 5v-5zM9 1H4a2 2 0 00-2 2v5h5V3a2 2 0 012-2zM11 8H6v5h5V8zM19 8h-5v5h5V8z"
					/>
				</svg>
			),
			title: 'Watchlist Monitoring & Alerts',
			description:
				'Real-time monitoring with automated alerts when entities become newly linked to FTOs, TCOs, or sanctioned lists.',
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
				</svg>
			),
			title: 'Suspicious Port & Person Registry',
			description:
				'Proprietary database of flagged ports, freight handlers, brokers, and business facilitators updated quarterly through OSINT and partner agencies.',
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
			),
			title: 'Training & Certification Hub',
			description:
				'Comprehensive courses on FTO supply chain risk, front company identification, sanctions evasion, and cartel trade finance tactics.',
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
					/>
				</svg>
			),
			title: 'ERP/CRM Integration',
			description:
				'Seamless integration with SAP, Oracle, Salesforce, and other enterprise systems for automated compliance workflows.',
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
					/>
				</svg>
			),
			title: 'Red Zone Radar™',
			description:
				'Live threat map showing current cartel and FTO smuggling routes, maritime seizures, and trade chokepoints for enhanced situational awareness.',
		},
	];

	const testimonials = [
		{
			quote:
				'Sanction Watch helped us identify a potential cartel connection in our supply chain before entering a multi-million dollar partnership. The ROI was immediate.',
			author: 'Sarah Chen',
			role: 'Chief Compliance Officer',
			company: 'Global Manufacturing Corp',
		},
		{
			quote:
				'The real-time monitoring saved us from a sanctions violation that could have cost us our banking relationships. Indispensable for international trade.',
			author: 'Michael Rodriguez',
			role: 'Risk Manager',
			company: 'International Logistics Solutions',
		},
		{
			quote:
				'The training modules brought our entire compliance team up to speed on FTO risks. The certification is now part of our onboarding process.',
			author: 'Jennifer Walsh',
			role: 'Legal Director',
			company: 'Maritime Trading Alliance',
		},
	];

	const targetAudiences = [
		{
			title: 'Multinational Corporations',
			description:
				'Companies with exposure to Latin America, West Africa, Southeast Asia',
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
					/>
				</svg>
			),
		},
		{
			title: 'Logistics & Transportation',
			description:
				'Freight forwarders, import/export companies, maritime operators',
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
					/>
				</svg>
			),
		},
		{
			title: 'Financial Services',
			description:
				'KYC teams, AML units, insurance companies, trade finance institutions',
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
					/>
				</svg>
			),
		},
		{
			title: 'Legal & Professional Services',
			description:
				'Law firms, compliance consulting, forensic investigators',
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-3m-3 3l-3-3"
					/>
				</svg>
			),
		},
	];

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: 'var(--bg-primary)' }}
		>
			{/* Header */}
			<header
				className="sticky top-0 z-50 border-b"
				style={{
					backgroundColor: 'var(--bg-secondary)',
					borderColor: 'var(--border-primary)',
				}}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div
								className="w-10 h-10 rounded-lg flex items-center justify-center"
								style={{ backgroundColor: '#07C30A' }}
							>
								<svg
									className="w-6 h-6 text-white"
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
							<div>
								<h1
									className="text-2xl font-bold"
									style={{ color: 'var(--text-primary)' }}
								>
									Sanction Watch
								</h1>
								<p
									className="text-sm"
									style={{ color: 'var(--text-secondary)' }}
								>
									Risk Intelligence Platform
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<ThemeToggle />
							<button onClick={handleGetStarted} className="btn btn-primary">
								Get Started
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative py-20 px-6 overflow-hidden">
				{/* Video Background */}
				<video
					autoPlay
					muted
					loop
					playsInline
					src={heroVideo}
					className="absolute inset-0 w-full h-full object-cover z-0"
				>
					<source src={heroVideo} type="video/mp4" />
				</video>

				{/* Overlay for better text readability */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>

				<div className="relative z-20 max-w-7xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
						Protect Your Business From
						<span style={{ color: '#07C30A' }} className="block">
							Dangerous Entities
						</span>
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-white">
						Identify links to Foreign Terrorist Organizations, Transnational
						Criminal Organizations, and sanctioned entities before they
						impact your business operations.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
						<button
							onClick={handleStartTrial}
							className="btn btn-primary btn-lg px-8 py-4 text-lg"
						>
							Start 7-Day Free Trial
						</button>
						<button
							onClick={() =>
								document
									.getElementById('features')
									?.scrollIntoView({ behavior: 'smooth' })
							}
							className="btn btn-outline btn-lg px-8 py-4 text-lg"
						>
							Learn More
						</button>
					</div>
					<div className="flex flex-wrap justify-center gap-8 text-sm text-white">
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>No Credit Card Required</span>
						</div>
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>Setup in Minutes</span>
						</div>
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>Enterprise-Grade Security</span>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="py-20 px-6"
				style={{ backgroundColor: 'var(--bg-secondary)' }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2
							className="text-4xl font-bold mb-4"
							style={{ color: 'var(--text-primary)' }}
						>
							Comprehensive Risk Intelligence
						</h2>
						<p
							className="text-xl max-w-3xl mx-auto"
							style={{ color: 'var(--text-secondary)' }}
						>
							Advanced AI-powered screening and monitoring capabilities to
							protect your business from legal, financial, and reputational
							harm.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="p-8 rounded-xl border"
								style={{
									backgroundColor: 'var(--bg-primary)',
									borderColor: 'var(--border-primary)',
								}}
							>
								<div style={{ color: '#07C30A' }} className="mb-4">
									{feature.icon}
								</div>
								<h3
									className="text-xl font-semibold mb-3"
									style={{ color: 'var(--text-primary)' }}
								>
									{feature.title}
								</h3>
								<p style={{ color: 'var(--text-secondary)' }}>
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Target Audiences */}
			<section className="py-20 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2
							className="text-4xl font-bold mb-4"
							style={{ color: 'var(--text-primary)' }}
						>
							Trusted by Industry Leaders
						</h2>
						<p
							className="text-xl max-w-3xl mx-auto"
							style={{ color: 'var(--text-secondary)' }}
						>
							Organizations across multiple industries rely on Sanction Watch
							for comprehensive risk intelligence.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{targetAudiences.map((audience, index) => (
							<div
								key={index}
								className="p-6 rounded-xl border text-center"
								style={{
									backgroundColor: 'var(--bg-secondary)',
									borderColor: 'var(--border-primary)',
								}}
							>
								<div
									style={{ color: '#07C30A' }}
									className="mb-4 flex justify-center"
								>
									{audience.icon}
								</div>
								<h3
									className="text-lg font-semibold mb-2"
									style={{ color: 'var(--text-primary)' }}
								>
									{audience.title}
								</h3>
								<p
									className="text-sm"
									style={{ color: 'var(--text-secondary)' }}
								>
									{audience.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section
				id="pricing"
				className="py-20 px-6"
				style={{ backgroundColor: 'var(--bg-secondary)' }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2
							className="text-4xl font-bold mb-4"
							style={{ color: 'var(--text-primary)' }}
						>
							Simple, Transparent Pricing
						</h2>
						<p
							className="text-xl max-w-3xl mx-auto"
							style={{ color: 'var(--text-secondary)' }}
						>
							Choose the plan that fits your organization's needs. All plans
							include our core screening capabilities.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Essentials Plan */}
						<div
							className="p-8 rounded-xl border"
							style={{
								backgroundColor: 'var(--bg-primary)',
								borderColor: 'var(--border-primary)',
							}}
						>
							<div className="text-center mb-8">
								<h3
									className="text-2xl font-bold mb-2"
									style={{ color: 'var(--text-primary)' }}
								>
									Essentials
								</h3>
								<div
									className="text-4xl font-bold mb-4"
									style={{ color: 'var(--text-primary)' }}
								>
									$299
									<span
										className="text-lg font-normal"
										style={{ color: 'var(--text-secondary)' }}
									>
										/month
									</span>
								</div>
								<p style={{ color: 'var(--text-secondary)' }}>
									Perfect for small teams
								</p>
							</div>
							<ul className="space-y-3 mb-8">
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										5 entity scans per month
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Basic reporting
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Email alerts
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Limited training access
									</span>
								</li>
							</ul>
							<button
								onClick={handleStartTrial}
								className="btn btn-outline w-full"
							>
								Start Free Trial
							</button>
						</div>

						{/* Professional Plan */}
						<div
							className="p-8 rounded-xl border-2 relative"
							style={{
								backgroundColor: 'var(--bg-primary)',
								borderColor: '#07C30A',
							}}
						>
							<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<span
									className="text-white px-4 py-1 rounded-full text-sm font-semibold"
									style={{ backgroundColor: '#07C30A' }}
								>
									Most Popular
								</span>
							</div>
							<div className="text-center mb-8">
								<h3
									className="text-2xl font-bold mb-2"
									style={{ color: 'var(--text-primary)' }}
								>
									Professional
								</h3>
								<div
									className="text-4xl font-bold mb-4"
									style={{ color: 'var(--text-primary)' }}
								>
									$999
									<span
										className="text-lg font-normal"
										style={{ color: 'var(--text-secondary)' }}
									>
										/month
									</span>
								</div>
								<p style={{ color: 'var(--text-secondary)' }}>
									For growing businesses
								</p>
							</div>
							<ul className="space-y-3 mb-8">
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Unlimited entity scans
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Real-time alert monitoring
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Advanced reporting
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Priority support
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Basic ERP/CRM integrations
									</span>
								</li>
							</ul>
							<button
								onClick={handleStartTrial}
								className="btn btn-primary w-full"
							>
								Start Free Trial
							</button>
						</div>

						{/* Enterprise Plan */}
						<div
							className="p-8 rounded-xl border"
							style={{
								backgroundColor: 'var(--bg-primary)',
								borderColor: 'var(--border-primary)',
							}}
						>
							<div className="text-center mb-8">
								<h3
									className="text-2xl font-bold mb-2"
									style={{ color: 'var(--text-primary)' }}
								>
									Enterprise
								</h3>
								<div
									className="text-4xl font-bold mb-4"
									style={{ color: 'var(--text-primary)' }}
								>
									Custom
								</div>
								<p style={{ color: 'var(--text-secondary)' }}>
									For large organizations
								</p>
							</div>
							<ul className="space-y-3 mb-8">
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Full API access
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Live analyst review
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Custom intelligence feeds
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										White-label options
									</span>
								</li>
								<li className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span style={{ color: 'var(--text-secondary)' }}>
										Dedicated training
									</span>
								</li>
							</ul>
							<button
								onClick={handleStartTrial}
								className="btn btn-outline w-full"
							>
								Contact Sales
							</button>
						</div>
					</div>
					<div className="text-center mt-12">
						<p style={{ color: 'var(--text-secondary)' }}>
							<span className="font-semibold">Special Offer:</span> Get 2
							free months when you commit to a 6-month contract
						</p>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2
							className="text-4xl font-bold mb-4"
							style={{ color: 'var(--text-primary)' }}
						>
							What Our Customers Say
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="p-6 rounded-xl border"
								style={{
									backgroundColor: 'var(--bg-secondary)',
									borderColor: 'var(--border-primary)',
								}}
							>
								<div style={{ color: '#07C30A' }} className="mb-4">
									<svg
										className="w-8 h-8"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<p
									className="mb-4 text-lg"
									style={{ color: 'var(--text-secondary)' }}
								>
									"{testimonial.quote}"
								</p>
								<div>
									<p
										className="font-semibold"
										style={{ color: 'var(--text-primary)' }}
									>
										{testimonial.author}
									</p>
									<p
										className="text-sm"
										style={{ color: 'var(--text-secondary)' }}
									>
										{testimonial.role}, {testimonial.company}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Marketing & Outreach CTA */}
			<section
				className="py-20 px-6"
				style={{ backgroundColor: 'var(--bg-secondary)' }}
			>
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2
							className="text-4xl font-bold mb-4"
							style={{ color: 'var(--text-primary)' }}
						>
							Get Started Today
						</h2>
						<p
							className="text-xl"
							style={{ color: 'var(--text-secondary)' }}
						>
							Choose how you'd like to begin protecting your business
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Free Resources */}
						<div
							className="p-8 rounded-xl border"
							style={{
								backgroundColor: 'var(--bg-primary)',
								borderColor: 'var(--border-primary)',
							}}
						>
							<h3
								className="text-2xl font-bold mb-4"
								style={{ color: 'var(--text-primary)' }}
							>
								Free FTO Compliance Checklist
							</h3>
							<p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
								Download our comprehensive checklist to start identifying FTO
								risks in your supply chain today.
							</p>
							<form onSubmit={handleEmailSignup} className="space-y-4">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your business email"
									className="input input-bordered w-full"
									required
								/>
								<button type="submit" className="btn btn-primary w-full">
									Download Free Checklist
								</button>
							</form>
						</div>

						{/* Webinar */}
						<div
							className="p-8 rounded-xl border"
							style={{
								backgroundColor: 'var(--bg-primary)',
								borderColor: 'var(--border-primary)',
							}}
						>
							<h3
								className="text-2xl font-bold mb-4"
								style={{ color: 'var(--text-primary)' }}
							>
								Free Webinar
							</h3>
							<p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
								Join our live webinar: "How to Avoid Doing Business with a
								Cartel: Practical Steps for Compliance"
							</p>
							<div className="space-y-4">
								<div
									className="text-sm"
									style={{ color: 'var(--text-secondary)' }}
								>
									Next session: January 25, 2024 at 2:00 PM EST
								</div>
								<button
									onClick={handleStartTrial}
									className="btn btn-outline w-full"
								>
									Register for Webinar
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-20 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h2
						className="text-4xl font-bold mb-6"
						style={{ color: 'var(--text-primary)' }}
					>
						Ready to Protect Your Business?
					</h2>
					<p
						className="text-xl mb-8"
						style={{ color: 'var(--text-secondary)' }}
					>
						Start your 7-day free trial today. No credit card required.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={handleStartTrial}
							className="btn btn-primary btn-lg px-8 py-4"
						>
							Start Free Trial
						</button>
						<button
							onClick={() =>
								window.open('mailto:sales@sanctionwatch.com', '_blank')
							}
							className="btn btn-outline btn-lg px-8 py-4"
						>
							Contact Sales
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer
				className="py-12 px-6 border-t"
				style={{
					backgroundColor: 'var(--bg-secondary)',
					borderColor: 'var(--border-primary)',
				}}
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-3 mb-4">
								<div
									className="w-8 h-8 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: '#07C30A' }}
								>
									<svg
										className="w-5 h-5 text-white"
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
								<span
									className="text-xl font-bold"
									style={{ color: 'var(--text-primary)' }}
								>
									Sanction Watch
								</span>
							</div>
							<p
								className="text-sm mb-4"
								style={{ color: 'var(--text-secondary)' }}
							>
								Protecting businesses from dangerous entities through advanced
								risk intelligence.
							</p>
						</div>
						<div>
							<h4
								className="font-semibold mb-4"
								style={{ color: 'var(--text-primary)' }}
							>
								Product
							</h4>
							<ul
								className="space-y-2 text-sm"
								style={{ color: 'var(--text-secondary)' }}
							>
								<li>
									<a href="#features" className="hover:text-[#07C30A]">
										Features
									</a>
								</li>
								<li>
									<a href="#pricing" className="hover:text-[#07C30A]">
										Pricing
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										API
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Integrations
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4
								className="font-semibold mb-4"
								style={{ color: 'var(--text-primary)' }}
							>
								Resources
							</h4>
							<ul
								className="space-y-2 text-sm"
								style={{ color: 'var(--text-secondary)' }}
							>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Training Hub
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Documentation
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Blog
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Webinars
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4
								className="font-semibold mb-4"
								style={{ color: 'var(--text-primary)' }}
							>
								Company
							</h4>
							<ul
								className="space-y-2 text-sm"
								style={{ color: 'var(--text-secondary)' }}
							>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										About
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Contact
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Privacy
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-[#07C30A]">
										Terms
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div
						className="border-t pt-8 mt-8 text-center text-sm"
						style={{
							borderColor: 'var(--border-primary)',
							color: 'var(--text-secondary)',
						}}
					>
						<p>&copy; 2025 Sanction Watch. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
