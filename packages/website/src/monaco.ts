import { useRef, useCallback, useEffect, useState } from 'react';
import { EditorDidMount } from 'react-monaco-editor';
type IStandaloneCodeEditor = import('monaco-editor/esm/vs/editor/editor.api').editor.IStandaloneCodeEditor;

export interface Position {
    offset: number;
    col: number;
    row: number;
}
export interface Selection {
    start: Position;
    end: Position;
}

export function useMonaco(init?: EditorDidMount) {
    const editorRef = useRef<IStandaloneCodeEditor>();
    const [selection, setSelection] = useState<Selection | null>(null);
    const editorDidMount = useCallback<EditorDidMount>((editor, monaco) => {
        editorRef.current = editor;
        { // set editor element style
            const element = editor.getDomNode()!;
            Object.assign(element.style, {
                position: 'absolute',
                width: '100%',
                height: '100%',
            });
        }
        { // update selection state
            const updateSelection = () => setSelection(getSelection(editor));
            updateSelection();
            editor.onDidChangeCursorSelection(updateSelection);
        }
        init && init(editor, monaco);
    }, []);
    useEffect(() => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        const resize = () => editor.layout();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [editorRef.current])
    const props = {
        theme: 'vs-dark',
        editorDidMount,
    };
    return {
        MonacoEditor: useMonacoEditor(),
        selection,
        editorRef,
        props,
    };
}

export function useMonacoEditor() {
    type MonacoEditor = typeof import('react-monaco-editor').default;
    const [MonacoEditor, setMonacoEditor] = useState<MonacoEditor | null>(null);
    useEffect(() => {
        import('react-monaco-editor').then(
            ({ default: MonacoEditor }) => setMonacoEditor(() => MonacoEditor),
        );
    }, []);
    return MonacoEditor;
}

export function isOnSelection(offset: number, selection: Selection): boolean {
    if (offset === selection.start.offset && offset === selection.end.offset) return true;
    if (offset < selection.start.offset) return false;
    if (offset >= selection.end.offset) return false;
    return true;
}

function getSelection(editor: IStandaloneCodeEditor): Selection | null {
    const selection = editor.getSelection();
    if (!selection) return null;
    const model = editor.getModel();
    if (!model) return null;
    const start = selection.getStartPosition();
    const end = selection.getEndPosition();
    return {
        start: { offset: model.getOffsetAt(start), col: start.column - 1, row: start.lineNumber - 1 },
        end: { offset: model.getOffsetAt(end), col: end.column - 1, row: end.lineNumber - 1 },
    };
}
