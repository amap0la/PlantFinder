import { IPlantList } from './plants';


export interface ISearchConfig {
    term: string;
    filters: IFilterCollection;
}

export type IFilterContentAny = IFilterContent<string> | IFilterContent<string[]>;

export interface IFilterContent<T> {
    filterType: string;
    filterValue: T;

}

export interface IFilterCollection {
    [filterName: string]: IFilterContentAny
}

export type ISearchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ISearchResults extends ISearchTrefleResults {
    status: ISearchStatus;
}

export interface ISearchTrefleResults {
    plantList: IPlantList;
    numResults: number;
}

/*export interface ISearch {
    term: string;
    filters: IFilters[] | [];
    searchResults: IResults[] | [];
}

export interface ISearchResults {
    results: IResults | {};
    APIInfos: IAPIStatus
}*/