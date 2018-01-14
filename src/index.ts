import { DieBag } from './DieBag';


let db = new DieBag();

db.add( 3, 20 );
db.add( 2, 6 );
db.add( 4, 100 );
console.log( db.roll() );
console.log( db.report() );

