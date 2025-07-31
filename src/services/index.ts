export { WatchlistService } from './watchlistService';
export { ScreeningService } from './screeningService';

// Service instances for easy access
export const watchlistService = WatchlistService.getInstance();
export const screeningService = ScreeningService.getInstance();
