class Octree {
    constructor(parent, region) {
        this.parent = parent;
        this.region = region;
        this.objects = [];
        this.allObjects = [];
        this.children = new Array(8);
        this.minSize = 4;
        this.maxItems = 1;
        this.parent = null;
        this.treeBuild = false;
        this.treeReady = false;
        this.octant = [];

        this.octant[0] = new BoundingBox(region.min, region.center);
        this.octant[1] = new BoundingBox(new glMatrix.vec3.fromValues(region.center[0], region.min[1], region.min[2]), new glMatrix.vec3.fromValues(region.max[0], region.center[1], region.center[2]));
        this.octant[2] = new BoundingBox(new glMatrix.vec3.fromValues(region.center[0], region.min[1], region.center[2]), new glMatrix.vec3.fromValues(region.max[0], region.center[1], region.max[2]));
        this.octant[3] = new BoundingBox(new glMatrix.vec3.fromValues(region.min[0], region.min[1], region.center[2]), new glMatrix.vec3.fromValues(region.center[0], region.center[1], region.max[2]));
        this.octant[4] = new BoundingBox(new glMatrix.vec3.fromValues(region.min[0], region.center[1], region.min[2]), new glMatrix.vec3.fromValues(region.center[0], region.max[1], region.center[2]));
        this.octant[5] = new BoundingBox(new glMatrix.vec3.fromValues(region.center[0], region.center[1], region.min[2]), new glMatrix.vec3.fromValues(region.max[0], region.max[1], region.center[2]));
        this.octant[6] = new BoundingBox(region.center, region.max);
        this.octant[7] = new BoundingBox(new glMatrix.vec3.fromValues(region.min[0], region.center[1], region.center[2]), new glMatrix.vec3.fromValues(region.center[0], region.max[1], region.max[2]));
    }

    update() {
        // this.children.forEach(c => {
        //     c.update();
        //     for (var i = this.objects.length - 1; i >= 0; i--) {
        //         if(this.objects[i].needsUpdate) {
        //             var obj = this.objects[i];
        //             this.objects.splice(i, 1);
        //             if(this.parent != null) {
        //                 this.parent.insert(obj);
        //             }
        //         }
        //     }
        // })
        this.children = new Array(8);
        this.objects = [];
        this.allObjects.forEach(o => {
            this.insert(o);
        })
    }

    addObject(object) {
        if(this.parent == null) {
            this.allObjects.push(object);
        }

        this.insert(object);
    }

    insert(object) {
        var found = false;
 
        //We cant go any smaller so just add the object here
        if (this.region.dimensions[0] <= this.minSize && this.region.dimensions[1] <= this.minSize && this.region.dimensions[2] <= this.minSize) {
            this.objects.push(object)
            return;
        }

        if (!this.region.contains(object.boundingBox)) {
            if (this.parent) {
                this.parent.objects.push(object);
            }
            return;
        }

        this.objects.push(object);

        if (this.objects.length <= this.maxItems) {
            return;
        }

        var tempObjects = this.objects;
        this.objects = [];

        tempObjects.forEach(o => {
            for (var i = 0; i < 8; i++) {
                if (this.octant[i].intersects(object.boundingBox)) {
                    if (this.children[i] == null) {
                        this.children[i] = new Octree(this, this.octant[i]);
                    }
                    this.children[i].insert(object);
                    found = true;
                }
            }
            if (!found) {
                this.objects.push(object)
            }
        })
    }

    buildTree() {
        if (this.objects.length <= 1) {
            return;
        }

        if (this.region.dimensions[0] <= this.minSize && this.region.dimensions[1] <= this.minSize && this.region.dimensions[2] <= this.minSize) {
            return;
        }
    }
}