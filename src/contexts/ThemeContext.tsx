import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
}) => {
	// Check for saved theme preference or default to dark mode
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('theme') as Theme;
		return savedTheme || 'dark';
	});

	useEffect(() => {
		// Apply theme to document root
		document.documentElement.setAttribute('data-theme', theme);
		// Save theme preference
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	const value = {
		theme,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
};
