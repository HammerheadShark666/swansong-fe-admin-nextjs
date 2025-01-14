'use client'

import { useState } from "react";

const DragAndDropBetweenDivs: React.FC = () => {
  const [sourceItems, setSourceItems] = useState<string[]>(["Item 1", "Item 2", "Item 3"]);
  const [destinationItems, setDestinationItems] = useState<string[]>([]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setTargetItems: React.Dispatch<React.SetStateAction<string[]>>,
    targetItems: string[],
    setSourceItems: React.Dispatch<React.SetStateAction<string[]>>,
    sourceItems: string[]
  ) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");

    // Prevent duplicate drops
    if (!targetItems.includes(item)) {
      setTargetItems([...targetItems, item]);
      setSourceItems(sourceItems.filter((i) => i !== item));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      {/* Source List */}
      <div
        style={{
          width: "45%",
          minHeight: "200px",
          border: "1px solid #ddd",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
        onDragOver={handleDragOver}
        onDrop={(e) =>
          handleDrop(e, setSourceItems, sourceItems, setDestinationItems, destinationItems)
        }
      >
        <h3>Source</h3>
        {sourceItems.map((item) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              margin: "5px 0",
              padding: "8px",
              backgroundColor: "#e0e0e0",
              border: "1px solid #ccc",
              cursor: "move",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Destination List */}
      <div
        style={{
          width: "45%",
          minHeight: "200px",
          border: "1px solid #ddd",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
        onDragOver={handleDragOver}
        onDrop={(e) =>
          handleDrop(e, setDestinationItems, destinationItems, setSourceItems, sourceItems)
        }
      >
        <h3>Destination</h3>
        {destinationItems.map((item) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              margin: "5px 0",
              padding: "8px",
              backgroundColor: "#d0ffd0",
              border: "1px solid #ccc",
              cursor: "move",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDropBetweenDivs;

