import { cdk, javascript } from 'projen';

export class ProjenProjectFromGit extends cdk.JsiiProject {
  public constructor(options: cdk.JsiiProjectOptions) {
    super({
      projenrcTs: true,
      packageManager: javascript.NodePackageManager.NPM,
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
      publishToGo: undefined,
      publishToMaven: undefined,
      publishToNuget: undefined,
      publishToPypi: undefined,
      releaseToNpm: false,
      ...options,
      deps: [
        ...options?.deps || [],
      ],
      devDeps: [
        ...options?.devDeps || [],
        'projen',
      ],
      peerDeps: [
        ...options?.peerDeps || [],
        'projen@^x.x.x',
      ],
    });

    this.deps.removeDependency('typescript');
    this.addDevDeps('typescript@^3.9.0');

    this.gitignore.removePatterns('.jsii', '/lib');
  }
}