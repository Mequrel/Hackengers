goog.provide('helloworld.Tunnel');
    
helloworld.Tunnel = function(canvas){
    /* (CC) BY txd@kung-fu.lt (Creative Commons Attribution 3.0)
     * */

    this.x = 0;
    this.y = 0;
    this.sins = [];
    this.coss = [];
    for (var i = 0; i < 360; i++) {
        this.sins[i] = Math.sin(i * Math.PI / 180);
        this.coss[i] = Math.cos(i * Math.PI / 180);
    }

    // this.canvas = canvas;

    this.run = true;
    
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.cx = 320;
    this.cy = 240;


    this.numRings = 25;
    this.numPoints = 20;
    this.alpha = 360 / this.numPoints;
    this.radadd = 20;

    this.points = [];
    for (var i = 0; i < this.numRings * this.numPoints; i++) {
        this.points[i] = {x: 0, y: 0};
    }

};


helloworld.Tunnel.prototype.draw = function() {
        var radius = 0;
        for (var i = 0; i < this.numRings; i++) {
            for (var j = 0; j < this.numPoints; j++) {
                this.points[i * this.numPoints + j].x = Math.round(this.cx + 60 * this.coss[(this.x + 200 - radius + 3600) % 360]
                                    + radius * this.coss[(i * 5 + this.alpha * j) % 360]);
                this.points[i * this.numPoints + j].y = Math.round(this.cy + 45 * this.sins[(this.y + 200 - radius + 3600) % 360]
                                    + radius * this.sins[(i * 5 + this.alpha * j) % 360]);
            }
            radius += this.radadd;
        }

        for (var i = 0; i < this.numRings - 1; i++) {
            for (var j = 0; j < this.numPoints; j++) {
                var r = i * (this.radadd - 22);
                var g = Math.round(Math.sin((j * this.alpha / 2) * Math.PI / 180) * 255 * i / this.numRings);
                var b = 0;

                this.ctx.strokeStyle = "rgb(0,255,0)";
                this.ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
                this.ctx.beginPath();
                this.ctx.moveTo(this.points[i * this.numPoints + j].x, this.points[i * this.numPoints + j].y);
                this.ctx.lineTo(this.points[i * this.numPoints + (j + 1) % this.numPoints].x, this.points[i * this.numPoints + (j + 1) % this.numPoints].y);
                this.ctx.lineTo(this.points[(i + 1) * this.numPoints + (j + 1) % this.numPoints].x, this.points[(i + 1) * this.numPoints + (j + 1) % this.numPoints].y);
                this.ctx.lineTo(this.points[(i + 1) * this.numPoints + j].x, this.points[(i + 1) * this.numPoints + j].y);
                //ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
            }
        }

        this.x = (this.x - 14) % 360;
        this.y = (this.y + 12) % 360;

};