import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormTypes, ModalFormData } from "@/types";
import { PlusCircleIcon } from "lucide-react";
import React from "react";

type IProps = {
  onSubmit: (data: ModalFormData) => void;
  onClose: () => void;
  type: FormTypes | null;
};

const PreCreationModal: React.FC<IProps> = ({ onSubmit, onClose, type }) => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const optionRefInput = React.useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isRequired, setIsRequired] = React.useState(false);
  const [formOptions, setFormOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    triggerRef.current?.click();

    return () => {
      triggerRef.current = null;
    };
  }, []);

  const isMultiOption =
    type === FormTypes.CHECKBOX ||
    type === FormTypes.RADIO ||
    type === FormTypes.SELECT;

  const handleSubmit = () => {
    if (formOptions.length < 2 && isMultiOption) {
      alert("Please add at least 2 options");
      return;
    }

    const options = formOptions.map((option) => ({
      text: option,
      value: option,
    }));

    const formData = {
      title,
      description,
      options,
      isRequired,
    };

    onSubmit(formData);
    onClose();
  };

  const addOption = () => {
    const value = optionRefInput.current?.value.trim().toLowerCase() || "";
    if (!value) return;
    setFormOptions((prev) => [...new Set([...prev, value])]);
    optionRefInput.current!.value = "";
  };

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogTrigger ref={triggerRef} asChild>
        <Button variant="outline"></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Field</DialogTitle>
          <DialogDescription>
            Make changes to your form field here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          {isMultiOption && (
            <>
              <Label htmlFor="options" className="text-left">
                Options:
                {formOptions.map((option) => (
                  <Badge
                    key={option}
                    className="capitalize mx-1"
                    variant="destructive"
                  >
                    {option}
                  </Badge>
                ))}
              </Label>
              <div className="flex justify-center items-center gap-2 mb-2">
                <PlusCircleIcon
                  size={30}
                  onClick={addOption}
                  className="cursor-pointer"
                />
                <Input
                  id="options"
                  ref={optionRefInput}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is-required" className="text-left">
              Is Required
            </Label>
            <Checkbox
              id="is-required"
              onClick={() => setIsRequired((prev) => !prev)}
              className="col-span-3 w-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreCreationModal;
