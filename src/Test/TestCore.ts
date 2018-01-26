export class TestCore {

    public static randomInt( max : number, includeZero: boolean = false ) : number {

        return Math.floor (Math.random() * Math.floor(max ) + ( (includeZero) ? 0 : 1 ) );
    }
}