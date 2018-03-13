export = arrayToTree;

declare function arrayToTree<T>(data: T[], options?: Partial<arrayToTree.Options>): Array<arrayToTree.Tree<T>>;

declare namespace arrayToTree {
	interface Options {
		childrenProperty: string;
		parentProperty: string;
		customID: string;
		rootID: string;
	}

	type Tree<T> = T & {
		children?: Array<Tree<T>>;
	};
}
