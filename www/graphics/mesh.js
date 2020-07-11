class Mesh {
    constructor(vao, indexBuffer, vertexBuffer, normalBuffer, vertexCount, vertices) {
        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
        this.normalBuffer = normalBuffer;
        this.vao = vao;
        this.vertexCount = vertexCount;
        this.vertices = vertices;
    }

    bind() {
        
    }
}