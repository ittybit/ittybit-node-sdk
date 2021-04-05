import * as https from 'https';

interface Config {
  token: string;
}

export class Ittybit {
  config;

  private readonly apiurl = `api.ittybit.com`;
  private readonly apiport = 443;

  private readonly endpoint = {
    image: {
      list: '/images',
      get: (id: string) => `/image/${id}`,
    },
    video: {
      list: '/videos',
      get: (id: string) => `/video/${id}`,
    },
  };

  constructor(config: Config) {
    if (!config || (config && !config.token)) {
      throw new Error('Token is required');
    }

    this.config = config;
    console.log('Starting');
  }

  // Headers
  private async request(endpoint: string, method: string) {
    return new Promise(async (a, r) => {
      const opts = {
        host: this.apiurl,
        port: this.apiport,
        method: `${method}`,
        path: endpoint,
        headers: {
          'ittybit-token': this.config.token,
        },
      };

      let data: any = '';

      const req = https.request(opts, (res) => {
        res.on('data', (d) => {
          data += d;
        });

        res.on('close', (_: any) => {
          let payload;

          try {
            const nd = JSON.parse(data);
            payload = {
              code: res.statusCode,
              payload: nd,
            };
          } catch (e) {
            console.log('---');
            console.log(e);
            payload = {
              code: res.statusCode,
              message: e.message,
            };
          }
          a(payload);
        });
      });

      req.on('error', (error) => {
        console.error(error);
      });

      req.end();
    });
  }

  private async get(endpoint: string) {
    const getReq = await this.request(endpoint, 'GET');
    return getReq;
  }

  // private post() {}
  // private put() {}

  // Image
  // async getImage(id: string) {
  //   const image = await this.get(this.endpoint.image.get(id));
  //   console.log(image)
  //   // const getData = await this.get(this.endpoint.image.get(id));

  //   // console.log(getData)
  // }

  async listImages() {
    const images: any = await this.get(this.endpoint.image.list);
    if (images.code === 200) return images.payload;
    else throw new Error(images.payload.error.message);
  }

  // Video
  async listVideos() {
    const videos: any = await this.get(this.endpoint.video.list);
    if (videos.code === 200) return videos.payload;
    else throw new Error(videos.payload.error.message);
  }

  async getVideo(id: string) {
    const video: any = await this.get(this.endpoint.video.get(id));
    if (video.code === 200) return video.payload;
    else throw new Error(video.payload.error.message);
  }
}
