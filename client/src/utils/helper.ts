import {appName, appVersion} from "../config.json";

export function getCurrentDate(): string {
    const today: Date = new Date();
    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy: number = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

export function getAppName(): string {
    return `${appName} v${appVersion}`;
}

export function isValidNumber(val: any): boolean {
    return val !== null && !isNaN(val);
}

export function convertMinutesToDuration(minutes: number): number[] {
    const hourMinutes: number = 60;
    const dMinutes: number = minutes % hourMinutes;
    const dHours = Math.floor(minutes / hourMinutes);

    return [dHours, dMinutes];
}



