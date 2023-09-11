export interface Bike {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: BikeType;
  rating: number;
  photoUrl: string;
}

//Likely driven from theoretical API values, specifically in this example project numbering these here for ease in our .json stubbed data in our case
export enum BikeType {
  Mountain = 0,
  Street = 1,
  BMX = 2,
  Kids = 3,
  Tandem = 4,
  Pennyfarthing = 5,
}
