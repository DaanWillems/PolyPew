class Octree {
    constructor() {
        this.region = null;
        this.objects = [];
        this.children = [];
        this.minSize = 1;
        this.parent = null;
        this.treeBuild = false;
        this.treeReady = false;
    }

    init(region, objects) {
        this.region = region;
        this.objects = objects;
    }

    buildTree() {
        if(this.objects.length <= 1) {
            return;
        }

        if(this.region.dimensions[0] <= this.minSize && this.region.dimensions[1] <= this.minSize && this.region.dimensions[ 2] <= this.minSize) {
            return;
        }

        this.children = new BoundingBox[8];
        octant[0] = new BoundingBox(region.min, center);
        octant[1] = new BoundingBox(new Vector3(center[0], region.min[1], region.min[2]), new Vector3(region.max[0], center[1], center[2]));
        octant[2] = new BoundingBox(new Vector3(center[0], region.min[1], center[2]), new Vector3(region.max[0], center[1], region.max[2]));
        octant[3] = new BoundingBox(new Vector3(region.min[0], region.min[1], center[2]), new Vector3(center[0], center[1], region.max[2]));
        octant[4] = new BoundingBox(new Vector3(region.min[0], center[1], region.min[2]), new Vector3(center[0], region.max[1], center[2]));
        octant[5] = new BoundingBox(new Vector3(center[0], center[1], region.min[2]), new Vector3(region.max[0], region.max[1], center[2]));
        octant[6] = new BoundingBox(center, region.max);
        octant[7] = new BoundingBox(new Vector3(region.min[0], center[1], center[2]), new Vector3(center[0], region.max[1], region.max[2]));
	
    }
}