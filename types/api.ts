export type PostType = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        avatar: string | null;
        email: string;
        telephone: string;
    };
    likes: number;
    comments: number;
    tags: {
        name: string;
    }[];
}

/* --- Payloads --- */
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

export type SignInPayload = {
    email: string;
    password: string;
}

export type PostSearchPayload = {
    page: number;
    limit: number;
}

/* --- Responses --- */
export type RegisterResponse = {
    statusCode: number;
    timeStamp: string;
    method: string;
    message: string;
    data: {
        message: string[];
        error: string;
        statusCode: number;
    }
};

export type SignInResponse = {
    accessToken: string;
    user: {
        id: number;
        email: string;
        firstname: string;
        lastname: string;
        telephone: string;
    }
}

export type PostResponse = PostType[];

export type PaginatedPostsResponse = {
    data: PostResponse; // Assuming PostResponse is the array type: PostType[]
    total: number; 
};
