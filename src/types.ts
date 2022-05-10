export type BusinessUserData = {
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

export type CustomerUserData = {
    name: string;
    phoneNumber: string;
    photoUrl: string;
    familyCardNumber: string;
    // preferredFoodCategories: Array<{ value: number; label: string }>;
    isBusinessAccount: boolean;
    email: string;
    uid: string;
}