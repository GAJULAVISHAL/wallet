import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export const Phrase = ({mnemonic}:{
  mnemonic : string[]
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Secret Recovery Phrase</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Keep this 16-word mnemonic phrase safe and never share it with anyone.
        </p>

        <div className="relative p-4 bg-white border border-gray-200 rounded-md">
          <div className="grid grid-cols-4 gap-2">
            {mnemonic.map((word, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-400 text-xs mr-1">{index + 1}.</span>
                <span className={`font-mono text-sm ${visible ? "text-gray-800" : "text-transparent bg-clip-text bg-gray-200"}`}>
                  {word}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={toggleVisibility}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={visible ? "Hide secret phrase" : "Show secret phrase"}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(mnemonic.join(" "));
            }
          }}
        >
          Copy to Clipboard
        </button>

        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={toggleVisibility}
        >
          {visible ? "Hide Phrase" : "Reveal Phrase"}
        </button>
      </div>
    </div>
  );
}