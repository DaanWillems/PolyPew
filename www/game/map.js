//The map is nothing but a collection of collidable meshes
class Map {
    constructor(octree) {
        this.objects = [];
        var x = 0;
        var y = 0;
        this.octree = octree;

        var entity = loadModel('cube2x1x2.obj');
        entity.position[0] = -6;
        entity.position[1] = 0;
        entity.position[2] = -18;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        var entity = loadModel('cube2x1x2.obj');
        entity.position[0] = -6;
        entity.position[1] = 1.5;
        entity.position[2] = -12;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        
        var entity = loadModel('cube2x1x2.obj');
        entity.position[0] = -6;
        entity.position[1] = 3;
        entity.position[2] = -6;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        var entity = loadModel('tower.obj');
        entity.position[0] = -10;
        entity.position[1] = 4;
        entity.position[2] = -8;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        var entity = loadModel('tower.obj');
        entity.position[0] = -10;
        entity.position[1] = 4;
        entity.position[2] = 0;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        
        var entity = loadModel('wall.obj');
        entity.position[0] = -15;
        entity.position[1] = 28;
        entity.position[2] = -20;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        var entity = loadModel('wall.obj');
        entity.position[0] = -15;
        entity.position[1] = 30;
        entity.position[2] = -20;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        var entity = loadModel('cube2x1x2.obj');
        entity.position[0] = -10;
        entity.position[1] = 24;
        entity.position[2] = -33;
        entity.animate = false;
        entity.boundingBox.setPosition(entity.position);
        this.objects.push(entity);
        this.octree.addObject(entity);

        // for (var j = -5.4; j < 7.4; j++) {
        //     for (var i = -5.4; i < 7.4; i++) {
        //         var entity = loadModel('mathijs.obj');
        //         entity.position[0] = -15.7;
        //         entity.position[1] = 10 * j
        //         entity.position[2] = 3 * i;
        //         entity.animate = true;
        //         entity.boundingBox.setPosition(entity.position);
        //         this.objects.push(entity);
        //         this.octree.addObject(entity);

        //         var entity = loadModel('cube1x1x1.obj');
        //         entity.position[0] = -5.7;
        //         entity.position[1] = 3 * j;
        //         entity.position[2] = 3 * i;
        //         entity.animate = false;
        //         entity.boundingBox.setPosition(entity.position);

        //         this.objects.push(entity);
        //         this.octree.addObject(entity);
        //     }
        // }

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