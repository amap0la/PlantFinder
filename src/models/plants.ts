
export interface IPlant {
    basic: IBasicInfo;
}

export type IPlantList = IPlant[] | [];

export interface IBasicInfo {
    key: number;
    commonName: string;
    scientificName: string;
    familyCommonName: string;
    image: string
}