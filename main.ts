import { Editor, EditorPosition, MarkdownView, Plugin, Vault, Workspace, App, FileManager } from 'obsidian';

export default class RenameUntitled extends Plugin {
	async onload() {
		this.addCommand({
			id: 'rename-untitled',
			name: 'Rename untitled document',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const workspace = this.app.workspace;
				const fileTitle = workspace.getActiveFile().basename
				
				if (fileTitle == "Untitled") {
					this.app.fileManager.renameFile(workspace.getActiveFile(), "test.md")
				} else {
					return
				}
			}
		});
	}
}
