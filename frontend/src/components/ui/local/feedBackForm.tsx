import { Input } from "../input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ISSMCreateUpdateFeedback } from "@/api/feedback";
import { useNavigate } from "react-router-dom";

export type formProps = {
  name?: string;
  rating?: number;
  comment?: string;
  isEdit?: boolean;
  _id?: string;
};

export type formData = {
  name: string;
  rating: number;
  comment: string;
};
export type ApiMethod = "PUT" | "POST";
export type ApiRequestProps = {
  method: ApiMethod;
  _id?: string;
  payload: formData;
};
export default function FeedBackForm({
  name = "",
  rating = 1,
  comment = "",
  _id = "",
  isEdit,
}: formProps) {
  const [formName, setFormName] = useState(name);
  const [formRating, setFormRating] = useState(rating);
  const [formComment, setFormComment] = useState(comment);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (![1, 2, 3, 4, 5].includes(formRating)) {
      alert("Rating should be one of these values: 1, 2, 3, 4, 5");
      return;
    }

    if (formComment.length > 1000)
      return alert("comment length should not exceed 1000 chars");

    const payload = {
      name: formName,
      comment: formComment,
      rating: formRating,
    };

    const data = await ISSMCreateUpdateFeedback({
      method: isEdit ? "PUT" : "POST",
      payload,
      _id,
    });
    if (data.status === "success" && isEdit == false) return navigate("/");
    navigate(0);
  };
  return (
    <div>
      <h1 className=" text-xl text-center font-bold mb-4">
        {isEdit ? "Edit feedback details" : "Add new feedback"}
      </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-2 ">
        <Input
          type="text"
          placeholder="Enter your name"
          required
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <Textarea
          placeholder="Enter you comment"
          maxLength={1000}
          required
          value={formComment}
          onChange={(e) => setFormComment(e.target.value)}
          className=" max-w-md"
        />
        <Input
          placeholder="Enter rating from 1-5"
          required
          value={formRating}
          min={1}
          max={5}
          onChange={(e) => setFormRating(Number(e.target.value))}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
