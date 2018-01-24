import { D20AttributeCheck } from '../../Check/D20AttributeCheck';
import { CheckExecutor } from "../../Check/CheckExecutor";
import { expect } from 'chai';
import 'mocha';


describe( 'Check/D20AttributeCheck', () => {
    let attributeValue = Math.floor( Math.random() * Math.floor( 20 ) ) + 1;
    let targetValue = Math.floor( Math.random() * Math.floor( 10 ) + 10 );

    let CE = CheckExecutor.getInstance();
    let check = new D20AttributeCheck( attributeValue, targetValue , 'Generic' );
    CE.execute( check );

    it( 'should have a target value matching the one provided', () => {
        expect( check.getTarget() == targetValue );
    });

    it( 'should have been applied default modifier correctly', () => {
        expect( check.getRawRollResult() === check.getResult() - Number( check.getModifiers()[0].getValue() ) );
    });

    it( 'should have exactly 1 d20 in the die bag', () => {
        expect( check.getDieBag().report()[20].length === 1 );
    })
});