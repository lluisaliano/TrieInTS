# Trie Structure in TypeScript

This project implements a simple Trie (prefix tree) data structure in TypeScript. The Trie allows efficient insertion, search, and prefix-based prediction of words.

## Features

- **Insert**: Add one or more words to the Trie.
- **Search**: Check if a word exists in the Trie.
- **Predict**: Get all words in the Trie that start with a given prefix.

## Usage

```typescript
// Import or use the Trie class directly
const trie = new Trie();

trie.insert('hola');
trie.insert('holas');
trie.insert('holai');
trie.insert('pruebas');

console.log(trie.predict('ho')); // Output: ['hola', 'holai', 'holas']
```

## API

### `Trie.insert(...words: string[])`

Inserts one or more words into the Trie. Throws an error if a word already exists or exceeds the maximum length.

### `Trie.search(word: string, getNode?: boolean): boolean | TrieNode`

Searches for a word in the Trie. Returns `true` if the word exists, `false` otherwise. If `getNode` is `true`, returns the corresponding `TrieNode`.

### `Trie.predict(partialString: string): string[]`

Returns all words in the Trie that start with the given prefix, sorted alphabetically.

## File Structure

- [`trie.ts`](trie.ts): Contains the implementation of the Trie and TrieNode classes.

## License

ISC
