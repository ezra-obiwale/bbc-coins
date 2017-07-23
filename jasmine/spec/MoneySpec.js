describe("Money", function () {
    it('should return 4 coins for 123p', function () {
        Money.init('123p');
        Money.validate();
        expect(Money.error).toBeFalsy();
        Money.toSterlingCoins();
        expect(Money.coins).toContain('1 x £1');
        expect(Money.coins).toContain('1 x 20p');
        expect(Money.coins).toContain('1 x 2p');
        expect(Money.coins).toContain('1 x 1p');
    });

    it('should return 4 coins for £12.34', function () {
        Money.init('£12.34');
        Money.validate();
        expect(Money.error).toBeFalsy();
        Money.toSterlingCoins();
        expect(Money.coins).toContain('6 x £2');
        expect(Money.coins).toContain('1 x 20p');
        expect(Money.coins).toContain('1 x 10p');
        expect(Money.coins).toContain('2 x 2p');
    });

    it('should throw error "Empty entry" for empty value', function () {
        Money.init('');
        Money.validate();
        expect(Money.error).toBe('Empty entry');
    });

    it('should throw error "Invalid character" for 13x', function () {
        Money.init('13x');
        Money.validate();
        expect(Money.error).toBe('Invalid character');
    });

    it('should throw error "Valid character in the wrong position" for 13p.02', function () {
        Money.init('13p.02');
        Money.validate();
        expect(Money.error).toBe('Valid character in the wrong position');
    });

    it('should throw error "Missing value" for £p', function () {
        Money.init('£p');
        Money.validate();
        expect(Money.error).toBe('Missing value');
    });
});