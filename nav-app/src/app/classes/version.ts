export class Version {
    public readonly name: string;
    public readonly number: string;

    /**
     * Creates an instance of Version
     * @param name version name
     * @param number version number
     */
    constructor(name: string, number: string) {
        this.name = name;
        this.number = number;
    }
}