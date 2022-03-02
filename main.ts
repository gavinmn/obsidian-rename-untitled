import { Editor, EditorPosition, MarkdownView, Plugin, Vault, Workspace, App, FileManager } from 'obsidian';

export default class RenameUntitled extends Plugin {
	async onload() {
		this.addCommand({
			id: 'rename-untitled',
			name: 'Rename untitled document',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const workspace = this.app.workspace;
				const activeFile = workspace.getActiveFile()

				const filePath = activeFile.path
				const fileTitle = activeFile.basename
				const fileType = activeFile.extension
				const directory = filePath.replace(fileTitle + '.' + fileType, '')
				
				const fileText = editor.getValue()
				const lines = fileText.split('\n');
				
				let firstLine = "Untitled"
				for(var index in lines) {
					if (lines[index].length != 0) {
						firstLine = lines[index]
						break
					}
				}
				
				if (fileTitle == "Untitled") {
					this.app.fileManager.renameFile(activeFile, `${directory}${firstLine}.${fileType}`)
				} else {
					return
				}
			}
		});
	}
}
