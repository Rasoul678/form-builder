import { Button } from "@/components/ui/button";
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
import { modalFormData } from "@/types";
import React from "react";

// TODO: Add options for the form

type IProps = {
  onSubmit: (data: modalFormData) => void;
  onClose: () => void;
};

const PreCreationModal: React.FC<IProps> = ({ onSubmit, onClose }) => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  React.useEffect(() => {
    triggerRef.current?.click();

    return () => {
      triggerRef.current = null;
    };
  }, []);

  const handleSubmit = () => {
    onSubmit({ title, description: desc });
    onClose();
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
            <Label htmlFor="title" className="text-right">
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
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="col-span-3"
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
