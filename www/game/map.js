//The map is nothing but a collection of collidable meshes
class Map {
    constructor() {
        this.objects = [];
        var x = 0;
        var y = 0;

        var entity = loadModel('test.obj');
        entity.position[0] = 2;
        entity.position[1] = -0.99;
        entity.position[2] = -10;
        this.objects.push(entity);
    }
}