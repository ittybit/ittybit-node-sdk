interface Config {
    token: string;
}
export declare class Ittybit {
    config: Config;
    private readonly apiurl;
    private readonly apiport;
    private readonly endpoint;
    constructor(config: Config);
    private request;
    private get;
    private delete;
    private upload;
    listImages(): Promise<any>;
    uploadImage(pathToImage: string): Promise<any>;
    getImage(id: string): Promise<any>;
    deleteImage(id: string): Promise<any>;
    listVideos(): Promise<any>;
    getVideo(id: string): Promise<any>;
    uploadVideo(pathToVideo: string): Promise<any>;
}
export {};
