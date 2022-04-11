export type UserData = {
    coordinates: {
        latitude: number;
        latitudeDelta: number;
        longitude: number;
        longitudeDelta: number;
    },
    name: string;
    phoneNumber: string;
    pickupTime: string;
    email: string;
    uid: string;
    isBusinessAccount: boolean;
    products: Array<{ label: string; value: string }>;
};