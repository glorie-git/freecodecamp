import { useState } from "react";
import { marked } from "marked";
import { defaultText } from "./assests/";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

function App() {
  const [markdown, setMarkdown] = useState(defaultText);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const renderMarkdown = () => {
    const rawHtml = marked.parse(markdown);
    const cleanHtml = DOMPurify.sanitize(rawHtml); // Sanitize the HTML
    return parse(cleanHtml); // Parse the HTML string into JSX
  };

  return (
    <>
      <h1>Markdown Editor Demo</h1>
      <div id="container">
        <div id="left-panel">
          <h2>Editor</h2>
          <div>
            <textarea
              id="editor"
              value={markdown}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div id="right-panel">
          <h2>Preview</h2>
          <div id="preview">{renderMarkdown()}</div>
        </div>
      </div>
    </>
  );
}

export default App;
