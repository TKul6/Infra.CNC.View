export class TreeNode<T> {
    id: string;
    value: T;
    children: Array<TreeNode<T>>;
    active?: boolean = false;
    toggled?: boolean = false;

    constructor(id: string, value: T, children: Array<TreeNode<T>> = null) {
        this.id = id;
        this.value = value;
        this.children = children;
    }

    get name(): T { return this.value};
}