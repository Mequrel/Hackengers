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
    for (var i = 0; i < this.numRings; i++) {
        this.points[i] = [];
        for(var j=0; j<this.numPoints; ++j) {
            this.points[i][j] = {x: 0, y: 0};
        }
    }

};


helloworld.Tunnel.prototype.scalePoint = function(point, refPoint, scale) {
    v = {x: point.x - refPoint.x, y: point.y - refPoint.y};
    v = {x: scale*v.x, y: scale*v.y}
    return {x: refPoint.x + v.x, y: refPoint.y + v.y};
}

helloworld.Tunnel.prototype.drawCylinder = function(circ1, circ2,n, color) {
    this.ctx.lineWidth=1;
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    
    for (var j = 0; j < n; j++) {
        this.ctx.moveTo(circ1[j].x, circ1[j].y);
        this.ctx.beginPath();            
        this.ctx.lineTo(circ1[(j+1)%n].x, circ1[(j+1)%n].y);
        this.ctx.lineTo(circ2[(j+1)%n].x, circ2[(j+1)%n].y);
        this.ctx.lineTo(circ2[j].x, circ2[j].y);
         this.ctx.lineTo(circ1[j].x, circ1[j].y);
        this.ctx.fill();
    //    this.ctx.stroke();
    }

}   

helloworld.Tunnel.prototype.drawCurve = function(points, n, color) {
    p = points[0];
    this.ctx.moveTo(p.x, p.y);
    this.ctx.beginPath();
    this.ctx.lineWidth=1;
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    
    for (var j = 1; j < n; j++) {
        p = points[j];
        this.ctx.lineTo(p.x, p.y);
    }

    this.ctx.fill();
    this.ctx.stroke();
}

helloworld.Tunnel.prototype.draw = function() {
        var radius = 0;

        this.impulsePath = []
        for (var i = 0; i < this.numRings; i++) {
            var avg = {x: 0, y: 0}

            for (var j = 0; j < this.numPoints; j++) {
                this.points[i][j].x = Math.round(this.cx + 60 * this.coss[(this.x + 200 - radius + 3600) % 360]
                                    + radius * this.coss[(i * 5 + this.alpha * j) % 360]);
                this.points[i][j].y = Math.round(this.cy + 45 * this.sins[(this.y + 200 - radius + 3600) % 360]
                                    + radius * this.sins[(i * 5 + this.alpha * j) % 360]);

                //console.log(this.points[i][j]);

                avg.x += this.points[i][j].x
                avg.y += this.points[i][j].y
            }
            radius += this.radadd;

            avg.x /= this.numPoints;
            avg.y /= this.numPoints;

            this.impulsePath.push(avg);
        }

        for (var i = 0; i < this.numRings - 1; i++) {
            for (var j = 0; j < this.numPoints; j++) {
                var r = i * (this.radadd - 22);
                var g = Math.round(Math.sin((j * this.alpha / 2) * Math.PI / 180) * 255 * i / this.numRings);
                var b = 0;

                    this.ctx.strokeStyle = "rgb(0,255,0)";
                this.ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
                this.ctx.beginPath();
                this.ctx.moveTo(this.points[i][j].x, this.points[i][j].y);
                this.ctx.lineTo(this.points[i][(j + 1) % this.numPoints].x, this.points[i][(j + 1) % this.numPoints].y);
                this.ctx.lineTo(this.points[i + 1][(j + 1) % this.numPoints].x, this.points[i + 1][(j + 1) % this.numPoints].y);
                this.ctx.lineTo(this.points[i + 1][j].x, this.points[i + 1][j].y);
                //ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
            }
        }

        // drawing impulse
        
        which = 3

        circ0 = this.points[which-1];
        circ1 = this.points[which];
        circ2 = this.points[which+1];

        s0 = this.impulsePath[which-1];
        s1 = this.impulsePath[which];
        s2 = this.impulsePath[which+1];

        c0 = []; c1 = []; c2 = [];
        for (j=0; j<this.numPoints; ++j) {
            c0[j] = this.scalePoint(circ0[j], s0, 0.1);
            c1[j] = this.scalePoint(circ1[j], s1, 0.17);
            c2[j] = this.scalePoint(circ2[j], s2, 0.08);
        }

        c0[this.numPoints] = c0[0]; 
        c1[this.numPoints] = c1[0]; 
        c2[this.numPoints] = c2[0];

        this.drawCurve(c0, this.numPoints+1,"rgb(184,184,184)");
        this.drawCurve(c1, this.numPoints+1,"rgb(184,184,184)");
        this.drawCurve(c2, this.numPoints+1,"rgb(184,184,184)");

        this.drawCylinder(c0, c1, this.numPoints,"rgb(184,184,184)");
        this.drawCylinder(c1, c2, this.numPoints,"rgb(184,184,184)");

        this.x = (this.x - 14) % 360;
        this.y = (this.y + 12) % 360;

};