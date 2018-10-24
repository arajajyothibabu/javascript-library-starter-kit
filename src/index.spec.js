import Library from './Library';

const library = new Library();

test('should return Initial Count = 0 !', () => {
	expect(library.counter).toBe(0);
});

test('should return Count = 1 !', () => {
	library.increment();
    expect(library.counter).toBe(1);
});

test('should return Count = -1 !', () => {
    library.decrement(2);
    expect(library.counter).toBe(-1);
});