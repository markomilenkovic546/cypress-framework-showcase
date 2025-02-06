export type User = {
    firstName: string;
    lastName: string;
    location: string;
    occupation: string;
    email: string;
    password: string;
    pricture: string;
  };

  export type CreatedUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    picturePath: string;
    friends: string[]; 
    location: string;
    occupation: string;
    viewedProfile: number;
    impressions: number;
    _id: string; 
    createdAt: string; 
    updatedAt: string; 
    __v: number; 
};
