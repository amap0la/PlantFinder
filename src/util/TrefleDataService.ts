import axios from 'axios';
import { IFilterCollection, ISearchConfig, ISearchResults } from '../models/search';
import { ITrefleData, ITreflePlants } from '../models/trefle';
import { IPlantList } from '../models/plants';

const token = process.env.REACT_APP_TREFLE_TOKEN;
const trefleURL = 'https://trefle.io/api/v1';
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

const axiosInstance = axios.create({
    baseURL: `${corsAnywhere}${trefleURL}`,
    headers: {
        'Content-type': "application/json"
    }
});


let count = 0;


class TrefleDataService {
    
    getSimpleFilterQuery = (filterName: string, filterValue: string) => {
        return `&filter[${filterName}]=${filterValue}`;
    }


    getArrayFilterQuery = (filterName: string, filterValue: string[]) => {
        return `&filter[${filterName}]=${filterValue.join(',')}`;
    }

    getRangeFilterQuery = (filterName: string, filterValue: string[]) => {
        return `&range[${filterName}]=${filterValue[0]},${filterValue[1]}`;
    }

    getFilterQuery = (filters: IFilterCollection) => {
        let filterQueryValue = '';
        for (const [key, val] of Object.entries(filters)){
            if (val){
                const {filterType, filterValue} = val;
                switch(filterType){
                    case 'simple':
                        if (!Array.isArray(filterValue)){
                            filterQueryValue += this.getSimpleFilterQuery(key, filterValue);
                        }
                        break;
                    case 'array':
                        if (Array.isArray(filterValue)){
                            filterQueryValue += this.getArrayFilterQuery(key, filterValue);
                        }
                        break;
                    case 'range':
                        if (Array.isArray(filterValue) && filterValue.length === 2){
                            filterQueryValue += this.getRangeFilterQuery(key, filterValue);
                        }
                        break;
                    default:
                        console.log(`[TrefleDataService]: Filter ${key} doesn't have type (value: ${val})`);
                }
            }
        }
        return filterQueryValue;
    }


    formatResult = (trefleData: ITrefleData<ITreflePlants>): ISearchResults => {
        const arrayPlant = trefleData.data;
        let basicInfo: IPlantList = [];
        if (arrayPlant){
             basicInfo = arrayPlant.map((plant, i) => {
                count++;
                return {
                    basic: {
                        key: count,
                        commonName: plant.common_name,
                        scientificName: plant.scientific_name,
                        familyCommonName: plant.family_common_name,
                        image: plant.image_url
                    }
                }
            });
        }
        
        return {
            plantList: basicInfo,
            numResults: trefleData.meta.total,
            status: 'succeeded'
        };
    }

    buildUrl = (endpoint: string, query: string) => {
        return `${endpoint}?token=${token}${query}`;
    }

    getFromTrefle = async (config: ISearchConfig, endpoint: string) => {
        const {term, filters} = config;
        let suffix = '';
        let finalEndpoint = endpoint;
        if (term){
            finalEndpoint += '/search';
            suffix += `&q=${term}`
        }
        suffix += filters ? this.getFilterQuery(filters) : '';
        const url = this.buildUrl(finalEndpoint, suffix);
        let res = await axiosInstance.get(url);
        let searchResults = this.formatResult(res.data);
        
        /* TODO: fetch others pages results on scrolling/clicking a More button
        let moreSearchResults: ISearchResults;
        if (someCondition && res.data.links.self !== res.data.links.next){
            let page = new URL(trefleURL + res.data.links.next).searchParams.get('page');
            res = await axiosInstance.get(url + '&page=' + page);
            moreSearchResults = this.formatResult(res.data);
            searchResults.plantList = [...searchResults.plantList, ...moreSearchResults.plantList];
        }*/

        return searchResults;
    }

    getPlants = (config: ISearchConfig) => {
        return this.getFromTrefle(config, '/plants');
    }
    
}

export default new TrefleDataService();