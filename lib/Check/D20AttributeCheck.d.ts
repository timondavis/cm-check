import { Check } from './Check';
export declare class D20AttributeCheck extends Check {
    protected attributeValue: number;
    protected name: string;
    constructor(target?: number, attributeValue?: number, name?: string);
    /**
     * Get the formal typename of this check
     * @returns {string}
     */
    getType(): string;
    /**
     * Update the attribute being checked against
     * @param {number} attributeValue
     */
    setAttributeValue(attributeValue: number): void;
    protected setBaseDieBag(): void;
    protected static translateAttributeValue(value: number): number;
}
