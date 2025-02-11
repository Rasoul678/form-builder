import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3Icon } from "lucide-react";
import React from "react";

type IProps = {
  inputValue: string;
  onSave: (value: string) => void;
};

const InlineInputEdit: React.FC<IProps> = ({ onSave, inputValue }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(inputValue);
  const currentValue = React.useRef(inputValue);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (value) {
      onSave(value);
      currentValue.current = value;
    } else {
      onSave(currentValue.current);
      setValue(currentValue.current);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {isEditing ? (
        <>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <h1 className="text-center">{value}</h1>
          <Button variant="ghost" onClick={handleEditClick}>
            <Edit3Icon />
          </Button>
        </>
      )}
    </div>
  );
};

export default InlineInputEdit;
