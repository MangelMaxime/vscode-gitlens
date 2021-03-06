'use strict';
import { WorkspaceState } from '../../constants';
import { Container } from '../../container';
import { RemoteProvider } from '../remotes/factory';

export enum GitRemoteType {
    Fetch = 'fetch',
    Push = 'push'
}

export class GitRemote {
    constructor(
        public readonly repoPath: string,
        public readonly id: string,
        public readonly name: string,
        public readonly scheme: string,
        public readonly domain: string,
        public readonly path: string,
        public readonly provider: RemoteProvider | undefined,
        public readonly types: { type: GitRemoteType; url: string }[]
    ) {}

    get default() {
        const defaultRemote = Container.context.workspaceState.get<string>(WorkspaceState.DefaultRemote);
        return this.id === defaultRemote;
    }

    setAsDefault(state: boolean = true) {
        return Container.context.workspaceState.update(WorkspaceState.DefaultRemote, state ? this.id : undefined);
    }
}
