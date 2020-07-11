class BoundingBox {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.dimensions = glMatrix.vec3.create();
        this.center = glMatrix.vec3.create();
        this.scaleMatrix = glMatrix.mat4.create();
        
        glMatrix.vec3.sub(this.dimensions, max, min);
        glMatrix.vec3.div(this.center, this.dimensions, [2, 2, 2]);
        glMatrix.vec3.add(this.center, this.min, this.center);

        var xScale = (this.max[0] - this.min[0]) / 1;
        var yScale = (this.max[1] - this.min[1]) / 1;
        var zScale = (this.max[2] - this.min[2]) / 1;
        console.log(xScale);
        glMatrix.mat4.scale(this.scaleMatrix, this.scaleMatrix, [xScale, yScale, zScale]);
    }

    checkCollision(boundingBox) {

    }

    static fromVertices(vertices) {
        var min = glMatrix.vec3.create();
        var max = glMatrix.vec3.create();
        
        for(var i = 0; i < vertices.length; i += 3) {
            if(vertices[i] < min[0]) {
                min[0] = vertices[i]
            }
            if(vertices[i+1] < min[1]) {
                min[1] = vertices[i+1]
            }
            if(vertices[i+2] < min[2]) {
                min[2] = vertices[i+2]
            }

            if(vertices[i] > max[0]) {
                max[0] = vertices[i]
            }
            if(vertices[i+1] > max[1]) {
                max[1] = vertices[i+1]
            }
            if(vertices[i+2] > max[2]) {
                max[2] = vertices[i+2]
            }
        }

        console.log(min);
        console.log(max);
        return new BoundingBox(min, max);
    }
}