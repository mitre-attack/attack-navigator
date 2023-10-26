export class VersionChangelog {
    public oldDomainVersionID: string;
    public newDomainVersionID: string;
    public additions: string[] = []; // new objects added to newest version
    public changes: string[] = []; // object changes between versions
    public minor_changes: string[] = []; // changes to objects without version increments
    public deprecations: string[] = []; // objects deprecated since older version
    public revocations: string[] = []; // objects revoked since older version
    public unchanged: string[] = []; // objects which have not changed between versions

    public reviewed = new Set<string>();
    public copied = new Set<string>();

    constructor(oldDomainVersionID: string, newDomainVersionID: string) {
        this.oldDomainVersionID = oldDomainVersionID;
        this.newDomainVersionID = newDomainVersionID;
    }

    /** Get the length of the version changelog */
    public length(): number {
        return (
            this.additions.length +
            this.changes.length +
            this.minor_changes.length +
            this.deprecations.length +
            this.revocations.length +
            this.unchanged.length
        );
    }
}
