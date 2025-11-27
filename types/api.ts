
export type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    confirmPassword: string;
    avatar: string | null;
    address: { 
        street: string;
        number: string; 
        city: string;
        state: string;
        postalCode: string;
        fullAddress: string;
        streetName: string;
        streetNumber: string;
        googlePlaceId: string;
        lng: number;
        lat: number;
        country: string; 
        suburb: string;
        postcode: string;
    };
};