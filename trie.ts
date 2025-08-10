class TrieNode {
	children: Map<string, TrieNode>;
	isEndOfWord: boolean;
	constructor() {
		this.children = new Map();
		this.isEndOfWord = false;
	}
}

class Trie {
	maxStringLength = 100;
	root = new TrieNode();

	insert(...words: string[]) {
		for (const word of words) {
			if (word.length > this.maxStringLength)
				throw new Error(
					`Word is longer than the max permited length : ${this.maxStringLength}`,
				);
			let currNode = this.root;
			for (let i = 0; i < word.length; i++) {
				// Get the current char of the word
				const char = word.charAt(i);
				if (currNode.children.has(char)) {
					// Navigate to the children
					currNode = currNode.children.get(char)!;
				} else {
					// Add a new character child
					const tempNode = new TrieNode();
					currNode.children.set(char, tempNode);
					currNode = tempNode;
				}
				// When the last character of the word is added, we mark that char node as end of word
				if (i === word.length - 1) {
					// If word already exists
					if (currNode.isEndOfWord) throw new Error('Word already exists');
					currNode.isEndOfWord = true;
				}
			}
		}
	}

	search(word: string, getNode: boolean = false): boolean | TrieNode {
		let currNode = this.root;
		for (let i = 0; i < word.length; i++) {
			const tempChild = currNode.children.get(word.charAt(i));
			if (tempChild === undefined) {
				return false;
			}
			currNode = tempChild;
		}
		// If currNode is end of word, we return true, as the word exists
		return getNode ? currNode : currNode.isEndOfWord;
	}

	predict(partialString: string): string[] {
		const possibleWords: string[] = [];

		const node = this.search(partialString, true) as TrieNode;

		// If there is no word stored
		if (!node) return [];

		type NodeAndPrefix = {
			node: TrieNode;
			prefix: string;
		};

		const pendingNodes: NodeAndPrefix[] = [{ node, prefix: partialString }];

		// Store all nodes on array starting from node that comes from string and including current node
		while (pendingNodes.length !== 0) {
			const currNode = pendingNodes.shift()!;
			if (currNode.node.isEndOfWord) possibleWords.push(currNode.prefix);

			for (const [chars, childNodes] of currNode.node.children.entries()) {
				pendingNodes.push({
					node: childNodes,
					prefix: currNode.prefix + chars,
				});
			}
		}

		return possibleWords.sort();
	}
}

const trie = new Trie();

trie.insert('hola');
trie.insert('holas');
trie.insert('holai');
trie.insert('pruebas');

console.log(trie.predict('ho'));
