//The map is nothing but a collection of collidable meshes
class Map {
    constructor() {
        this.objects = [];
        var x = 0;
        var y = 0;
        // for (var j = 0; j < 10; j++) {
        //     for (var i = 0; i < 10; i++) {
        //         var entity = loadModel('my_cube.obj');
        //         entity.position[0] = x;
        //         entity.position[2] = y;
        //         x += 1;
        //         this.objects.push(entity);
        //     }
        //     x = 0;
        //     y += 1;
        // }
        // var entity = loadModel('my_terrain.obj');
        // entity.position[0] = 2;
        // entity.position[1] = -2;
        // entity.position[2] = 2;
        // this.objects.push(entity);

        var entity = loadModel('my_cube.obj');
        entity.position[0] = 2;
        entity.position[1] = -0.99;
        entity.position[2] = -10;
        this.objects.push(entity);
    }
}