import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  style?: React.CSSProperties;
  handleKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  style,
  handleKeyPress,
}) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div style={{ ...style, border: '0px' }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        onKeyDown={handleKeyPress}
        style={{ border: '1px solid #ccc', borderRadius: '10px' }}
      />
    </div>
  );
};

export default RichTextEditor;
