// custom model for places searched
export interface PlaceModel {
  coord: {
    lat: string;
    lon: string;
  };
  id: string;
  insee: string;
  label: string;
  level: number;
  name: string;
  zip_code: string;
}
