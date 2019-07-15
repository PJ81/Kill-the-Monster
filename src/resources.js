import * as Const from "./const.js"

export default class Resources {
    constructor(cb) {
        this.images = new Array(30);

        Promise.all([
            (this.loadImage("./img/back.jpg")).then((i) => {
                this.images[Const.BACK] = i;
            }),
            (this.loadImage("./img/house.png")).then((i) => {
                this.images[Const.HOUSE] = i;
            }),
            (this.loadImage("./img/moon.png")).then((i) => {
                this.images[Const.MOON] = i;
            }),
            (this.loadImage("./img/windows.png")).then((i) => {
                this.images[Const.WINDOWS] = i;
            }),
            (this.loadImage("./img/m1.png")).then((i) => {
                this.images[Const.M1] = i;
            }),
            (this.loadImage("./img/m2.png")).then((i) => {
                this.images[Const.M2] = i;
            }),
            (this.loadImage("./img/m3.png")).then((i) => {
                this.images[Const.M3] = i;
            }),
            (this.loadImage("./img/m4.png")).then((i) => {
                this.images[Const.M4] = i;
            }),
            (this.loadImage("./img/m5.png")).then((i) => {
                this.images[Const.M5] = i;
            }),
            (this.loadImage("./img/m6.png")).then((i) => {
                this.images[Const.M6] = i;
            }),
            (this.loadImage("./img/m7.png")).then((i) => {
                this.images[Const.M7] = i;
            }),
            (this.loadImage("./img/m8.png")).then((i) => {
                this.images[Const.M8] = i;
            }),
            (this.loadImage("./img/m9.png")).then((i) => {
                this.images[Const.M9] = i;
            }),
            (this.loadImage("./img/ch.gif")).then((i) => {
                this.images[Const.CH] = i;
            })
            /*(this.loadImage("./img/m1w.png")).then((i) => {
                this.images[Const.M1W] = i;
            }),
            (this.loadImage("./img/m2w.png")).then((i) => {
                this.images[Const.M2W] = i;
            }),
            (this.loadImage("./img/m3w.png")).then((i) => {
                this.images[Const.M3W] = i;
            }),
            (this.loadImage("./img/m4w.png")).then((i) => {
                this.images[Const.M4W] = i;
            }),
            (this.loadImage("./img/m5w.png")).then((i) => {
                this.images[Const.M5W] = i;
            }),
            (this.loadImage("./img/m6w.png")).then((i) => {
                this.images[Const.M6W] = i;
            }),
            (this.loadImage("./img/m7w.png")).then((i) => {
                this.images[Const.M7W] = i;
            }),
            (this.loadImage("./img/m8w.png")).then((i) => {
                this.images[Const.M8W] = i;
            }),
            (this.loadImage("./img/m9w.png")).then((i) => {
                this.images[Const.M9W] = i;
            })*/
        ]).then(() => {
            cb();
        });
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });
    }
}