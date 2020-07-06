class VertexArrayObject {
    constructor() {
        const canvas = document.querySelector("#glCanvas");
        this.gl = canvas.getContext("webgl2");    

        this.vao = this.gl.createVertexArray();
    }

    bind() {
        this.gl.bindVertexArray(this.vao);
    }

    unbind() {
        this.gl.bindVertexArray(0);
    }

    addVertexBuffer(vertexBuffer, numComponents, type, normalize, stride, offset, position) {
        this.bind();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

        this.gl.vertexAttribPointer(
            position,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        this.gl.enableVertexAttribArray(
            position);
    }
}