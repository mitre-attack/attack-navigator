import { ContextMenuItem } from './context-menu-item';
import { Technique } from './stix/technique';
import { Tactic } from './stix/tactic';

// appliesTo() only reads technique.attackID and tactic.shortname, so lightweight
// fixtures are cast rather than constructing full StixObject/DataService graphs.
function fakeTechnique(attackID: string): Technique {
    return { attackID } as unknown as Technique;
}

function fakeTactic(shortname: string): Tactic {
    return { shortname } as unknown as Tactic;
}

describe('ContextMenuItem.appliesTo', () => {
    const t1059 = fakeTechnique('T1059');
    const t1098 = fakeTechnique('T1098');
    const execution = fakeTactic('execution');
    const persistence = fakeTactic('persistence');

    it('applies to every technique when limit_techniques is not set', () => {
        const item = new ContextMenuItem('label', 'url');
        expect(item.appliesTo(t1059, execution)).toBeTrue();
        expect(item.appliesTo(t1098, persistence)).toBeTrue();
    });

    it('applies to every technique when limit_techniques is an empty array', () => {
        const item = new ContextMenuItem('label', 'url', null, []);
        expect(item.appliesTo(t1059, execution)).toBeTrue();
    });

    it('matches a bare ATT&CK ID entry regardless of tactic', () => {
        const item = new ContextMenuItem('label', 'url', null, ['T1059']);
        expect(item.appliesTo(t1059, execution)).toBeTrue();
        expect(item.appliesTo(t1059, persistence)).toBeTrue();
    });

    it('does not match a bare ATT&CK ID entry for a different technique', () => {
        const item = new ContextMenuItem('label', 'url', null, ['T1059']);
        expect(item.appliesTo(t1098, execution)).toBeFalse();
    });

    it('matches an { id, tactic } entry only under the specified tactic', () => {
        const item = new ContextMenuItem('label', 'url', null, [{ id: 'T1059', tactic: 'execution' }]);
        expect(item.appliesTo(t1059, execution)).toBeTrue();
        expect(item.appliesTo(t1059, persistence)).toBeFalse();
    });

    it('does not match an { id, tactic } entry for a different technique', () => {
        const item = new ContextMenuItem('label', 'url', null, [{ id: 'T1059', tactic: 'execution' }]);
        expect(item.appliesTo(t1098, execution)).toBeFalse();
    });

    it('supports a mixed list of bare IDs and { id, tactic } entries', () => {
        const item = new ContextMenuItem('label', 'url', null, ['T1098', { id: 'T1059', tactic: 'execution' }]);
        expect(item.appliesTo(t1098, persistence)).toBeTrue(); // bare ID, any tactic
        expect(item.appliesTo(t1059, execution)).toBeTrue(); // scoped match
        expect(item.appliesTo(t1059, persistence)).toBeFalse(); // scoped, wrong tactic
    });
});
