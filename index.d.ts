export = arrayToTree;

declare function arrayToTree<T>(data: T[], options?: Partial<arrayToTree.Options>): arrayToTree.Tree<T>;

declare namespace arrayToTree {
	interface Options {
		parentProperty: string;
		customID: string;
		rootID: string;
	}

	type Tree<T> = T & {
		children?: Array<Tree<T>>;
	};
}
