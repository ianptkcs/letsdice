function hashString(str: string): number {
	// A simple, non-cryptographic hash function (FNV-1a)
	let hash = 0x811c9dc5;
	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = (hash * 16777619) >>> 0;
	}
	return hash;
}

export default function randomUsername(uid: string): string {
	const adjectives = [
		'brave',
		'clever',
		'mellow',
		'fancy',
		'swift',
		'happy',
		'bright',
		'calm',
		'eager',
		'gentle',
	];
	const animals = [
		'lion',
		'tiger',
		'bear',
		'fox',
		'eagle',
		'shark',
		'panda',
		'zebra',
		'whale',
		'dolphin',
	];

	const h = hashString(uid);

	// Use the hash to pick from the lists
	const adjective = adjectives[h % adjectives.length];
	const animal = animals[h % animals.length];

	return `${adjective}-${animal}`;
}
