export declare class Die {
    sides: number;
    protected value: number;
    protected locked: boolean;
    constructor(sides: number);
    roll(): any;
    getValue(): number;
    setValue(newValue: number): void;
    setLock(locked?: boolean): void;
    isLocked(): boolean;
}
