/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Apply the current node's transformation
        const localMatrix = this.trs.getTransformationMatrix();
        const newModelMatrix = MatrixMult(modelMatrix, localMatrix);
        const newModelView = MatrixMult(modelView, localMatrix);
        const newNormalMatrix = MatrixMult(normalMatrix, localMatrix);
        const newMvp = MatrixMult(mvp, localMatrix);

        // Draw the MeshDrawer if available
        if (this.meshDrawer) {
            this.meshDrawer.draw(newMvp, newModelView, newNormalMatrix, newModelMatrix);
        }

        // Recursively draw child nodes
        for (const child of this.children) {
            child.draw(newMvp, newModelView, newNormalMatrix, newModelMatrix);
        }
    }

    

}