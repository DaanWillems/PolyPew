class Octree {
    constructor(parent, region) {
        this.parent = parent;
        this.region = region;
        this.objects = [];
        this.allObjects = [];
        this.children = new Array(8);
        this.minSize = 8;
        this.maxItems = 4;
        this.treeBuild = false;
        this.treeReady = false;
        this.octant = [];
        this.childrenCount = 0;

        this.octant[0] = new BoundingBox(region.min, region.center);
        this.octant[1] = new BoundingBox(new glMatrix.vec3.fromValues(region.center[0], region.min[1], region.min[2]), new glMatrix.vec3.fromValues(region.max[0], region.center[1], region.center[2]));
        this.octant[2] = new BoundingBox(new glMatrix.vec3.fromValues(region.center[0], region.min[1], region.center[2]), new glMatrix.vec3.fromValues(region.max[0], region.center[1], region.max[2]));
        this.octant[3] = new BoundingBox(new glMatrix.vec3.fromValues(region.min[0], region.min[1], region.center[2]), new glMatrix.vec3.fromValues(region.center[0], region.center[1], region.max[2]));
        this.octant[4] = new BoundingBox(new glMatrix.vec3.fromValues(region.min[0], region.center[1], region.min[2]), new glMatrix.vec3.fromValues(region.center[0], region.max[1], region.center[2]));
        this.octant[5] = new BoundingBox(new glMatrix.vec3.fromValues(region.center[0], region.center[1], region.min[2]), new glMatrix.vec3.fromValues(region.max[0], region.max[1], region.center[2]));
        this.octant[6] = new BoundingBox(region.center, region.max);
        this.octant[7] = new BoundingBox(new glMatrix.vec3.fromValues(region.min[0], region.center[1], region.center[2]), new glMatrix.vec3.fromValues(region.center[0], region.max[1], region.max[2]));
    }

    checkCollisions(parentObjects, intersectionList) {
        parentObjects.forEach(o => {
            this.objects.forEach(o1 => {
                if (o != o1) {

                    // if(o.delta[0] == 0 && o.delta[1] == 0 && o.delta[2] == 0) {
                    //     return;
                    // }

                    if (o.boundingBox.intersects(o1.boundingBox)) {
                        var ir = {
                            o1: o1,
                            o: o,
                        }

                        if (o.boundingBox.max[0] > o1.boundingBox.min[0] && o.boundingBox.max[0] < o1.boundingBox.max[0]) {
                            o.xDepth = -(o.boundingBox.max[0] - o1.boundingBox.min[0]);
                        }

                        if (o.boundingBox.max[2] > o1.boundingBox.min[2] && o.boundingBox.max[2] < o1.boundingBox.max[2]) {
                            o.zDepth = -(o.boundingBox.max[2] - o1.boundingBox.min[2]);
                        }
                        
                        if (o.boundingBox.max[1] > o1.boundingBox.min[1] && o.boundingBox.max[1] < o1.boundingBox.max[1]) {
                            o.yDepth = -(o.boundingBox.max[1] - o1.boundingBox.min[1]);
                        }

                        if (o.boundingBox.min[0] > o1.boundingBox.min[0] && o.boundingBox.min[0] < o1.boundingBox.max[0]) {
                            o.xDepth = o1.boundingBox.max[0] - o.boundingBox.min[0];
                        }

                        if (o.boundingBox.min[2] > o1.boundingBox.min[2] && o.boundingBox.min[2] < o1.boundingBox.max[2]) {
                            o.zDepth = o1.boundingBox.max[2] - o.boundingBox.min[2];
                        }

                        if (o.boundingBox.min[1] > o1.boundingBox.min[1] && o.boundingBox.min[1] < o1.boundingBox.max[1]) {
                            o.yDepth = o1.boundingBox.max[1] - o.boundingBox.min[1];
                        }



                        o.animate = false;
                        o1.animate = false;

                        o.collided = true;
                        // o1.collided = true;

                        intersectionList.push(ir);
                    }
                }
            })
        })

        this.objects.forEach(o => {
            this.objects.forEach(o1 => {
                if (o != o1) {
                    if (o.boundingBox.intersects(o1.boundingBox)) {
                        var ir = {
                            o1: o1,
                            o: o,
                        }
                      
                        if (o.boundingBox.max[0] > o1.boundingBox.min[0] && o.boundingBox.max[0] < o1.boundingBox.max[0]) {
                            o.xDepth = -(o.boundingBox.max[0] - o1.boundingBox.min[0]);
                        }

                        if (o.boundingBox.max[2] > o1.boundingBox.min[2] && o.boundingBox.max[2] < o1.boundingBox.max[2]) {
                            o.zDepth = -(o.boundingBox.max[2] - o1.boundingBox.min[2]);
                        }
                        
                        if (o.boundingBox.max[1] > o1.boundingBox.min[1] && o.boundingBox.max[1] < o1.boundingBox.max[1]) {
                            o.yDepth = -(o.boundingBox.max[1] - o1.boundingBox.min[1]);
                        }

                        if (o.boundingBox.min[0] > o1.boundingBox.min[0] && o.boundingBox.min[0] < o1.boundingBox.max[0]) {
                            o.xDepth = o1.boundingBox.max[0] - o.boundingBox.min[0];
                        }

                        if (o.boundingBox.min[2] > o1.boundingBox.min[2] && o.boundingBox.min[2] < o1.boundingBox.max[2]) {
                            o.zDepth = o1.boundingBox.max[2] - o.boundingBox.min[2];
                        }

                        if (o.boundingBox.min[1] > o1.boundingBox.min[1] && o.boundingBox.min[1] < o1.boundingBox.max[1]) {
                            o.yDepth = o1.boundingBox.max[1] - o.boundingBox.min[1];
                        }



                        o.animate = false;
                        o1.animate = false;

                        o.collided = true;
                        // o1.collided = true;

                        intersectionList.push(ir);
                    }
                }
            })
        })

        this.objects.forEach(o => {
            parentObjects.push(o);
        })

        this.children.forEach(c => {
            c.checkCollisions(parentObjects, intersectionList);
        })

        return intersectionList;
    }

    delete() {
        for (var i = this.children.length - 1; i >= 0; i--) {
            if (this.children[i] != null) {
                if (this.children[i].objects.length == 0 && this.children[i].childrenCount == 0) {
                    this.childrenCount--;
                    this.children.splice(i, 1);
                }
            }
        }

        if (this.objects.length == 0 && this.childrenCount == 0) {
            this.parent.delete();
        }
    }

    update() {
        for (var i = this.children.length - 1; i >= 0; i--) {
            if (this.children[i] == null) {
                continue;
            }
            this.children[i].update();
        }

        var movedObjects = [];
        var currentTree = this;
        this.allObjects.forEach(o => {
            if (o.needsUpdate) {
                movedObjects.push(o);
            }
        })

        for (var i = this.objects.length - 1; i >= 0; i--) {
            var o = this.objects[i];

            if (!o.needsUpdate) {
                continue;
            }

            o.needsUpdate = false;

            while (!currentTree.region.contains(o.boundingBox)) {
                if (currentTree.parent != null) {
                    currentTree = currentTree.parent;
                } else {
                    break;
                }
            }


            this.objects.splice(i, 1);
            currentTree.insert(o);

            if (this.objects.length == 0 && this.childrenCount == 0) {
                console.log("A leaf node that had object no longer has objects");
                this.parent.delete();
            }
        }

        // for (var i = this.objects.length - 1; i >= 0; i--) {
        //     if (this.objects[i].needsUpdate) {
        //         var obj = this.objects[i];
        //         obj.needsUpdate = false;

        //         this.objects.splice(i, 1);

        //         if (this.parent != null) {
        //             this.parent.insert(obj);
        //         }
        //     }
        // }
    }

    addObject(object) {
        if (this.parent == null) {
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
                this.parent.objects.push(object)
            }
            return;
        }

        for (var i = 0; i < 8; i++) {
            if (this.octant[i].contains(object.boundingBox)) {
                if (this.children[i] == null) {
                    this.children[i] = new Octree(this, this.octant[i]);
                    this.childrenCount++;
                }
                this.children[i].insert(object);
                found = true;
            }
        }
        if (!found) {
            this.objects.push(object)
        }
        // })
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