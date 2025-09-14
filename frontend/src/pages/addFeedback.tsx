import ISSMFeedBackForm from "@/components/ui/local/feedBackForm";

export default function ISSMAddFeedback() {
  return (
    <div className=" max-w-lg mx-auto">
      <ISSMFeedBackForm isEdit={false} />
    </div>
  );
}
