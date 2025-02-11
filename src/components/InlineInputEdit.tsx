import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import React from "react";

type IProps = {
  inputValue: string;
  onSave: (value: string) => void;
  onDelete: VoidFunction;
};

const InlineInputEdit: React.FC<IProps> = ({
  onSave,
  inputValue,
  onDelete,
}) => {
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
          <Button variant="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2Icon />
          </Button>
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
