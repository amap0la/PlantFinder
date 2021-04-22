

// Generic JSON Response
export interface ITrefleData<T> {
    data:  T[];
    links: ITreflePageLinks;
    meta:  Meta;
}


// GET /api/v1/plants
export interface ITreflePlants {
    id: number;
    common_name: string;
    slug: string;
    scientific_name: string;
    year: number;
    bibliography: string;
    author: string;
    status: string;
    rank: string;
    family_common_name: string;
    genus_id: number;
    image_url: string;
    synonyms: string[];
    genus: string;
    family: string;
    links: ITrefleDataLinks;
}

export interface ITrefleDataLinks {
    genus: string;
    plant: string;
    self:  string;
}

export interface ITreflePageLinks {
    first?: string;
    prev?: string;
    last?: string;
    next?: string;
    self?: string;
}

export interface Meta {
    total: number;
}