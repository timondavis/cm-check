import { D20AttributeCheck } from './D20AttributeCheck'
import { CheckExecutor } from "./CheckExecutor";
import { DieBag } from './DieBag';

let check = new D20AttributeCheck( 24, 15 );
let newDie = new DieBag();
newDie.add( 4, 6 );
check.addDieModifier( { name: 'test', dieBag: newDie, remove: false, strictRemove: false, phase: 'before' } );
check.addDieModifier( { name: 'un-test', dieBag: newDie, remove: true, strictRemove: false, phase: 'after' } );

let checker = CheckExecutor.getInstance();

checker.execute( check );

console.log( 'Did the check pass?  ' + check.isPass() );
console.log( 'Die Report: ' + JSON.stringify( check.getDieBag().report() ) );
console.log( 'Check Report: ' + check.report( true ) );
