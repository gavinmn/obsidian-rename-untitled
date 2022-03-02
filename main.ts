import { Editor, EditorPosition, MarkdownView, Plugin, Vault, Workspace, App, FileManager } from 'obsidian';

function renameFile(editor: Editor, view: MarkdownView) {
	const workspace = this.app.workspace;
	const activeFile = workspace.getActiveFile()

	const filePath = activeFile.path
	const fileTitle = activeFile.basename
	const fileType = activeFile.extension
	const directory = filePath.replace(fileTitle + '.' + fileType, '')

	const fileText = editor.getValue()
	const lines = fileText.split('\n');

	let firstLine = "Untitled"
	for (var index in lines) {
		if (lines[index].length != 0) {
			// hack way to not conflict with Obsidian linter adding the filename as the H1
			if (lines[index] == "# Untitled") {
				// delete the current line (the h1)
				let startRange: EditorPosition = {
					line: parseInt(index),
					ch: 0
				}
				let endRange: EditorPosition = {
					line: parseInt(index),
					ch: lines[parseInt(index)].length
				}
				editor.replaceRange(``, startRange, endRange);
				continue
			}
			firstLine = lines[index].replace(/[^\w\s]/gi, '').trim()
			break
		}
	}
	if (fileTitle == "Untitled") {
		this.app.fileManager.renameFile(activeFile, `${directory}${firstLine}.${fileType}`)
	} else {
		return
	}
}

export default class RenameUntitled extends Plugin {
	async onload() {
		
		
	// Source for running this command on save
	// https://github.com/hipstersmoothie/obsidian-plugin-prettier/blob/main/src/main.ts
  		const saveCommandDefinition = (this.app as any).commands?.commands?.[
			'editor:save-file'
  		];
  		const save = saveCommandDefinition?.callback;
		
  		if (typeof save === 'function') {
			saveCommandDefinition.callback = () => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView)
				const editor = view.editor;
				const file = this.app.workspace.getActiveFile();
				renameFile(editor, view)
			};
  		}
		
		
		this.addCommand({
			id: 'rename-untitled',
			name: 'Rename untitled document',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				renameFile(editor, view)
			}
		});
	}
}
