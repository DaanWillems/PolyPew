class BoundingBox {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.dimensions = glMatrix.vec3.create();
        this.center = glMatrix.vec3.create();
        
        glMatrix.vec3.sub(this.dimensions, max, min);
        glMatrix.vec3.div(this.center, this.dimensions, [2, 2, 2]);
        glMatrix.vec3.add(this.center, this.min, this.center);
    }

    checkCollision(boundingBox) {

    }
}