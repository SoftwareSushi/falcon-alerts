import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type EntityType = 'person' | 'business';

interface PersonForm {
	firstName: string;
	lastName: string;
	email: string;
	birthday: string;
	ssn: string;
	phoneNumbers: string[];
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	socialAccounts: {
		twitter: string;
		linkedin: string;
	};
}

interface BusinessForm {
	businessName: string;
	phoneNumbers: string[];
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
}

export default function NewCheck() {
	const navigate = useNavigate();
	const [entityType, setEntityType] = useState<EntityType>('person');
	const [personForm, setPersonForm] = useState<PersonForm>({
		firstName: '',
		lastName: '',
		email: '',
		birthday: '',
		ssn: '',
		phoneNumbers: [''],
		address: { street: '', city: '', state: '', zip: '' },
		socialAccounts: { twitter: '', linkedin: '' },
	});
	const [businessForm, setBusinessForm] = useState<BusinessForm>({
		businessName: '',
		phoneNumbers: [''],
		address: { street: '', city: '', state: '', zip: '' },
	});

	const addPhoneNumber = () => {
		if (entityType === 'person') {
			setPersonForm((prev) => ({
				...prev,
				phoneNumbers: [...prev.phoneNumbers, ''],
			}));
		} else {
			setBusinessForm((prev) => ({
				...prev,
				phoneNumbers: [...prev.phoneNumbers, ''],
			}));
		}
	};

	const updatePhoneNumber = (index: number, value: string) => {
		if (entityType === 'person') {
			setPersonForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.map((phone, i) =>
					i === index ? value : phone
				),
			}));
		} else {
			setBusinessForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.map((phone, i) =>
					i === index ? value : phone
				),
			}));
		}
	};

	const removePhoneNumber = (index: number) => {
		if (entityType === 'person') {
			setPersonForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
			}));
		} else {
			setBusinessForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
			}));
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Navigate to processing page
		navigate('/processing', {
			state: {
				entityType,
				data: entityType === 'person' ? personForm : businessForm,
			},
		});
	};

	const phoneNumbers =
		entityType === 'person'
			? personForm.phoneNumbers
			: businessForm.phoneNumbers;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div className="flex items-center">
							<button
								onClick={() => navigate('/dashboard')}
								className="mr-4 text-gray-500 hover:text-gray-700"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
								<svg
									className="h-5 w-5 text-white"
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
							<h1 className="text-2xl font-bold text-gray-900">
								New Background Check
							</h1>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow rounded-lg p-6"
				>
					{/* Entity Type Selection */}
					<div className="mb-8">
						<h2 className="text-lg font-medium text-gray-900 mb-4">
							Select Entity Type
						</h2>
						<div className="flex space-x-4">
							<label className="flex items-center">
								<input
									type="radio"
									name="entityType"
									value="person"
									checked={entityType === 'person'}
									onChange={(e) => setEntityType(e.target.value as EntityType)}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
								/>
								<span className="ml-2 text-sm font-medium text-gray-700">
									Person
								</span>
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									name="entityType"
									value="business"
									checked={entityType === 'business'}
									onChange={(e) => setEntityType(e.target.value as EntityType)}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
								/>
								<span className="ml-2 text-sm font-medium text-gray-700">
									Business
								</span>
							</label>
						</div>
					</div>

					{/* Dynamic Form */}
					{entityType === 'person' ? (
						<div className="space-y-6">
							<h2 className="text-lg font-medium text-gray-900">
								Person Information
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										First Name
									</label>
									<input
										type="text"
										required
										value={personForm.firstName}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												firstName: e.target.value,
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Name
									</label>
									<input
										type="text"
										required
										value={personForm.lastName}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												lastName: e.target.value,
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
									</label>
									<input
										type="email"
										required
										value={personForm.email}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Birthday
									</label>
									<input
										type="date"
										required
										value={personForm.birthday}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												birthday: e.target.value,
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									SSN
								</label>
								<input
									type="password"
									required
									value={personForm.ssn}
									onChange={(e) =>
										setPersonForm((prev) => ({ ...prev, ssn: e.target.value }))
									}
									placeholder="XXX-XX-XXXX"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* Phone Numbers */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Phone Numbers
								</label>
								{phoneNumbers.map((phone, index) => (
									<div key={index} className="flex mb-2">
										<input
											type="tel"
											value={phone}
											onChange={(e) => updatePhoneNumber(index, e.target.value)}
											placeholder="(555) 123-4567"
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
										{phoneNumbers.length > 1 && (
											<button
												type="button"
												onClick={() => removePhoneNumber(index)}
												className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
											>
												Remove
											</button>
										)}
									</div>
								))}
								<button
									type="button"
									onClick={addPhoneNumber}
									className="text-indigo-600 hover:text-indigo-800 text-sm"
								>
									+ Add Phone Number
								</button>
							</div>

							{/* Address */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Address
								</label>
								<div className="space-y-4">
									<input
										type="text"
										placeholder="Street Address"
										value={personForm.address.street}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												address: { ...prev.address, street: e.target.value },
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<input
											type="text"
											placeholder="City"
											value={personForm.address.city}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													address: { ...prev.address, city: e.target.value },
												}))
											}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
										<input
											type="text"
											placeholder="State"
											value={personForm.address.state}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													address: { ...prev.address, state: e.target.value },
												}))
											}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
										<input
											type="text"
											placeholder="ZIP Code"
											value={personForm.address.zip}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													address: { ...prev.address, zip: e.target.value },
												}))
											}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
								</div>
							</div>

							{/* Social Accounts */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Social Accounts (Optional)
								</label>
								<div className="space-y-4">
									<input
										type="text"
										placeholder="Twitter Username"
										value={personForm.socialAccounts.twitter}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												socialAccounts: {
													...prev.socialAccounts,
													twitter: e.target.value,
												},
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
									<input
										type="text"
										placeholder="LinkedIn Profile URL"
										value={personForm.socialAccounts.linkedin}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												socialAccounts: {
													...prev.socialAccounts,
													linkedin: e.target.value,
												},
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="space-y-6">
							<h2 className="text-lg font-medium text-gray-900">
								Business Information
							</h2>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Business Name
								</label>
								<input
									type="text"
									required
									value={businessForm.businessName}
									onChange={(e) =>
										setBusinessForm((prev) => ({
											...prev,
											businessName: e.target.value,
										}))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* Phone Numbers */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Phone Numbers
								</label>
								{phoneNumbers.map((phone, index) => (
									<div key={index} className="flex mb-2">
										<input
											type="tel"
											value={phone}
											onChange={(e) => updatePhoneNumber(index, e.target.value)}
											placeholder="(555) 123-4567"
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
										{phoneNumbers.length > 1 && (
											<button
												type="button"
												onClick={() => removePhoneNumber(index)}
												className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
											>
												Remove
											</button>
										)}
									</div>
								))}
								<button
									type="button"
									onClick={addPhoneNumber}
									className="text-indigo-600 hover:text-indigo-800 text-sm"
								>
									+ Add Phone Number
								</button>
							</div>

							{/* Address */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Business Address
								</label>
								<div className="space-y-4">
									<input
										type="text"
										placeholder="Street Address"
										value={businessForm.address.street}
										onChange={(e) =>
											setBusinessForm((prev) => ({
												...prev,
												address: { ...prev.address, street: e.target.value },
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									/>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<input
											type="text"
											placeholder="City"
											value={businessForm.address.city}
											onChange={(e) =>
												setBusinessForm((prev) => ({
													...prev,
													address: { ...prev.address, city: e.target.value },
												}))
											}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
										<input
											type="text"
											placeholder="State"
											value={businessForm.address.state}
											onChange={(e) =>
												setBusinessForm((prev) => ({
													...prev,
													address: { ...prev.address, state: e.target.value },
												}))
											}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
										<input
											type="text"
											placeholder="ZIP Code"
											value={businessForm.address.zip}
											onChange={(e) =>
												setBusinessForm((prev) => ({
													...prev,
													address: { ...prev.address, zip: e.target.value },
												}))
											}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Submit Button */}
					<div className="mt-8 pt-6 border-t border-gray-200">
						<button
							type="submit"
							className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
						>
							Submit Background Check
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
