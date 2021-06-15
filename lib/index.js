"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ittybit = void 0;
var https = require("https");
var FormData = require("form-data");
var fs = require("fs");
var Ittybit = /** @class */ (function () {
    function Ittybit(config) {
        this.apiurl = "api.ittybit.com";
        this.apiport = 443;
        this.endpoint = {
            image: {
                upload: '/images/upload',
                list: '/images',
                get: function (id) { return "/images/" + id; },
            },
            video: {
                upload: '/videos/upload',
                list: '/videos',
                get: function (id) { return "/videos/" + id; },
            },
        };
        if (!config || (config && !config.token)) {
            throw new Error('Token is required');
        }
        this.config = config;
        console.log('Starting');
    }
    // Headers
    Ittybit.prototype.request = function (endpoint, method, content, contentType) {
        if (content === void 0) { content = null; }
        if (contentType === void 0) { contentType = 'application/json'; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (a, r) { return __awaiter(_this, void 0, void 0, function () {
                        var opts, data, req;
                        return __generator(this, function (_a) {
                            opts = {
                                host: this.apiurl,
                                port: this.apiport,
                                method: "" + method,
                                path: endpoint,
                                headers: {
                                    'content-type': contentType,
                                    Authorization: "Bearer " + this.config.token,
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
                            data = '';
                            req = https.request(opts, function (res) {
                                res.on('data', function (d) {
                                    data += d;
                                });
                                res.on('close', function (_) {
                                    var payload;
                                    try {
                                        var nd = JSON.parse(data);
                                        payload = {
                                            code: res.statusCode,
                                            payload: nd,
                                        };
                                    }
                                    catch (e) {
                                        console.log(e);
                                        payload = {
                                            code: res.statusCode,
                                            message: e.message,
                                        };
                                    }
                                    a(payload);
                                });
                            });
                            req.on('error', function (error) {
                                console.error(error);
                            });
                            req.end();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Ittybit.prototype.get = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var getReq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoint, 'GET')];
                    case 1:
                        getReq = _a.sent();
                        return [2 /*return*/, getReq];
                }
            });
        });
    };
    Ittybit.prototype.delete = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteReq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoint, 'DELETE')];
                    case 1:
                        deleteReq = _a.sent();
                        return [2 /*return*/, deleteReq];
                }
            });
        });
    };
    Ittybit.prototype.upload = function (endpoint, file, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (a, r) {
                        var formData = new FormData();
                        var httpsRequest = https.request({
                            host: _this.apiurl,
                            port: _this.apiport,
                            path: endpoint,
                            method: 'POST',
                            headers: __assign({ Authorization: "Bearer " + _this.config.token }, formData.getHeaders()),
                        }, function (resulting) {
                            resulting.on('data', function (data) {
                                var parsedData = JSON.parse(data);
                                if (parsedData.meta.status === 200) {
                                    return a(parsedData.data);
                                }
                                else
                                    r(parsedData.error);
                            });
                        });
                        httpsRequest.on('error', function (e) {
                            console.log(e);
                        });
                        formData.append(name, fs.createReadStream(file));
                        formData.pipe(httpsRequest);
                    })];
            });
        });
    };
    // private post() {}
    // private put() {}
    // Image
    Ittybit.prototype.listImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(this.endpoint.image.list)];
                    case 1:
                        images = _a.sent();
                        if (images.code === 200)
                            return [2 /*return*/, images.payload.data];
                        else
                            throw new Error(images.payload.error);
                        return [2 /*return*/];
                }
            });
        });
    };
    Ittybit.prototype.uploadImage = function (pathToImage) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadImage, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.upload(this.endpoint.image.upload, pathToImage, 'image')];
                    case 1:
                        uploadImage = (_a.sent());
                        return [2 /*return*/, uploadImage.id];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Ittybit.prototype.getImage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(this.endpoint.image.get(id))];
                    case 1:
                        image = _a.sent();
                        if (image.code === 200)
                            return [2 /*return*/, image.payload.data];
                        else
                            throw new Error(image.payload.error);
                        return [2 /*return*/];
                }
            });
        });
    };
    Ittybit.prototype.deleteImage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delete(this.endpoint.image.get(id))];
                    case 1:
                        deleteImage = _a.sent();
                        if (deleteImage.code === 200)
                            return [2 /*return*/, deleteImage.payload.data];
                        else
                            throw new Error(deleteImage.payload.error);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Video
    Ittybit.prototype.listVideos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var videos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(this.endpoint.video.list)];
                    case 1:
                        videos = _a.sent();
                        if (videos.code === 200)
                            return [2 /*return*/, videos.payload.data];
                        else
                            throw new Error(videos.payload.error.message);
                        return [2 /*return*/];
                }
            });
        });
    };
    Ittybit.prototype.getVideo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(this.endpoint.video.get(id))];
                    case 1:
                        video = _a.sent();
                        if (video.code === 200)
                            return [2 /*return*/, video.payload.data];
                        else
                            throw new Error(video.payload.error.message);
                        return [2 /*return*/];
                }
            });
        });
    };
    Ittybit.prototype.uploadVideo = function (pathToVideo) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadVideo, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.upload(this.endpoint.video.upload, pathToVideo, 'video')];
                    case 1:
                        uploadVideo = (_a.sent());
                        return [2 /*return*/, uploadVideo.id];
                    case 2:
                        e_2 = _a.sent();
                        throw new Error(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Ittybit;
}());
exports.Ittybit = Ittybit;
