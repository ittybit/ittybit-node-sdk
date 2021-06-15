import * as https from 'https';
import * as FormData from 'form-data';

import * as fs from 'fs';
// import * as path from 'path';

interface Config {
  token: string;
}

export class Ittybit {
  config;

  private readonly apiurl = `api.ittybit.com`;
  private readonly apiport = 443;

  private readonly endpoint = {
    image: {
      upload: '/images/upload',
      list: '/images',
      get: (id: string) => `/images/${id}`,
    },
    video: {
      upload: '/videos/upload',
      list: '/videos',
      get: (id: string) => `/videos/${id}`,
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
  private async request(endpoint: string, method: string, content: any = null, contentType = 'application/json') {
    return new Promise(async (a, r) => {
      const opts = {
        host: this.apiurl,
        port: this.apiport,
        method: `${method}`,
        path: endpoint,
        headers: {
          'content-type': contentType,
          Authorization: `Bearer ${this.config.token}`,
        },
        body: null,
        formData: null,
      };

      if (content) {
        opts.body = content;
      }

      if (contentType === 'multipart/form-data; boundary=xxxxxxxxxx') {
        opts.formData = content;
      }

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

  private async delete(endpoint: string) {
    const deleteReq = await this.request(endpoint, 'DELETE');
    return deleteReq;
  }

  private async upload(endpoint: string, file: any, name: string) {
    return new Promise((a, r) => {
      const formData = new FormData();

      const httpsRequest = https.request(
        {
          host: this.apiurl,
          port: this.apiport,
          path: endpoint,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.token}`,
            ...formData.getHeaders(),
          },
        },
        (resulting) => {
          resulting.on('data', (data) => {
            const parsedData = JSON.parse(data);
            if (parsedData.meta.status === 200) {
              return a(parsedData.data);
            } else r(parsedData.error);
          });
        },
      );

      httpsRequest.on('error', (e) => {
        console.log(e);
      });

      formData.append(name, fs.createReadStream(file));
      formData.pipe(httpsRequest);
    });
  }

  // private post() {}
  // private put() {}

  // Image
  async listImages() {
    const images: any = await this.get(this.endpoint.image.list);
    if (images.code === 200) return images.payload.data;
    else throw new Error(images.payload.error);
  }

  async uploadImage(pathToImage: string) {
    try {
      const uploadImage = (await this.upload(this.endpoint.image.upload, pathToImage, 'image')) as any;
      return uploadImage.id;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getImage(id: string) {
    const image: any = await this.get(this.endpoint.image.get(id));
    if (image.code === 200) return image.payload.data;
    else throw new Error(image.payload.error);
  }

  async deleteImage(id: string) {
    const deleteImage: any = await this.delete(this.endpoint.image.get(id));

    if (deleteImage.code === 200) return deleteImage.payload.data;
    else throw new Error(deleteImage.payload.error);
  }

  // Video
  async listVideos() {
    const videos: any = await this.get(this.endpoint.video.list);
    if (videos.code === 200) return videos.payload.data;
    else throw new Error(videos.payload.error.message);
  }

  async getVideo(id: string) {
    const video: any = await this.get(this.endpoint.video.get(id));
    if (video.code === 200) return video.payload.data;
    else throw new Error(video.payload.error.message);
  }

  async uploadVideo(pathToVideo: string) {
    try {
      const uploadVideo = (await this.upload(this.endpoint.video.upload, pathToVideo, 'video')) as any;
      return uploadVideo.id;
    } catch (e) {
      throw new Error(e);
    }
  }
}
