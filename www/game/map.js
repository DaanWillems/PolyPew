//The map is nothing but a collection of collidable meshes
class Map {
    constructor() {
        this.objects = [];
        var x = 0;
        var y = 0;

        this.octree = new Octree(null, new BoundingBox(glMatrix.vec3.fromValues(-10, -10, -10), glMatrix.vec3.fromValues(10, 10, 10)));

        var entity = loadModel('cube1x1x1.obj');
        entity.position[0] = -5.7;
        entity.position[1] = 9.2;
        entity.position[2] = 8.2;
        entity.animate = true;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);
        
        entity = loadModel('cube1x1x1.obj');
        entity.position[0] = -6.7;
        entity.position[1] = 9.2;
        entity.position[2] = 8.2;
        entity.animate = true;
        entity.boundingBox.setPosition(entity.position);

        this.objects.push(entity);
        this.octree.addObject(entity);

        var octreeEntity = new Entity();
        octreeEntity.octree = this.octree;
        octreeEntity.components = ['octree']
        this.objects.push(octreeEntity);

        // for (var j = -9; j < 11; j++) {
            // for (var z = 1; z < 3; z++) {
            //     var entity = loadModel('mathijs.obj');
            //     entity.position[0] = 0;
            //     entity.position[1] = 0;
            //     entity.position[2] = z * 4;
            //     entity.animate = true;
            //     this.objects.push(entity);
            //     // this.octree.insert(entity);
            // }
        // }

    }
}