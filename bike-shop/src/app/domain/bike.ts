export interface Bike {
  id: string;
  description: string;
  price: number;
  quantity: number;
  type: BikeType;
  rating: number;
  photoUrl: string;
}

export enum BikeType {
  Mountain,
  Street,
  BMX,
  Kids,
  Tandem,
  Pennyfarthing,
}
