export class TestCore {

    public static randomInt( max : number, includeZero: boolean = false ) : number {

        return Math.random() * max + ( (includeZero) ? 0 : 1 );
    }
}