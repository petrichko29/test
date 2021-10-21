import { CONFIG } from 'core/config';

export const ROUTES = {
    weatherByCity: (city: string) => `weather?q=${city}&appid=${CONFIG.apiKey}`,
    weatherByCoords: (coords: any) => `weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${CONFIG.apiKey}&units=metric`
}