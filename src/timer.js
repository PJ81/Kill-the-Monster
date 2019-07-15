export default class Timer {
    constructor(t, p) {
        this.time = t;
        this.now;
        this.running = false;
        this.pos = p;
    }

    update(dt) {
        if (this.running) {
            if ((this.now -= dt) <= 0) {
                this.running = false;
            }
        }
        return this.running;
    }

    reset() {
        this.now = this.time;
        this.running = true;
    }

    draw(ctx) {
        const n = this.running ? this.now : this.now;
        const t = Math.floor(n * 1000 / 500),
            m = this.time * 2;
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        let x = this.pos.x;
        for (let z = 0; z < m; z++) {
            ctx.beginPath();
            ctx.arc(x, this.pos.y, 6, 0, 2 * Math.PI);
            if (z < t) ctx.fill();
            ctx.stroke();
            x += 20;
        }
    }
}