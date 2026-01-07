import { CloudUpload, FilePen, FileText } from "lucide-react";
import { Card } from "./card";

const cardData = [
  { id: 1, figure: "45", title: "All Posts", color: "#1e3a8a", icon: FileText },
  {
    id: 2,
    figure: "25",
    title: "Published Posts",
    color: "#28a745",
    icon: CloudUpload,
  },
  {
    id: 3,
    figure: "20",
    title: "Drafts",
    color: "#e9b226ff",
    icon: FilePen,
  },
];

export const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
      {cardData.map((data) => (
        <Card
          key={data.id}
          figure={data.figure}
          title={data.title}
          color={data.color}
          icon={data.icon}
        />
      ))}
    </div>
  );
};
