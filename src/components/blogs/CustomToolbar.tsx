// Custom toolbar with larger icons and tooltips
export const CustomToolbar = () => (
    <div id="toolbar">
      <select title="heading" className="ql-header">
        <option value="1">Header 1</option>
        <option value="2">Header 2</option>
        <option value="">Normal</option>
      </select>
      <button className="ql-bold" title="Bold"></button>
      <button className="ql-italic" title="Italic"></button>
      <button className="ql-underline" title="Underline"></button>
      <button className="ql-strike" title="Strike"></button>
      <button className="ql-blockquote" title="Blockquote"></button>
      <button className="ql-list" value="ordered" title="Ordered List"></button>
      <button className="ql-list" value="bullet" title="Bullet List"></button>
      <button className="ql-link" title="Insert Link"></button>
      <button className="ql-image" title="Insert Image"></button>
      <button className="ql-video" title="Insert Video"></button>
      <button className="ql-code-block" title="Insert Code Block"></button>
      <button className="ql-clean" title="Remove Formatting"></button>
    </div>
  );