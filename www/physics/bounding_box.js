class BoundingBox {
    constructor(min, max) {
        this.originalMin = JSON.parse(JSON.stringify(min));;
        this.originalMax = JSON.parse(JSON.stringify(max));;
        this.min = min;
        this.max = max;

        this.dimensions = glMatrix.vec3.create();
        this.center = glMatrix.vec3.create();
        this.scaleMatrix = glMatrix.mat4.create();
        this.position = glMatrix.vec3.create();

        glMatrix.vec3.sub(this.dimensions, max, min);
        glMatrix.vec3.div(this.center, this.dimensions, [2, 2, 2]);
        glMatrix.vec3.add(this.center, this.min, this.center);

        var xScale = (this.max[0] - this.min[0]) / 1;
        var yScale = (this.max[1] - this.min[1]) / 1;
        var zScale = (this.max[2] - this.min[2]) / 1;

        glMatrix.mat4.scale(this.scaleMatrix, this.scaleMatrix, [xScale, yScale, zScale]);
    }

    setPosition(position) {
        this.position = position;
        glMatrix.vec3.add(this.min, this.originalMin, this.position);
        glMatrix.vec3.add(this.max, this.originalMax, this.position);
    }

    contains(bb) {
        if (bb.min[0] > this.min[0] && bb.min[1] > this.min[1] && bb.min[2] > this.min[2] &&
            bb.max[0] < this.max[0] && bb.max[1] < this.max[1] && bb.max[2] < this.max[2]) {
            return true;
        }
        return false;
    }

    intersects(bb) {
        if (bb.min[0] <= this.max[0] && bb.max[0] >= this.min[0] &&
            bb.min[1] <= this.max[1] && bb.max[1] >= this.min[1] &&
            bb.min[2] <= this.max[2] && bb.max[2] >= this.min[2]) {
            return true;
        }
        return false;

    }


    static fromVertices(vertices) {
        var min = glMatrix.vec3.create();
        var max = glMatrix.vec3.create();

        for (var i = 0; i < vertices.length; i += 3) {
            if (vertices[i] < min[0]) {
                min[0] = vertices[i]
            }
            if (vertices[i + 1] < min[1]) {
                min[1] = vertices[i + 1]
            }
            if (vertices[i + 2] < min[2]) {
                min[2] = vertices[i + 2]
            }

            if (vertices[i] > max[0]) {
                max[0] = vertices[i]
            }
            if (vertices[i + 1] > max[1]) {
                max[1] = vertices[i + 1]
            }
            if (vertices[i + 2] > max[2]) {
                max[2] = vertices[i + 2]
            }
        }

        console.log(min);
        console.log(max);
        return new BoundingBox(min, max);
    }
}