import { useRef, useCallback, useEffect, useState } from 'react';
import { EditorDidMount } from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

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
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
    const monacoRef = useRef<typeof monaco>();
    const [selection, setSelection] = useState<Selection | null>(null);
    const editorDidMount = useCallback<EditorDidMount>((editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
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
        selection,
        editorRef,
        monacoRef,
        props,
    };
}

export function isOnSelection(offset: number, selection: Selection): boolean {
    if (offset === selection.start.offset && offset === selection.end.offset) return true;
    if (offset < selection.start.offset) return false;
    if (offset >= selection.end.offset) return false;
    return true;
}

function getSelection(editor: monaco.editor.IStandaloneCodeEditor): Selection | null {
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
