class Mesh {
    constructor(vao, indexBuffer, vertexBuffer, normalBuffer, vertexCount) {
        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
        this.normalBuffer = normalBuffer;
        this.vao = vao;
        this.vertexCount = vertexCount;
    }

    bind() {
        
    }
}