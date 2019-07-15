import Game from "./game.js"
import * as Const from "./const.js";
import Point from "./point.js";
import Resources from "./resources.js";
import Sound from "./sound.js";
import Timer from "./timer.js";

class KtM extends Game {
    constructor() {
        super();

        this.timerCtx = document.getElementById("timer").getContext("2d");

        this.canvas.addEventListener("click", (e) => {
            this.click(e);
        }, false);
        this.canvas.addEventListener("touchstart", (e) => {
            this.click(e)
        }, false);

        this.canvas.addEventListener("mousemove", (e) => {
            this.mouse.set(e.offsetX / Const.SCALE, e.offsetY / Const.SCALE);
        }, false);

        this.state;
        this.selection;
        this.mouse = new Point(Const.WIDTH >> 1, Const.HEIGHT >> 1);
        this.timer = new Timer(15, new Point(50, 50));
        this.score;
        this.hiscore = 0;
        this.shotSnd = 0;

        this.sound = new Sound([
            "./snd/shotgun.mp3", "./snd/shotgun.mp3", "./snd/shotgun.mp3", "./snd/shotgun.mp3", "./snd/failed.mp3"
        ]);

        this.res = new Resources(() => {
            this.load();
            this.loop();
        });

        this.moon = {
            pos: new Point(-Math.cos(1.2), -Math.sin(1.2)),
            ang: 1.2,
            time: 30
        };
        this.monsters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.otherMs = [];

        this.positions = [new Point(155, 775), new Point(225, 442), new Point(515, 547), new Point(411, 567),
            new Point(605, 725), new Point(479, 793), new Point(609, 567), new Point(455, 340),
            new Point(425, 210), new Point(609, 280), new Point(755, 483), new Point(795, 755)
        ];
    }

    reset() {
        this.score = 0;
        this.state = Const.SELECT;
    }

    load() {
        const l = document.getElementById("leftCol"),
            r = document.getElementById("rightCol");
        for (let z = 0; z < 4; z++) {
            const e1 = document.createElement("canvas");
            e1.id = `cnvL${z + 1}`;
            e1.className = "small";
            e1.style.backgroundRepeat = "no-repeat";
            e1.style.backgroundPosition = "center";
            l.appendChild(e1);
            const e2 = document.createElement("canvas");
            e2.id = `cnvR${z + 1}`;
            e2.className = "small";
            e2.style.backgroundRepeat = "no-repeat";
            e2.style.backgroundPosition = "center";
            r.appendChild(e2);
            this.monsters[z + 1] = e1;
            this.monsters[z + 6] = e2;
        }
        const e3 = document.getElementById("cnvL5");
        e3.style.backgroundRepeat = "no-repeat";
        e3.style.backgroundPosition = "center";
        this.monsters[5] = e3;
        this.reset();
    }

    update(dt) {
        if ((this.moon.time -= dt) < 0) {
            this.moon.time = 30;
            this.moon.pos.x = -Math.cos(this.moon.ang);
            this.moon.pos.y = -Math.sin(this.moon.ang);
            if ((this.moon.ang += dt * .1) > Math.PI) this.moon.ang = 0;
        }

        switch (this.state) {
            case Const.SELECT:
                let cnt = 1;
                for (let z of this.monsters) {
                    if (z) z.style.backgroundImage = `url('./img/m${cnt++}w.png')`;
                }

                this.selection = [];
                const c = Math.floor(Math.random() * 3) + 3;
                const aw = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                for (let t = 0; t < c; t++) {
                    const z = Math.floor(Math.random() * aw.length),
                        d = aw[z];
                    aw.splice(z, 1);
                    this.selection.push(d);
                    this.monsters[d].style.backgroundImage = `url('./img/m${d}.png')`;
                }

                const tmp = [];
                for (let t = 0; t < c; t++) {
                    tmp.push(this.selection[t]);
                }
                for (let t = 0; t < 12 - c; t++) {
                    tmp.push(1 + Math.floor(Math.random() * (this.monsters.length - 1)));
                }
                this.otherMs = [];
                while (tmp.length) {
                    const n = Math.floor(Math.random() * tmp.length);
                    this.otherMs.push(tmp[n]);
                    tmp.splice(n, 1);
                }
                this.state = Const.PLAYING;
                this.timer.reset();
                break;
            case Const.PLAYING:
                if (!this.timer.update(dt)) {
                    this.state = Const.GAMEOVER;
                    this.sound.play(4);
                }
                break;
            case Const.GAMEOVER:

                break;
        }
    }

    draw() {
        this.ctx.drawImage(this.res.images[Const.BACK], 0, 0);
        this.ctx.drawImage(this.res.images[Const.MOON], 100 + this.moon.pos.x * 800, this.moon.pos.y - 100);
        this.ctx.drawImage(this.res.images[Const.WINDOWS], 0, 0);

        for (let m = 0, ml = this.otherMs.length; m < ml; m++) {
            if (this.otherMs[m] === 0) continue;
            this.ctx.drawImage(this.res.images[Const.M1 + this.otherMs[m] - 1],
                this.positions[m].x - 35, this.positions[m].y - 35);
        }

        this.ctx.drawImage(this.res.images[Const.HOUSE], 0, 0);

        this.timerCtx.clearRect(0, 0, 680, 100);
        this.timer.draw(this.timerCtx);

        if (this.state === Const.GAMEOVER) {
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "150px 'Staatliches'";
            this.ctx.textAlign = "center";
            this.ctx.fillText("SCORE", Const.WIDTH >> 1, Const.HEIGHT * .3);
            this.ctx.fillText(`${this.score}`, Const.WIDTH >> 1, Const.HEIGHT * .45);
            this.ctx.fillText("BEST", Const.WIDTH >> 1, Const.HEIGHT * .65);
            this.ctx.fillText(`${this.hiscore}`, Const.WIDTH >> 1, Const.HEIGHT * .8);
            this.ctx.font = "30px 'Staatliches'";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`CLICK TO PLAY AGAIN`, Const.WIDTH >> 1, Const.HEIGHT * .9);
        }

        this.ctx.drawImage(this.res.images[Const.CH], this.mouse.x - 25, this.mouse.y - 25);
    }

    isOver() {
        for (let s = 0; s < this.selection.length; s++) {
            if (this.otherMs.indexOf(this.selection[s]) > -1) return false;
        }
        return true;
    }

    click(e) {
        if (this.state === Const.GAMEOVER) {
            this.reset();
            return;
        }
        let x, y;
        if (e.type === "touchstart") {
            x = e.touches[0].clientX - e.srcElement.offsetLeft;
            y = e.touches[0].clientY - e.srcElement.offsetTop;
            e.preventDefault();
        } else {
            x = e.clientX - e.srcElement.offsetLeft;
            y = e.clientY - e.srcElement.offsetTop;
            e.preventDefault();
        }

        this.sound.play(this.shotSnd);
        this.shotSnd = (this.shotSnd + 1) % 4;

        for (let p = 0, l = this.positions.length; p < l; p++) {
            const pt = this.positions[p],
                dx = x - pt.x * Const.SCALE,
                dy = y - pt.y * Const.SCALE,
                df = dx * dx + dy * dy;
            if (df < 1160) {
                if (this.selection.indexOf(this.otherMs[p]) > -1) {
                    this.score++;
                    if (this.score > this.hiscore) {
                        this.hiscore = this.score;
                    }
                    this.otherMs[p] = 0;
                    if (this.isOver()) {
                        this.state = Const.SELECT;
                    }
                } else {
                    this.state = Const.GAMEOVER;
                    this.sound.play(4);
                }
                return;
            }
        }
    }
}

new KtM();