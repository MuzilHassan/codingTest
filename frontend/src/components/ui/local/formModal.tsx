import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FeedBackForm, { type formProps } from "./feedBackForm";

export default function FormModal(props: formProps) {
  return (
    <Dialog>
      <DialogTrigger className=" border p-1 shadow cursor-pointer">
        {props.isEdit ? "Edit Details" : "Add Details"}
      </DialogTrigger>
      <DialogContent>
        <FeedBackForm {...props} />
      </DialogContent>
    </Dialog>
  );
}
