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
    listImages(): Promise<any>;
    listVideos(): Promise<any>;
    getVideo(id: string): Promise<any>;
}
export {};
