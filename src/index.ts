import { D20AttributeCheck } from './Check/D20AttributeCheck'
import { CheckExecutor } from "./Check/CheckExecutor";
import { DieModifierFactory } from "./Check/Modifier/DieModifierFactory";
import { DieModifier } from "./Check/Modifier/DieModifier";
import { DieBag } from "./DieBag";

let check = new D20AttributeCheck( 10, 15 );
let DMF = new DieModifierFactory();
let checker = CheckExecutor.getInstance();

DMF.setDefaultDieBag( new DieBag().add( 8, 4 ) );

let addDieModifier = <DieModifier> DMF.create( 'assist' );
let removeDieModifier = <DieModifier> DMF.create( 'un-assist', { 'remove': 'true', 'phase': 'after' } );
removeDieModifier.getDieBag().remove( 4, 4 );

check.addDieModifier( addDieModifier );
check.addDieModifier( removeDieModifier );

checker.execute( check );

console.log( 'Did the check pass?  ' + check.isPass() );
console.log( 'Die Report: ' + JSON.stringify( check.getDieBag().report() ) );
console.log( 'Check Report: ' + check.report( true ) );
