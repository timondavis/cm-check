export declare class Die {
    sides: number;
    protected value: number;
    constructor(sides: number);
    roll(): any;
    getValue(): number;
    setValue(newValue: number): void;
}
