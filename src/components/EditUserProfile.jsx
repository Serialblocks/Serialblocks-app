import EditProfileForm from "@/components/EditProfileForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const EditUserProfile = ({
  title,
  description,
  formId,
  setEditOpen,
  openEdit,
  TriggerComponent,
}) => {
  return (
    <Dialog open={openEdit} onOpenChange={setEditOpen}>
      {TriggerComponent && (
        <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <EditProfileForm formId={formId} setOpen={setEditOpen} />
        <DialogFooter className="mt-2">
          <Button type="submit" form={formId}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProfile;
