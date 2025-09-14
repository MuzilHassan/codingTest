import FeedBackForm from "@/components/ui/local/feedBackForm";

export default function AddFeedback() {
  return (
    <div className=" max-w-lg mx-auto">
      <FeedBackForm isEdit={false} />
    </div>
  );
}
