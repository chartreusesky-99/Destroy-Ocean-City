export interface Alert {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    dismissible?: boolean;
}