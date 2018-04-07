var PI = Math.PI;
var EARTH_RADIUS = 6378137.0;

function getRad(d) {
    return d * PI / 180.0;
}

// (113.52911321166994,22.802929526649727,113.52804032806398,22.803246016075406)
// lat1,lng1,lat2,lng2
function distance(p1,p2,callback) {
    console.log(p1,p2);
    var f = getRad((p1.lat + p2.lat) / 2);
    var g = getRad((p1.lat - p2.lat) / 2);
    var l = getRad((p1.lng - p2.lng) / 2);
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    var dis = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    console.log(dis); 
}
module.exports = distance